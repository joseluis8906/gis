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
                      item-value="text"
                      dark )

            v-text-field( label="Numero de Documento" v-model="NumeroDocumento" dark )
            
            v-text-field( label="Nombre" v-model="Nombre" dark )

            v-text-field( label="Dirección" v-model="Direccion" dark )

            v-text-field( label="Teléfono" v-model="Telefono" dark )

            v-select( v-bind:items="ItemsRelacion"
                      v-model="Relacion"
                      label="Relacion"
                      item-value="text"
                      dark )
            
      v-card-actions
        v-spacer
        v-btn( dark @click.native="Reset" ) Cancelar
        v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar
</template>

<script>

import ONE_ENTE from '~/queries/OneEnte.gql'
import CREATE_ENTE from '~/queries/CreateEnte.gql'
import UPDATE_ENTE from '~/queries/UpdateEnte.gql'


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
    update: false,
    UpdateDb: false
  }),
  apollo: {
    OneEnte: {
      query: ONE_ENTE,
      variables () {
        return {
          TipoDocumento: this.TipoDocumento,
          NumeroDocumento: this.NumeroDocumento
        }
      },
      loadingKey: 'loading',
      update (data) {
        this.Nombre = data.OneEnte ? data.OneEnte.Nombre : ''
        this.Direccion = data.OneEnte ? data.OneEnte.Direccion : ''
        this.Telefono = data.OneEnte ? data.OneEnte.Telefono : ''
        this.Relacion = data.OneEnte ? data.OneEnte.Relacion : ''
        
        this.update = data.OneEnte ? true : false
      }
    }
  },
  methods: {
    CreateOrUpdate () {
      if (this.update) {
        this.Update();
      }else{
        this.Create();
      }
    },
    Create () {
      const Ente = {
        TipoDocumento: this.TipoDocumento,
        NumeroDocumento: this.NumeroDocumento,
        Nombre: this.Nombre,
        Direccion: this.Direccion,
        Telefono: this.Telefono,
        Relacion: this.Relacion
      };
      
      this.Reset ();
      
      this.$apollo.mutate ({
        mutation: CREATE_ENTE,
        variables: {
          TipoDocumento: Ente.TipoDocumento,
          NumeroDocumento: Ente.NumeroDocumento,
          Nombre: Ente.Nombre,
          Direccion: Ente.Direccion,
          Telefono: Ente.Telefono,
          Relacion: Ente.Relacion
      },
      loadingKey: 'loading',
      update: (store, { data: res }) => {
        console.log(Ente);
        var data = {OneEnte: res.CreateEnte}
        store.writeQuery({ 
          query: ONE_ENTE, 
          variables: {
            TipoDocumento: Ente.TipoDocumento,
            NumeroDocumento: Ente.NumeroDocumento
          },
          data: data
        })
      },
      }).then( data => {        
        console.log(data)
      }).catch( Err => {
        console.log(Err)
      })
    },
    Update () {
      const Ente = {
        TipoDocumento: this.TipoDocumento,
        NumeroDocumento: this.NumeroDocumento,
        Nombre: this.Nombre,
        Direccion: this.Direccion,
        Telefono: this.Telefono,
        Relacion: this.Relacion
      };
      
      this.Reset ();
      
      this.$apollo.mutate ({
        mutation: UPDATE_ENTE,
        variables: {
          TipoDocumento: Ente.TipoDocumento,
          NumeroDocumento: Ente.NumeroDocumento,
          Nombre: Ente.Nombre,
          Direccion: Ente.Direccion,
          Telefono: Ente.Telefono,
          Relacion: Ente.Relacion
      },
      loadingKey: 'loading',
      update: (store, { data: res }) => {
        console.log(Ente);
        var data = {OneEnte: res.UpdateEnte}
        store.writeQuery({ 
          query: ONE_ENTE, 
          variables: {
            TipoDocumento: Ente.TipoDocumento,
            NumeroDocumento: Ente.NumeroDocumento
          },
          data: data
        })
      },
      }).then( data => {        
        console.log(data)
      }).catch( Err => {
        console.log(Err)
      })
    },
    Reset () {
      this.TipoDocumento = ''
      this.NumeroDocumento = ''
      this.Nombre = ''
      this.Direccion = ''
      this.Telefono = ''
      this.Relacion = ''
    }
  }
};


</script>

<style lang="stylus">
  .alert-especial
    position absolute
    
</style>
