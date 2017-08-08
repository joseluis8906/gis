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
            p Kardex
            
          v-flex( xs12 )
            v-select( v-bind:items="ItemsTipoKardex"
                      v-model="TipoKardex"
                      label="Tipo de Kardex"
                      class="input-group--focused"
                      item-value="text"
                      dark )
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu1"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
              
              v-text-field( slot="activator"
                            label="Fecha Inicial"
                            v-model="FechaInicial"
                            prepend-icon="event"
                            readonly )
              
              v-date-picker( v-model="FechaInicial" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu2"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
              
              v-text-field( slot="activator"
                            label="Fecha Final"
                            v-model="FechaFinal"
                            prepend-icon="event"
                            readonly )
              
              v-date-picker( v-model="FechaFinal" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-text-field( label="Número" v-model="Numero" dark )
            
      v-card-actions
        v-spacer
        v-btn( dark primary @click.native="generar" ) Generar
        
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => ({
    TipoKardex: '',
    FechaInicial: '',
    FechaFinal: '',
    Numero: '',
    ItemsTipoKardex: [{text: 'Todos'}, {text: 'Único'}],
    
    menu1: false,
    menu2: false,
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
    generar() {
      window.open('about:blank');
      
    }
  }
};

</script>

<style lang="stylus">
  .alert-especial
    position absolute
    
</style>
