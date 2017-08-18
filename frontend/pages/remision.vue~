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
                td(class="text-xs-center") {{ props.item.Cantidad }}
                td(class="text-xs-left" style="border-left: 1px solid #999999") 
                  input( v-model="props.item.NumeroInterno" 
                         style="width: 64px" 
                         class="input-tab mb-0 mt-0 pb-0" 
                         :readonly="!props.item.EnvaseEditable"
                         @click="enableable(props.item, 'Envase')" 
                         @keypress.enter="disableable(props.item, 'Envase')" )
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Producto }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") 
                  input( v-model="props.item.Sale" 
                         style="width: 64px" 
                         class="input-tab mb-0 mt-0 pb-0" 
                         :readonly="!props.item.SaleEditable"
                         @click="enableable(props.item, 'Sale')" 
                         @keypress.enter="disableable(props.item, 'Sale')" )
                td(class="text-xs-right" style="border-left: 1px solid #999999") 
                  input( v-model="props.item.Entra" 
                         style="width: 64px" 
                         class="input-tab mb-0 mt-0 pb-0" 
                         :readonly="!props.item.EntraEditable"
                         @click="enableable(props.item, 'Entra')" 
                         @keypress.enter="disableable(props.item, 'Entra')" )
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Elaboracion }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Vencimiento }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Lote }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") 
                  v-money( v-model="props.item.Total" 
                           style="width: 96px" 
                           class="input-tab mb-0 mt-0 pb-0" 
                           :readonly="!props.item.TotalEditable"
                           @click.native="enableable(props.item, 'Total')" 
                           @keypress.native.enter="disableable(props.item, 'Total')"
                           mask-type="currency"
                           :focused="props.item.TotalFocus" 
                           maxlength=11)
                td(style="width:24px; border-left: 1px solid #999999")
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
import DELETE_REMISION from '~/queries/DeleteRemision.gql'
import ONE_ENTE from '~/queries/OneEnte.gql'

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

    headers: [
      { text: 'Cant (m³)', align: 'left', sortable: false,  value: 'Cantidad' },
      { text: 'Envase', align: 'left', sortable: true,  value: 'Envase' },
      { text: 'Producto', align: 'left', sortable: false,  value: 'Producto' },
      { text: 'Sale', align: 'center', sortable: false,  value: 'Sale' },
      { text: 'Entra', align: 'center', sortable: false,  value: 'Entra' },
      { text: 'F.Elaboración', align: 'center', sortable: false,  value: 'Elaboración' },
      { text: 'F.Vencimiento', align: 'center', sortable: false,  value: 'Vencimiento' },
      { text: 'Lote', align: 'center', sortable: false,  value: 'Lote' },
      { text: 'Total', align: 'center', sortable: false,  value: 'Total' },
      { text: 'Eliminar', align: 'center', sortable: false,  value: 'Eliminar' }
    ],
    items: [
      
    ],
    conjuntoItems: new Set(),
    
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
          
          this.conjuntoItems.clear()
          this.Fecha = data.Remisions[0].Fecha
          this.Cliente.TipoDocumento = data.Remisions[0].Ente.TipoDocumento
          this.Cliente.NumeroDocumento = data.Remisions[0].Ente.NumeroDocumento
              
          for (let i=0; i<data.Remisions.length; i++) {
          
            var tmp = {
              Id: data.Remisions[i].Id ? data.Remisions[i].Id : null,
              ProduccionId: data.Remisions[i].Produccion.Id,
              Cantidad: data.Remisions[i].Produccion.Cantidad,
              NumeroInterno: data.Remisions[i].Produccion.Envase.NumeroInterno, EnvaseEditable:false,
              Producto: data.Remisions[i].Produccion.Producto,
              Sale: data.Remisions[i].Sale, SaleEditable: false,
              Entra: data.Remisions[i].Entra, EntraEditable: false,
              Elaboracion: data.Remisions[i].Produccion.FechaFabricacion,
              Vencimiento: data.Remisions[i].Produccion.FechaVencimiento,
              Lote: data.Remisions[i].Produccion.Lote,
              Total: data.Remisions[i].Total, TotalEditable: false, TotalFocus: false}
            this.conjuntoItems.add(tmp)
            
          }
          
          this.items = Array.from(this.conjuntoItems)
          
        } else {
        
          this.reset()
          
        }
      
      }
    },
    Produccions: {
      query: PRODUCCIONS,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        if (data.Produccions.length>0) {
          
          this.ItemsProduccion = []
          
          for(let i=0; i<data.Produccions.length; i++) {
            
            var tmp = {
            Id: null,
            ProduccionId: data.Produccions[i].Id,
            Cantidad: data.Produccions[i].Cantidad,
            NumeroInterno: data.Produccions[i].Envase.NumeroInterno, EnvaseEditable:false,
            Producto: data.Produccions[i].Producto,
            Sale: null, SaleEditable: false,
            Entra: null, EntraEditable: false,
            Elaboracion: data.Produccions[i].FechaFabricacion,
            Vencimiento: data.Produccions[i].FechaVencimiento,
            Lote: data.Produccions[i].Lote,
            Total: null, TotalEditable: false, TotalFocus: false}
            
            this.ItemsProduccion.push(tmp)
          }
          
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
        this.Cliente.Nombre = data.OneEnte ? data.OneEnte.Nombre : ''
        this.Cliente.Ciudad = data.OneEnte ? data.OneEnte.Ciudad : ''
        this.Cliente.Direccion = data.OneEnte ? data.OneEnte.Direccion : ''
        this.Cliente.Telefono = data.OneEnte ? data.OneEnte.Telefono : ''
        
      }
    }
  },
  methods: {
    agregar () {
      var tmp = {
        Id: null,
        ProduccionId: null,
        Cantidad: null,
        NumeroInterno: null, EnvaseEditable:false,
        Producto: null,
        Sale: null, SaleEditable: false,
        Entra: null, EntraEditable: false,
        Elaboracion: null,
        Vencimiento: null,
        Lote: null,
        Total: null, TotalEditable: false, TotalFocus: false}
        
      this.conjuntoItems.add(tmp)
      this.items = Array.from(this.conjuntoItems)
    },
    enableable (item, editable) {
      editable === 'Envase' ? item.EnvaseEditable = true : null
      editable === 'Sale' ? item.SaleEditable = true : null
      editable === 'Entra' ? item.EntraEditable = true : null
      editable === 'Total' ? item.TotalEditable = true : null
      editable === 'Total' ? item.TotalFocus = true : null
    },
    disableable (item, editable) {
      if (editable === 'Envase') {
        item.EnvaseEditable = false 
        this.loadProduccion(item)
      } 
      editable === 'Sale' ? item.SaleEditable = false : null
      editable === 'Entra' ? item.EntraEditable = false : null
      editable === 'Total' ? item.TotalEditable = false : null
      editable === 'Total' ? item.TotalFocus = false : null
      this.CreateOrUpdate(item)
    },
    CreateOrUpdate (item) {
      //console.log('Entrando a crear')
      //console.log(item);
      if (
        this.Numero !== null && 
        this.Cliente.Id !== null &&
        item.ProduccionId !== null &&
        item.Total !== null && 
        item.Total !== 0 && 
        item.Total !== '$' ) {
        
        const Remision = {
          Numero: this.Numero,
          Fecha: this.Fecha,
          EnteId: this.Cliente.Id,
          Sale: item.Sale,
          Entra: item.Entra,
          ProduccionId: item.ProduccionId,
          Total: item.Total
        }
        
        //console.log('revisar la id para guardar')
        //console.log(item)
        
        if (item.Id === null) {
          
          this.$apollo.mutate ({
            mutation: CREATE_REMISION,
            variables: {
              Numero: Remision.Numero,
              Fecha: Remision.Fecha,
              EnteId: Remision.EnteId,
              Sale: Remision.Sale,
              Entra: Remision.Entra,
              ProduccionId: Remision.ProduccionId,
              Total: Remision.Total
            },
            loadingKey: 'loading',
            update (store, {data: res}) {
              
              //console.log('guardar en cache')
              //console.log ({store: store, res: res})
              
              try{
                const data = store.readQuery({
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
                
                data.Remisions = []
                  
                data.Remisions.push(res.CreateRemision)
                
                store.writeQuery({
                  query: REMISIONS,
                  data: data
                })
                
              }
              
            }
          })
          
        } else {
          
          //console.log('no se guarda en db por id')
          
        }
        
        
      } else {
      
        //console.log('no se guarda en bd por parametros')
      
      }
      
    },
    eliminar (item) {
      
      const Remision = {
        Numero: this.Numero,
        ProduccionId: item.ProduccionId
      }
      
      if (item.Id !== null) {
        
        this.$apollo.mutate ({
          mutation: DELETE_REMISION,
          variables: {
            Numero: Remision.Numero,
            ProduccionId: Remision.ProduccionId
          },
          loadingKey: 'loading',
          update (store, {data: res}) {
            
            //console.log('eliminar')
            //console.log ({store: store, res: res})
            
            try{
              const data = store.readQuery({
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
              
              data.Remisions = []
              
              data.Remisions.push(res.UpdateRemision)
              
              store.writeQuery({
                query: REMISIONS,
                data: data
              })
              
            }
            
          }
        })
        
      }
      
      this.conjuntoItems.delete(item)
      this.items = Array.from(this.conjuntoItems)
      
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
      
      this.conjuntoItems.clear()
      this.items = Array.from(this.conjuntoItems)
    },
    loadProduccion (item) {
      //console.log (item)
      for (let i=0; i<this.ItemsProduccion.length; i++) {
        if (item.NumeroInterno === this.ItemsProduccion[i].NumeroInterno) {
          //console.log('loaded')
          //console.log(this.ItemsProduccion[i])
          item.ProduccionId = this.ItemsProduccion[i].ProduccionId
          item.Cantidad = this.ItemsProduccion[i].Cantidad
          item.Producto = this.ItemsProduccion[i].Producto
          item.Elaboracion = this.ItemsProduccion[i].Elaboracion
          item.Vencimiento = this.ItemsProduccion[i].Vencimiento
          item.Lote = this.ItemsProduccion[i].Lote
          break
        }
      }
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
  
</style>
