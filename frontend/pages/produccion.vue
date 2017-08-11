<template lang="pug">
v-layout( align-center justify-center )
  v-dialog( persistent v-model="loading" )
    v-card
      v-card-title( class="headline text-xs-center" ) Cargando
        v-icon autorenew
  
  v-flex( xs12 md8 lg6 )
    v-card
      v-card-text
        v-layout( row wrap )
          v-flex( xs12 mt-3 )
            h5(class="grey--text text--lighten-4") Producción
            
          v-flex( xs12 )
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu1"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha"
                            v-model="Fecha"
                            readonly )
              
              v-date-picker( v-model="Fecha" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-text-field( label="Lote" v-model="Lote" dark )
            
            v-select( v-bind:items="ItemsClaseProducto"
                      v-model="Producto"
                      label="Producto"
                      item-text="text"
                      item-value="text"
                      autocomplete
                      dark )
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu2"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Fabricacion"
                            v-model="FechaFabricacion"
                            readonly )
              
              v-date-picker( v-model="FechaFabricacion" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu3"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Vencimiento"
                            v-model="FechaVencimiento"
                            readonly )
              
              v-date-picker( v-model="FechaVencimiento" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-text-field( label="Pureza Final (%)" v-model="PurezaFinal" dark )
            
            v-text-field( label="Presion Final (psi)" v-model="PresionFinal" dark )
            
            h6(class="grey--text text--lighten-4") Descripción
            
            v-select( v-bind:items="ItemsEnvases"
                      v-model="EnvaseActual"
                      label="Envase"
                      item-text="NumeroInterno"
                      item-value="Id"
                      return-object
                      autocomplete
                      :hint="`Capacidad: ${EnvaseActual.Capacidad} m³`"
                      persistent-hint
                      dark )
            
            v-text-field( label="Cantidad (m³)" v-model="EnvaseActual.Cantidad" dark )
            
            v-btn(fab dark class="indigo mb-5" @click.native="agregar")
              v-icon(dark) add
            
            v-data-table( v-bind:headers="headers"
                          v-bind:items="items"
                          class="elevation-5 grey lighten-1 grey--text text--darken-4" )
              
              template(slot="items" scope="props")
                td {{ props.item.NumeroInterno }}
                td( class="text-xs-right " 
                    style="border-left: 1px solid #999999" ) {{ props.item.Capacidad }}
                td( class="text-xs-right " 
                    style="border-left: 1px solid #999999"
                    ) {{ props.item.Cantidad }}
                td(style="width:24px; border-left: 1px solid #999999")
                  v-btn( fab
                         dark
                         small
                         error
                         style="width: 24px; height:24px"
                         @click.native="eliminar(props.item)")
                    v-icon(dark) remove
      v-card-actions
        v-spacer
        v-btn( dark warning @click.native="hardReset" ) Limpiar
</template>

<script>

import ENVASES from '~/queries/Envases.gql'
import PRODUCCIONS from '~/queries/Produccions.gql'
import CREATE_PRODUCCION from '~/queries/CreateProduccion.gql'
import UPDATE_PRODUCCION from '~/queries/UpdateProduccion.gql'
import DELETE_PRODUCCION from '~/queries/DeleteProduccion.gql'

export default {
  data: () => ({
    Fecha: '',
    Lote: '',
    FechaFabricacion: '',
    FechaVencimiento: '',
    Producto: '',
    PurezaFinal: '',
    PresionFinal: '',
    headers: [
      { text: 'Envase', align: 'left', sortable: true,  value: 'NumeroInterno' },
      { text: 'Capacidad (m³)', align: 'center', sortable: false,  value: 'Capacidad' },
      { text: 'Cantidad (m³)', align: 'center', sortable: false,  value: 'Cantidad' },
      { text: 'Eliminar', align: 'center', sortable: false,  value: 'Eliminar' }
    ],
    items: [],
    pagination: {
      sortBy: 'NumeroInterno'
    },
    ItemsEnvases: [
    ],
    ItemsClaseProducto: [
      {text: 'Oxígeno Medicinal'},
      {text: 'Oxígeno Industrial'},
      {text: 'Argón'},
      {text: 'Acetileno'},
      {text: 'Dióxido de Carbóno'},
      {text: 'Helio'},
      {text: 'Nitrógeno'},
      {text: 'Aire Seco'}
    ],
    EnvaseActual: {Cantidad: '', Capacidad: ''},
    Conjunto: new Set(),
    
    menu1: false,
    menu2: false,
    menu3: false,
    loading: 0
  }),
  apollo: {
    Envases: {
      query: ENVASES,
      loadingKey: 'loading',
      update (data) {
        if (data.Envases) {
          this.ItemsEnvases = []
          for (let i=0; i<data.Envases.length; i++) {
            var tmp = {}
            tmp.Id = data.Envases[i].Id
            tmp.NumeroInterno = data.Envases[i].NumeroInterno
            tmp.Capacidad = data.Envases[i].Capacidad
            tmp.Cantidad = ''
            this.ItemsEnvases.push(tmp)
          }
        }
      }
    },
    Produccions: {
      query: PRODUCCIONS,
      variables () {
        return {
          Fecha: this.Fecha,
          Lote: this.Lote
        }
      },
      loadingKey: 'loading',
      update (data) {
        console.log(data)
        if (data.Produccions.length > 0) {
          this.FechaFabricacion = data.Produccions[0].FechaFabricacion
          this.FechaVencimiento = data.Produccions[0].FechaVencimiento
          this.Producto = data.Produccions[0].Producto
          this.PurezaFinal = data.Produccions[0].PurezaFinal
          this.PresionFinal = data.Produccions[0].PresionFinal
          this.items = []
          for (let i=0; i<data.Produccions.length; i++) {
            var tmp = {}
            tmp.Id = data.Produccions[i].EnvaseId
            tmp.NumeroInterno = data.Produccions[i].Envase.NumeroInterno
            tmp.Capacidad = data.Produccions[i].Envase.Capacidad
            tmp.Cantidad = data.Produccions[i].Cantidad
            for (let j=0; j<this.ItemsEnvases.length; j++) {
              if ( data.Produccions[i].Envase.Id === this.ItemsEnvases[j].Id ) {
                this.ItemsEnvases[j].Cantidad = data.Produccions[i].Cantidad
                this.Conjunto.add(this.ItemsEnvases[j])
                this.items = Array.from(this.Conjunto)
              }
            }
          }
        } else {
          this.reset ()
        }
      }
    }
  },
  watch: {
    EnvaseActual: {
      handler: function () {
        this.controlCantidad ()
      },
      deep: true
    }
  },
  methods: {
    agregar () {
      if (this.EnvaseActual.Cantidad !== '' && this.EnvaseActual.Capacidad !== '') {
        if (this.EnvaseActual.Capacidad >= Number(this.EnvaseActual.Cantidad)) {
          if (!this.Conjunto.has(this.EnvaseActual)) {
            this.Conjunto.add(this.EnvaseActual)
            this.items = Array.from(this.Conjunto)
            
            const Produccion = {
              Fecha: this.Fecha,
              Lote: this.Lote,
              FechaFabricacion: this.FechaFabricacion,
              FechaVencimiento: this.FechaVencimiento,
              Cantidad: this.EnvaseActual.Cantidad,
              Producto: this.Producto,
              EnvaseId: this.EnvaseActual.Id,
              PurezaFinal: this.PurezaFinal,
              PresionFinal: this.PresionFinal,
            }
            
            this.$apollo.mutate ({
              mutation: CREATE_PRODUCCION,
              variables: {
                Fecha: Produccion.Fecha,
                Lote: Produccion.Lote,
                FechaFabricacion: Produccion.FechaFabricacion,
                FechaVencimiento: Produccion.FechaVencimiento,
                Cantidad: Produccion.Cantidad,
                Producto: Produccion.Producto,
                EnvaseId: Produccion.EnvaseId,
                PurezaFinal: Produccion.PurezaFinal,
                PresionFinal: Produccion.PresionFinal
              },
              loadingKey: 'loading',
              update (store, {data: res}) {
                console.log('guardar')
                console.log ({store: store, res: res})
                
                try{
                  const data = store.readQuery({
                    query: PRODUCCIONS,
                    variables: {
                      Fecha: Produccion.Fecha,
                      Lote: Produccion.Lote
                    }
                  })
                  
                  data.Produccions.push(res.CreateProduccion)
                  
                  store.writeQuery({
                    query: PRODUCCIONS,
                    variables: {
                      Fecha: Produccion.Fecha,
                      Lote: Produccion.Lote
                    },
                    data
                  })
                  
                } catch (Err) {
                  console.log(`Error controlado: ${Err}`)
                }
                
              }
            })
            
          } else {
          
            const Produccion = {
              Fecha: this.Fecha,
              Lote: this.Lote,
              FechaFabricacion: this.FechaFabricacion,
              FechaVencimiento: this.FechaVencimiento,
              Cantidad: this.EnvaseActual.Cantidad,
              Producto: this.Producto,
              EnvaseId: this.EnvaseActual.Id,
              PurezaFinal: this.PurezaFinal,
              PresionFinal: this.PresionFinal,
            }
            
            this.$apollo.mutate ({
              mutation: UPDATE_PRODUCCION,
              variables: {
                Fecha: Produccion.Fecha,
                Lote: Produccion.Lote,
                FechaFabricacion: Produccion.FechaFabricacion,
                FechaVencimiento: Produccion.FechaVencimiento,
                Cantidad: Produccion.Cantidad,
                Producto: Produccion.Producto,
                EnvaseId: Produccion.EnvaseId,
                PurezaFinal: Produccion.PurezaFinal,
                PresionFinal: Produccion.PresionFinal
              },
              loadingKey: 'loading',
              update (store, {data: res}) {
                console.log('actualizar')
                console.log ({store: store, res: res})
                
                try{
                  const data = store.readQuery({
                    query: PRODUCCIONS,
                    variables: {
                      Fecha: Produccion.Fecha,
                      Lote: Produccion.Lote
                    }
                  })
                  
                  for (let i=0; i<data.Produccions.length; i++) {
                    if (data.Produccions[i].EnvaseId === res.UpdateProduccion.EnvaseId) {
                      data.Produccions[i] = res.UpdateProduccion
                    }
                  }
                  
                  store.writeQuery({
                    query: PRODUCCIONS,
                    variables: {
                      Fecha: Produccion.Fecha,
                      Lote: Produccion.Lote
                    },
                    data
                  })
                  
                } catch (Err) {
                  console.log(`Error controlado: ${Err}`)
                }
                
              }
              
            })
            
          }
          
          this.EnvaseActual = {Cantidad: '', Capacidad: ''}
        }
      }
    },
    controlCantidad () {
      if (Number(this.EnvaseActual.Cantidad) >= this.EnvaseActual.Capacidad) {
        this.EnvaseActual.Cantidad = this.EnvaseActual.Capacidad
      }
    },
    eliminar (item) {
      this.Conjunto.delete(item)
      this.items = Array.from(this.Conjunto)
      
      const Produccion = {
        Fecha: this.Fecha,
        Lote: this.Lote,
        FechaFabricacion: this.FechaFabricacion,
        FechaVencimiento: this.FechaVencimiento,
        Cantidad: item.Cantidad,
        Producto: this.Producto,
        EnvaseId: item.Id,
        PurezaFinal: this.PurezaFinal,
        PresionFinal: this.PresionFinal,
      }
      
      this.$apollo.mutate ({
        mutation: DELETE_PRODUCCION,
        variables: {
          Fecha: Produccion.Fecha,
          Lote: Produccion.Lote,
          FechaFabricacion: Produccion.FechaFabricacion,
          FechaVencimiento: Produccion.FechaVencimiento,
          Cantidad: Produccion.Cantidad,
          Producto: Produccion.Producto,
          EnvaseId: Produccion.EnvaseId,
          PurezaFinal: Produccion.PurezaFinal,
          PresionFinal: Produccion.PresionFinal
        },
        loadingKey: 'loading',
        update (store, {data: res}) {
          console.log ({store: store, res: res})
          
          try{
            const data = store.readQuery({
              query: PRODUCCIONS,
              variables: {
                Fecha: Produccion.Fecha,
                Lote: Produccion.Lote
              }
            })
            
            for (let i=0; i<data.Produccions.length; i++) {
              if (data.Produccions[i].EnvaseId === res.DeleteProduccion.EnvaseId) {
                data.Produccions.splice(i, 1)
              }
            }
            
            store.writeQuery({
              query: PRODUCCIONS,
              variables: {
                Fecha: Produccion.Fecha,
                Lote: Produccion.Lote
              },
              data
            })
            
          } catch (Err) {
            console.log(`Error controlado: ${Err}`)
          }
          
        }
      })
      
      for (let j=0; j<this.ItemsEnvases.length; j++) {
        if ( this.ItemsEnvases[j].Id === item.Id ) {
          this.ItemsEnvases[j].Cantidad = ''
        }
      }
      
      this.EnvaseActual = {Cantidad: '', Capacidad: ''}
    },
    reset () {
      
      this.FechaFabricacion = '',
      this.FechaVencimiento = '',
      this.Producto = '',
      this.PurezaFinal = '',
      this.PresionFinal = '',
      this.EnvaseActual = {Cantidad: '', Capacidad: ''}
      this.Conjunto.clear ()
      this.items = Array.from(this.Conjunto)
      for (let j=0; j<this.ItemsEnvases.length; j++) {
        this.ItemsEnvases[j].Cantidad = ''
      }
      
    },
    hardReset () {
      this.Fecha = ''
      this.Lote = ''
    }
  }
};

</script>

<style lang="stylus">
.alert-especial
  position absolute
</style>
