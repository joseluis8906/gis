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
            h5(class="grey--text text--lighten-4") Kardéx
            
          v-flex( xs12 )
            v-select( v-bind:items="ItemsTipoKardex"
                      v-model="TipoKardex"
                      label="Tipo"
                      item-value="text"
                      dark )
            
            v-text-field( label="Número" v-model="Numero" v-if="esUnico" dark )
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu1"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
              
              v-text-field( slot="activator"
                            label="Fecha Inicial"
                            v-model="FechaInicial"
                            readonly )
              
              v-date-picker( v-model="FechaInicial" 
                             no-title 
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="FechaInicial=null" ) Limpiar
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu2"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
              
              v-text-field( slot="activator"
                            label="Fecha Final"
                            v-model="FechaFinal"
                            readonly )
              
              v-date-picker( v-model="FechaFinal" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
            
            
            
      v-card-actions
        v-spacer
        v-btn( dark primary @click.native="generar" ) Generar
        
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    TipoKardex: null,
    FechaInicial: null,
    FechaFinal: null,
    Numero: null,
    esUnico: false,
    ItemsTipoKardex: [{text: 'Todos'}, {text: 'Único'}],
    
    menu1: false,
    menu2: false,
    loading: 0
  }),
  methods: {
    generar() {
      window.open('/reporte/kardex');
      
    }
  },
  watch: {
    TipoKardex (value) {
      value === 'Único' ? this.esUnico = true : this.esUnico = false
    }
  }
};

</script>

<style lang="stylus" scoped>
  .alert-especial
    position absolute
    
</style>
