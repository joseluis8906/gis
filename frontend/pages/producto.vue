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

  v-flex( xs12 )
    v-card
      v-layout(row wrap pt-3 light-blue)
        v-flex( xs12 )
          h5(class="grey--text text--lighten-4 text-xs-center bold")
            v-icon(ma) delete
            |  Producto
      v-card-text
        v-layout( row wrap )

          v-flex( xs12 )
            v-text-field( label="Nombre" v-model="Nombre" dark )

            v-select( v-bind:items="ItemsUnidadDeMedida"
                      v-model="UnidadDeMedida"
                      label="Unidad de Medida"
                      item-value="text"
                      dark )

      v-card-actions
        v-spacer
        v-btn( dark @click.native="Reset" ) Cancelar
        v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar
</template>

<script>
import CREATE_PRODUCTO from '~/queries/CreateProducto.gql'
import UPDATE_PRODUCTO from '~/queries/UpdateProducto.gql'
import PRODUCTOS from '~/queries/Productos.gql'
import ONE_PRODUCTO from '~/queries/OneProducto.gql'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    Nombre: null,
    UnidadDeMedida: null,
    ItemsUnidadDeMedida: [
      {text: 'm³'},
      {text: 'l'},
      {text: 'kg'}
    ],
    loading: 0,
    update: false,
    UpdateDb: false
  }),
  apollo: {
    OneProducto: {
      query: ONE_PRODUCTO,
      variables () {
        return {
          Nombre: this.Nombre ? this.Nombre : '',
        }
      },
      loadingKey: 'loading',
      update (data) {
        this.UnidadDeMedida = data.OneProducto ? data.OneProducto.UnidadDeMedida : null

        this.update = data.OneProducto ? true : false
      }
    }
  },
  beforeMount () {
    if ( sessionStorage.getItem('x-access-token') === null ) {
      this.$router.push('/')
    } else {
      var Roles = JSON.parse(sessionStorage.getItem('x-access-roles'))
      this.$store.commit('security/AddRoles', Roles);

      var AvailableRoles = ["Gerencia", "Produccion"];

      var allowAccess = false;
      for (let i=0;i<Roles.length; i++) {
        if(AvailableRoles.indexOf(Roles[i]) !== -1) {
          allowAccess = true;
          break;
        }
      }

      if(!allowAccess){
        sessionStorage.removeItem("x-access-token");
        sessionStorage.removeItem("x-access-roles");
        this.$router.push('/');
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
      const Producto = {
        Nombre: this.Nombre,
        UnidadDeMedida: this.UnidadDeMedida
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: CREATE_PRODUCTO,
        variables: {
          Nombre: Producto.Nombre,
          UnidadDeMedida: Producto.UnidadDeMedida
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          //console.log(Ente);
          var data = {OneProducto: res.CreateProducto}
          store.writeQuery({
            query: ONE_PRODUCTO,
            variables: {
              Nombre: Producto.Nombre
            },
            data: data
          })

          try{

            data = store.readQuery({
              query: PRODUCTOS
            })

            data.Productos.push(res.CreateProducto)

            store.writeQuery({
              query: PRODUCTOS,
              data: data
            })
          } catch (Err) {
            console.log(Err)
          }

        },
      }).then( data => {}).catch( Err => { console.log(Err) })
    },
    Update () {
      const Producto = {
        Nombre: this.Nombre,
        UnidadDeMedida: this.UnidadDeMedida
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: UPDATE_PRODUCTO,
        variables: {
          Nombre: Producto.Nombre,
          UnidadDeMedida: Producto.UnidadDeMedida
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          //console.log(Ente);
          var data = {OneProducto: res.UpdateProducto}
          store.writeQuery({
            query: ONE_PRODUCTO,
            variables: {
              Nombre: Producto.Nombre
            },
            data: data
          })

          try {

            data = store.readQuery({
              query: PRODUCTOS
            })

            for (let i=0; i<data.Productos.length; i++) {
              if (data.Productos[i].Id === res.UpdateProducto.Id) {
                data.Productos[i].Nombre = res.UpdateProducto.Nombre
                data.Productos[i].UnidadDeMedida = res.UpdateProducto.UnidadDeMedida
              }
            }

            store.writeQuery({
              query: PRODUCTOS,
              data: data
            })

          } catch (Err) {
            console.log(Err)
          }

        }
      }).then( data => {}).catch( Err => { console.log(Err) })
    },
    Reset () {
      this.Nombre = null
      this.UnidadDeMedida = null
    }
  }
};


</script>

<style lang="stylus" scoped>
  h5.bold
    font-weight bold

  .alert-especial
    position absolute

</style>
