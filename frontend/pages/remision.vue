<template lang="pug">
v-layout( align-center justify-center )
  v-snackbar(
    :timeout="snackbar.timeout"
    :success="snackbar.context === 'success'"
    :info="snackbar.context === 'info'"
    :warning="snackbar.context === 'warning'"
    :error="snackbar.context === 'error'"
    :primary="snackbar.context === 'primary'"
    :secondary="snackbar.context === 'secondary'"
    :multi-line="snackbar.mode === 'multi-line'"
    :vertical="snackbar.mode === 'vertical'"
    :top="true"
    v-model="loading" ) 
      h6(class="grey--text text--lighten-4 mb-0") {{ snackbar.text }}
      v-icon autorenew
  
  v-flex( xs12 md10 lg8 )
    v-card
      v-card-text
        v-layout( row wrap )
          v-flex( xs12 mt-3 )
            h5(class="grey--text text--lighten-4") Remisión
            
          v-flex( xs12 )
            
            v-text-field( label="Número" v-model="Numero" dark )
            
            v-menu( lazy
                    :close-on-content-click="true"
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
              
              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="Fecha" 
                             no-title 
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar
            
            div(  style="border: 1px solid #555555; border-radius: 5px; padding: 12px;"
                  class="mb-4"  )
              v-layout(row wrap)
                v-flex(xs12)
                  h6(class="grey--text text--lighten-4") Cliente
                
                v-flex(xs12)
                  
                  v-select( v-bind:items="ItemsDocumento"
                      v-model="Cliente.TipoDocumento"
                      label="Tipo de Documento"
                      item-value="text"
                      dark )
                  
                  v-text-field( label="Nit/C.C" v-model="Cliente.NumeroDocumento" dark )
                
                v-flex(xs12 md6)
                  v-text-field( label="Nombre" v-model="Cliente.Nombre" readonly )
                  
                v-flex(xs12 md6)
                  v-text-field( label="Ciudad" v-model="Cliente.Ciudad" readonly )
                  
                v-flex(xs12 md6)
                  v-text-field( label="Dirección" v-model="Cliente.Direccion" readonly )
                
                v-flex(xs12 md6)
                  v-text-field( label="Teléfono" v-model="Cliente.Telefono" readonly )
            
            v-data-table( v-bind:headers="headers"
                          :items="items"
                          class="elevation-5 grey lighten-1 grey--text text--darken-4" )
            
              template(slot="items" scope="props")
                td(class="text-xs-center") {{ props.item.Produccion.Cantidad }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion.Producto.Nombre }}
                td(class="text-xs-left" style="border-left: 1px solid #999999") 
                  v-select( v-bind:items="ItemsProduccion"
                            v-model="props.item.Produccion"
                            item-text="NumeroEnvase"
                            item-value="Id"
                            return-object
                            autocomplete
                            style="width: 64px"
                            class="mb-0 mt-0 pb-0 select-especial"
                            light )
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion.FechaFabricacion }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion.FechaVencimiento }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion.Lote }}
                td(class="text-xs-left" style="border-left: 1px solid #999999") 
                  v-select( v-bind:items="ItemsEnvase"
                            v-model="props.item.Envase"
                            item-text="Numero"
                            item-value="Id"
                            return-object
                            autocomplete
                            style="width: 64px"
                            class="mb-0 mt-0 pb-0 select-especial"
                            light )
                td(class="text-xs-right" style="border-left: 1px solid #999999") 
                  v-money( v-model="props.item.Total" 
                           style="width: 96px" 
                           class="input-tab mb-0 mt-0 pb-0" 
                           mask-type="currency"
                           :focused="props.item.TotalFocus" 
                           maxlength=11)
                td(style="width:64px; border-left: 1px solid #999999" class="pl-1 pr-1")
                  v-btn( fab
                         dark
                         small
                         success
                         style="width: 24px; height:24px"
                         @click.native="guardar(props.item)")
                    v-icon(dark) {{ props.item.SaveUpdate }}
                    
                  v-btn( fab
                         dark
                         small
                         error
                         style="width: 24px; height:24px"
                         @click.native="eliminar(props.item)")
                    v-icon(dark) remove
            
            v-btn(fab dark class="indigo mb-1 mt-3" @click.native="agregar")
              v-icon(dark) add
            
      v-card-actions
        v-spacer
        v-btn( dark primary @click.native="generar" class="mt-0" ) Imprimir
        v-btn( dark warning @click.native="hardReset" class="mt-0" ) Limpiar
        
