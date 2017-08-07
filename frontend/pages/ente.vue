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
            p Información Empresarial
          v-flex( xs12 )
            v-select( v-bind:items="ItemsDocumento"
                      v-model="TipoDocumento"
                      label="Tipo de Documento"
                      class="input-group--focused"
                      item-value="text"
                      dark )
            v-text-field( label="Numero de Documento" v-model="NumeroDocumento" dark )
            v-text-field( label="Nombre" v-model="Nombre" dark )
            v-text-field( label="Dirección" v-model="Direccion" dark )
            v-text-field( label="Nombre" v-model="Nombre" dark )
            v-select( v-bind:items="ItemsRelacion"
                      v-model="Relacion"
                      label="Relacion"
                      class="input-group--focused"
                      item-value="text"
                      dark )
      v-card-actions
        v-spacer
        v-btn( dark ) Cancelar
        v-btn( dark primary @click.native="recargar" ) Guardar
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => ({
    TipoDocumento: '',
    NumeroDocumento: '',
    Nombre: '',
    Direccion: '',
    Telefono: '',
    Relacion: '',
    ItemsDocumento: [
      {text: 'Nit'},
      {text: 'Cédula'}
    ],
    ItemsRelacion: [
      {text: 'Propia'},
      {text: 'Cliente'}
    ],
    loading: 0,
    q: 1
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
