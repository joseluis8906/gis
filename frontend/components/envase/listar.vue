<template lang="pug">
v-layout( row wrap )
  v-flex( xs12 )
    v-subheader Criterio de búsqueda
    v-radio(label="Todos" v-model="Criterio" value="Todos")
    v-radio(label="Por cliente" v-model="Criterio" value="Cliente")
    v-radio(label="Por producto" v-model="Criterio" value="Producto")
    v-radio(label="Por cliente y producto" v-model="Criterio" value="ClienteYProducto")

    v-text-field(
      v-if="Criterio==='Cliente' || Criterio==='ClienteYProducto'"
      v-model="NombreDocumento"
      label="Buscar Cliente"
      append-icon="search"
      :append-icon-cb="BuscarCliente")

    v-select(
      v-if="Criterio==='Cliente' || Criterio==='ClienteYProducto'"
      v-bind:items="ItemsCliente"
      v-model="Cliente"
      label="Cliente"
      item-text="Nombre"
      autocomplete
      return-object
      dark )

    v-select(
      v-if="Criterio==='Producto' || Criterio==='ClienteYProducto'"
      v-bind:items="ItemsProducto"
      v-model="Producto"
      label="Producto"
      item-text="Nombre"
      item-value="Id"
      return-object
      autocomplete
      class="mb-5"
      dark )

    v-card-actions
      v-spacer
      v-btn( dark @click.native="Reset" ) Cancelar
      v-btn( dark primary @click.native="Generar" ) Buscar

</template>
<style>
</style>
<script>
  import ENTES from '~/queries/Entes.gql';
  import PRODUCTOS from '~/queries/Productos.gql';

  export default {
    data () {
      return {
        Criterio: 'todos',
        NombreDocumento: null,
        ItemsCliente: [],
        Cliente: null,
        ItemsProducto: [],
        Producto: null,
      }
    },
    apollo: {
      Productos: {
        query: PRODUCTOS,
        fetchPolicy: 'network-only',
        loadingKey: 'loading',
        update (data) {
          this.ItemsProducto = [];
          this.ItemsProducto = data.Productos;
        }
      }
    },
    methods: {
      BuscarCliente () {
        this.ItemsCliente = [];
        if(null !== this.NombreDocumento && this.NombreDocumento.length >= 3){
          this.$apollo.query({
            query: ENTES,
            variables: {
              NombreDocumento: this.NombreDocumento
            },
            fetchPolicy: 'network-only',
            loadingKey: 'loading'
          }).then( res => {
            console.log(res.data.Entes.length);
            this.ItemsCliente = res.data.Entes;
          });
        }
      },
      Generar () {
        let ClienteId = this.Cliente !== null ? this.Cliente.Id : null;
        let ProductoId = this.Producto !== null ? this.Producto.Id : null;
        this.$store.commit('envase/changeTipo', this.Criterio);
        this.$store.commit('envase/changeEnteId', ClienteId);
        this.$store.commit('envase/changeProductoId', ProductoId);
        this.$router.push('/reporte/envase');
      }
    }
  };
</script>
