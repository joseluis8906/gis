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
            p Producción
            
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
            
            v-text-field( label="Lote" v-model="Lote" dark )
            
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
                            prepend-icon="event"
                            readonly )
              
              v-date-picker( v-model="FechaFabricacion" no-title scrollable actions )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
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
                            prepend-icon="event"
                            readonly )
              
              v-date-picker( v-model="FechaVencimiento" no-title scrollable actions )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-text-field( label="Cantidad" v-model="Cantidad" dark )
            
            
            
            v-text-field( label="Pureza Final" v-model="PurezaFinal" dark )
            
            v-text-field( label="Presion Final" v-model="PresionFinal" dark )
            
            v-data-table( v-bind:headers="headers"
                          :items="items"
                          hide-actions
                          class="elevation-1" )
            
              template(slot="items" scope="props")
                td {{ props.item.Envase }}
                td(class="text-xs-right") {{ props.item.Capacidad }}
            
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
    Lote: '',
    FechaFabricacion: '',
    FechaVencimiento: '',
    Cantidad: '',
    Producto: '',
    PurezaFinal: '',
    PresionFinal: '',
    headers: [
      { text: 'Envase', align: 'left', sortable: true,  value: 'Envase' },
      { text: 'Capacidad (m3)', align: 'center', sortable: false,  value: 'Capacidad' }
    ],
    items: [
      {Envase: '029384', Capacidad: 12}
    ],
    
    menu1: false,
    menu2: false,
    menu3: false,
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
