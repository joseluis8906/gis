<template lang="pug">
v-layout( align-center justify-center )
  v-dialog( persistent v-model="loading" )
    v-card
      v-card-title( class="headline text-xs-center" ) Cargando
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
                  
                  v-text-field( label="Nit/C.C" v-model="Cliente.Nit" dark )
                
                  v-text-field( label="Nombre" v-model="Cliente.Nombre" readonly )
                  
                v-flex(xs12 md6)
                  v-text-field( label="Dirección" v-model="Cliente.Direccion" readonly )
                
                v-flex(xs12 md6)
                  v-text-field( label="Teléfono" v-model="Cliente.Telefono" readonly )
            
            v-data-table( v-bind:headers="headers"
                          :items="items"
                          class="elevation-5 grey lighten-1 grey--text text--darken-4" )
            
              template(slot="items" scope="props")
                td 
                  input( v-model="props.item.Cantidad.value" 
                         style="width: 48px" 
                         class="input-tab mb-0 mt-0 pb-0" 
                         :readonly="!props.item.Cantidad.editable"
                         @click="enableable(props.item.Cantidad)" 
                         @keypress.enter="disableable(props.item.Cantidad)" )
                td(class="text-xs-left" style="border-left: 1px solid #999999") 
                  input( v-model="props.item.Envase.value" 
                         style="width: 48px" 
                         class="input-tab mb-0 mt-0 pb-0" 
                         :readonly="!props.item.Envase.editable"
                         @click="enableable(props.item.Envase)" 
                         @keypress.enter="disableable(props.item.Envase)" )
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Producto }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") 
                  input( v-model="props.item.Sale.value" 
                         style="width: 48px" 
                         class="input-tab mb-0 mt-0 pb-0" 
                         :readonly="!props.item.Sale.editable"
                         @click="enableable(props.item.Sale)" 
                         @keypress.enter="disableable(props.item.Sale)" )
                td(class="text-xs-right" style="border-left: 1px solid #999999") 
                  input( v-model="props.item.Entra.value" 
                         style="width: 48px" 
                         class="input-tab mb-0 mt-0 pb-0" 
                         :readonly="!props.item.Entra.editable"
                         @click="enableable(props.item.Entra)" 
                         @keypress.enter="disableable(props.item.Entra)" )
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Elaboración }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Vencimiento }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Lote }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") 
                  v-money( v-model="props.item.Total.value" 
                         style="width: 96px" 
                         class="input-tab mb-0 mt-0 pb-0" 
                         :readonly="!props.item.Total.editable"
                         @click.native="enableable(props.item.Total)" 
                         @keypress.native.enter="disableable(props.item.Total)"
                         mask-type="currency"
                         :focused="props.item.Total.focus" 
                         maxlength=11)
            
            v-btn(fab dark class="indigo mb-3 mt-3" @click.native="agregar")
              v-icon(dark) add
            
      v-card-actions
        v-spacer
        v-btn( dark warning @click.native="hardReset" ) Limpiar
        
</template>

<script>

import gql from 'graphql-tag';

import VMoney from '~/components/MonetaryInput.vue'

export default {
  data: () => ({
    Fecha: '',
    Numero: '',
    Cliente: {
      Nit: '',
      Nombre: '',
      Direccion: '',
      Telefono: ''
    },
    ItemsDocumento: [
      {text: 'Nit'},
      {text: 'Cédula'}
    ],
    ItemsEnvase: [],

    headers: [
      { text: 'Cant (m³)', align: 'left', sortable: false,  value: 'Cantidad' },
      { text: 'Envase', align: 'left', sortable: true,  value: 'Envase' },
      { text: 'Producto', align: 'left', sortable: false,  value: 'Producto' },
      { text: 'Sale', align: 'center', sortable: false,  value: 'Sale' },
      { text: 'Entra', align: 'center', sortable: false,  value: 'Entra' },
      { text: 'F.Elaboración', align: 'center', sortable: false,  value: 'Elaboración' },
      { text: 'F.Vencimiento', align: 'center', sortable: false,  value: 'Vencimiento' },
      { text: 'Lote', align: 'center', sortable: false,  value: 'Lote' },
      { text: 'Total', align: 'center', sortable: false,  value: 'Total' }
    ],
    items: [
      {Cantidad: {editable: true, value: ''}, Envase: {editable: true, value: ''}, Producto: '', Sale: {editable: true, value: ''}, Entra: {editable: true, value: ''}, Elaboración: '', Vencimiento: '', Lote: '', Total: {editable: true, value: '', focus: false}}
    ],

    menu1: false,
    loading: 0,
    q: 0
  }),
  apollo: {
    Posts: {
      query: gql`
      query OnePost($Id: Int!) {
        Posts(PersonId: $Id) {
          Title
          Content 
        }
      }`,
      variables() {
        return {
          Id: this.q==='' ? 0 : this.q,
        }
      },
      loadingKey: 'loading'
    }
  },
  methods: {
    recargar() {
      console.log("si");
    },
    enableable (item) {
      item.editable = true
      item.focus !== undefined ? item.focus = true : item.focus = false
    },
    disableable (item) {
      item.editable = false
      item.focus !== undefined ? item.focus = false : item.focus = true
    }
  },
  components: {
    VMoney
  }
};

</script>

<style lang="stylus">
.alert-especial
  position absolute

.input-tab
  text-align center
  outline none
  border-bottom 1px dotted #555555
  
</style>