</template>

<script>

import gql from 'graphql-tag';

import VMoney from '~/components/MonetaryInput.vue'

import REMISIONS from '~/queries/Remisions.gql'
import PRODUCCIONS from '~/queries/Produccions.gql'
import CREATE_REMISION from '~/queries/CreateRemision.gql'
import UPDATE_REMISION from '~/queries/UpdateRemision.gql'
import DELETE_REMISION from '~/queries/DeleteRemision.gql'
import ONE_ENTE from '~/queries/OneEnte.gql'
import ENVASES from '~/queries/Envases.gql'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    Numero: '',
    Fecha: '',
    Cliente: {
      Id: null,
      TipoDocumento: null,
      NumeroDocumento: null,
      Nombre: null,
      Ciudad: null,
      Direccion: null,
      Telefono: null
    }, 
    ItemsDocumento: [
      {text: 'Nit'},
      {text: 'Cédula'}
    ],
    ItemsProduccion: [],
    ItemsEnvase: [],
    headers: [
      { text: 'Cant', align: 'left', sortable: false,  value: 'Cantidad' },
      { text: 'Producto', align: 'left', sortable: true,  value: 'Producto' },
      { text: 'Sale', align: 'center', sortable: false,  value: 'Sale' },
      { text: 'F.Elaboración', align: 'center', sortable: false,  value: 'Elaboración' },
      { text: 'F.Vencimiento', align: 'center', sortable: false,  value: 'Vencimiento' },
      { text: 'Lote', align: 'center', sortable: false,  value: 'Lote' },
      { text: 'Entra', align: 'center', sortable: false,  value: 'Entra' },
      { text: 'Total', align: 'center', sortable: false,  value: 'Total' },
      { text: 'Eliminar', align: 'center', sortable: false,  value: 'Eliminar' }
    ],
    items: [],
    ItemsEnvase: [],
    
    months: [
      'Enero',
      'Febrero', 
      'Marzo', 
      'Abril', 
      'Mayo', 
      'Junio', 
      'Julio', 
      'Agosto', 
      'Septiembre', 
      'Octubre', 
      'Noviembre', 
      'Diciembre'],
    days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    
    menu1: false,
    loading: 0,

  }),
  apollo: {
    Remisions:{
      query: REMISIONS,
      variables () {
        return {
          Numero: this.Numero
        }
      },
      loadingKey: "loading",
      update (data) {
        //console.log(data)
        
        if (data.Remisions.length > 0) {
          
          this.Fecha = data.Remisions[0].Fecha
          this.Cliente.TipoDocumento = data.Remisions[0].Ente.TipoDocumento
          this.Cliente.NumeroDocumento = data.Remisions[0].Ente.NumeroDocumento
          
          for (let i=0; i<data.Remisions.length; i++) {
            
            var tmp = {
              Id: data.Remisions[i].Id,
              Produccion: {
                Id: data.Remisions[i].Produccion.Id,
                Cantidad: data.Remisions[i].Produccion.Cantidad,
                FechaFabricacion: data.Remisions[i].Produccion.FechaFabricacion,
                FechaVencimiento: data.Remisions[i].Produccion.FechaVencimiento,
                Lote: data.Remisions[i].Produccion.Lote,
                Envase: {
                  Id: data.Remisions[i].Produccion.Envase.Id,
                  Numero: data.Remisions[i].Produccion.Envase.Numero
                },
                Producto: {
                  Id: data.Remisions[i].Produccion.Producto.Id,
                  Nombre: data.Remisions[i].Produccion.Producto.Nombre,
                  UnidadDeMedida: data.Remisions[i].Produccion.Producto.UnidadDeMedida
                },
                Cliente: {
                  Id: data.Remisions[i].Ente.Id,
                  Nombre: data.Remisions[i].Ente.Nombre
                }
              },
              Envase: {
                Id: data.Remisions[i].Envase.Id,
                Numero: data.Remisions[i].Envase.Numero
              },
              Total: data.Remisions[i].Total,
              SaveUpdate: 'update'
            }
            
            this.items.push(tmp)
            
          }
          
        } else {
        
          this.reset()
          
        }
      }
    },
    OneEnte: {
      query: ONE_ENTE,
      variables () {
        return {
          TipoDocumento: this.Cliente.TipoDocumento ? this.Cliente.TipoDocumento : '',
          NumeroDocumento: this.Cliente.NumeroDocumento ? this.Cliente.NumeroDocumento : ''
        }
      },
      loadingKey: 'loading',
      update (data) {
        this.Cliente.Id = data.OneEnte ? data.OneEnte.Id : null
        this.Cliente.Nombre = data.OneEnte ? data.OneEnte.Nombre : null
        this.Cliente.Ciudad = data.OneEnte ? data.OneEnte.Ciudad : null
        this.Cliente.Direccion = data.OneEnte ? data.OneEnte.Direccion : null
        this.Cliente.Telefono = data.OneEnte ? data.OneEnte.Telefono : null
        
      }
    },
    Produccions: {
      query: PRODUCCIONS,
      variables () {
        return {
          ClienteId: this.Cliente.Id !== null ? this.Cliente.Id : 0,
        }
      },
      loadingKey: 'loading',
      update (data) {
        
        if (data.Produccions.length > 0) {
          for ( let i=0; i<data.Produccions.length; i++ ) {
            var tmp = {
              Id: data.Produccions[i].Id,
              Cantidad: data.Produccions[i].Cantidad,
              FechaFabricacion: data.Produccions[i].FechaFabricacion,
              FechaVencimiento: data.Produccions[i].FechaVencimiento,
              Lote: data.Produccions[i].Lote,
              NumeroEnvase: data.Produccions[i].Envase.Numero,
              Envase: {
                Id: data.Produccions[i].Envase.Id,
                Numero: data.Produccions[i].Envase.Numero
              },
              Producto: {
                Id: data.Produccions[i].Producto.Id,
                Nombre: data.Produccions[i].Producto.Nombre,
                UnidadDeMedida: data.Produccions[i].Producto.UnidadDeMedida
              },
              Cliente: {
                Id: data.Produccions[i].Cliente.Id,
                Nombre: data.Produccions[i].Cliente.Nombre
              }
            }
            
            this.ItemsProduccion.push(tmp)
            
          }
          
          //console.log(this.ItemsProduccion)
          
        } else {
          
          this.ItemsProduccion = []
          
        }
      }
    },
    Envases: {
      query: ENVASES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsEnvase = []
        if (data.Envases.length>0) {
          for (let i=0; i<data.Envases.length; i++) {
            var tmp = {
              Id: data.Envases[i].Id,
              Numero: data.Envases[i].Numero
            }
            
            this.ItemsEnvase.push(tmp)
          }
        }
      }
    }
  },
  methods: {
    agregar () {
      var tmp = {
        Id: null,
        Produccion: {
          Id: null,
          Cantidad: null,
          FechaFabricacion: null,
          FechaVencimiento: null,
          Lote: null,
          Envase: {
            Id: null,
            Numero: null
          },
          Producto: {
            Id: null,
            Nombre: null,
            UnidadDeMedida: null
          },
          Cliente: {
            Id: null,
            Nombre: null
          }
        },
        Total: null,
        SaveUpdate: 'save'
      }

      this.items.push(tmp)
    },
    guardar (item) {
      //console.log('Entrando a crear')
      //console.log(item);
      if( item.Id === null && 
          this.Fecha !== null &&
          this.Cliente.Id !== null &&
          item.Produccion.Id !== null &&
          item.Envase.Id !== null && 
          item.Total !== null && 
          item.Total !== '') {
        
        const Remision = {
          Numero: this.Numero,
          Fecha: this.Fecha,
          EnteId: this.Cliente.Id,
          ProduccionId: item.Produccion.Id,
          EnvaseId: item.Envase.Id,
          Total: item.Total
        }
        
        //console.log(item)
        this.$apollo.mutate ({
          mutation: CREATE_REMISION,
          variables: {
            Numero: Remision.Numero,
            Fecha: Remision.Fecha,
            EnteId: Remision.EnteId,
            ProduccionId: Remision.ProduccionId,
            EnvaseId: Remision.EnvaseId,
            Total: Remision.Total
          },
          loadingKey: 'loading',
          update (store, {data: res}) {
            
            //console.log ({store: store, res: res})
            
            try{
              var data = store.readQuery({
                query: REMISIONS,
                variables: {
                  Numero: Remision.Numero
                }
              })
              
              data.Remisions.push(res.CreateRemision)
              
              store.writeQuery({
                query: REMISIONS,
                variables: {
                  Numero: Remision.Numero
                },
                data
              })
              
            } catch (Err) {
              
            }
            
          }
        })
        
      } else {
        
        if( this.Fecha !== null &&
            this.Cliente.Id !== null &&
            item.ProduccionId !== null &&
            item.EnvaseId !== null && 
            item.Total !== null && 
            item.Total !== '') { 
            
            const Remision = {
              Id: item.Id,
              EnteId: this.Cliente.Id,
              ProduccionId: item.Produccion.Id,
              EnvaseId: item.Envase.Id,
              Total: item.Total
            }
        
            //console.log(item)
            this.$apollo.mutate ({
              mutation: UPDATE_REMISION,
              variables: {
                Id: Remision.Id,
                EnteId: Remision.EnteId,
                ProduccionId: Remision.ProduccionId,
                EnvaseId: Remision.EnvaseId,
                Total: Remision.Total
              },
              loadingKey: 'loading',
              update (store, {data: res}) {
                
                //console.log ({store: store, res: res})
                
                try{
                  
                  var data = store.readQuery({
                    query: REMISIONS,
                    variables: {
                      Numero: Remision.Numero
                    }
                  })
                  
                  console.log(data)
                  
                  for (let i=0; i<data.Remisions.length; i++){
                    if ( res.UpdateRemision.Id === data.Remisions[i].Id ) {
                      data.Remisions[i] = res.UpdateRemision
                    }
                  }
                  
                  store.writeQuery({
                    query: REMISIONS,
                    variables: {
                      Numero: Remision.Numero
                    },
                    data: data
                  })
                  
                } catch (Err) {
                  
                }
                
              }
            })
           
          }
        }
      
    },
    eliminar (item) {
      
      const Remision = {
        Id: item.Id,
        Numero: this.Numero,
        ProduccionId: item.ProduccionId
      }
      
      if (item.Id !== null) {
        
        this.$apollo.mutate ({
          mutation: DELETE_REMISION,
          variables: {
            Id: Remision.Id
          },
          loadingKey: 'loading',
          update (store, {data: res}) {
            
            //console.log('eliminar')
            //console.log ({store: store, res: res})
            
            try{
              var data = store.readQuery({
                query: REMISIONS,
                variables: {
                  Numero: Remision.Numero,
                  ProduccionId: Remision.ProduccionId
                }
              })
              
              
              for (let i=0; i<data.Remisions.length; i++) {
                if (data.Remisions[i].ProduccionId === res.DeleteRemision.ProduccionId) {
                  //console.log('Eliminado de cache')
                  data.Remisions.splice(i, 1)
                }
              }
              
              store.writeQuery({
                query: REMISIONS,
                variables: {
                  Numero: Remision.Numero,
                  ProduccionId: Remision.ProduccionId
                },
                data
              })
              
            } catch (Err) {
              
            }
            
          }
        })
        
      } else {
      
        for (let i=0; i<this.items.length; i++) {
          if (item.ProduccionId === this.items[i].ProduccionId) {
            //console.log('Eliminado de cache')
            this.items.splice(i, 1)
          }
        }
      
      }
      
    },
    hardReset () {
      this.Numero = null
    },
    reset () {
      
      this.Fecha = null,
      
      this.Cliente = {
        TipoDocumento: null,
        NumeroDocumento: null,
        Nombre: null,
        Direccion: null,
        Direccion: null,
        Telefono: null
      }
      
      this.items = []
    },
    generar () {
      window.open('/reporte/remision');
    }
    
  },
  components: {
    VMoney
  }
};

</script>

<style lang="stylus" scoped>

.alert-especial
  position absolute

.input-tab
  text-align center
  outline none
  border-bottom 1px dotted #555555
  
.select-especial
  border-bottom none !important
  
.input-group--select
  height: 32px
  
</style>
