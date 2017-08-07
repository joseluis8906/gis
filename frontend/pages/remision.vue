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
            p Remisión
            
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
                            prepend-icon="event"
                            readonly )
              
              v-date-picker( v-model="Fecha" no-title scrollable actions )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-text-field( label="Número" v-model="Numero" dark )
            
            v-text-field( label="Nit/C.C" v-model="Cliente.Nit" dark )
            
            p Nombre: {{ Cliente.Nombre }}
            
            p Dirección: {{ Cliente.Direccion }}
            
            p Teléfono: {{ Cliente.Telefono }}
            
            v-data-table( v-bind:headers="headers"
                          :items="items"
                          hide-actions
                          class="elevation-1" )
            
              template(slot="items" scope="props")
                td(class="text-xs-right") {{ props.item.Cantidad }}
                td(class="text-xs-left") {{ props.item.Envase }}
                td(class="text-xs-right") {{ props.item.Producto }}
                td(class="text-xs-right") {{ props.item.Sale }}
                td(class="text-xs-right") {{ props.item.Entra }}
                td(class="text-xs-right") {{ props.item.Elaboración }}
                td(class="text-xs-right") {{ props.item.Vencimiento }}
                td(class="text-xs-right") {{ props.item.Lote }}
                td(class="text-xs-right") {{ props.item.Total }}
            
      v-card-actions
        v-spacer
        v-btn( dark ) Cancelar
        v-btn( dark primary @click.native="recargar" ) Guardar
        
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => ({
    Fecha: '',
    Numero: '',
    Cliente: {
      Nit: '123',
      Nombre: 'Pepito Perez',
      Direccion: 'Cll 1',
      Telefono: '000'
    },
    ItemsEnvase: [],
    
    headers: [
      { text: 'Cant', align: 'left', sortable: false,  value: 'Cantidad' },
      { text: 'Envase', align: 'left', sortable: true,  value: 'Envase' },
      { text: 'Producto', align: 'left', sortable: false,  value: 'Producto' },
      { text: 'Sale', align: 'center', sortable: false,  value: 'Sale' },
      { text: 'Entra', align: 'center', sortable: false,  value: 'Entra' },
      { text: 'Elaboración', align: 'center', sortable: false,  value: 'Elaboración' },
      { text: 'Vencimiento', align: 'center', sortable: false,  value: 'Vencimiento' },
      { text: 'Lote', align: 'center', sortable: false,  value: 'Lote' },
      { text: 'Total', align: 'center', sortable: false,  value: 'Total' }
    ],
    items: [
      {Cantidad: 10, Envase: '029384', Producto: 'Oxígeno Medicinal', Sale: '2304', Entra: '2309', Elaboración: '', Vencimiento: '', Lote: '', Total: 0}
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
      
    }
  }
};

</script>

<style lang="stylus">
  .alert-especial
    position absolute
    
</style>
