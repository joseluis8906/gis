<template lang="pug">
v-layout( row wrap )
  v-flex( xs12 )
    v-subheader Criterio de búsqueda
    v-radio(label="Todos" v-model="Criterio" value="Todos")
    v-radio(label="Por Envase" v-model="Criterio" value="Por Envase")
    v-radio(label="Por Producto" v-model="Criterio" value="Por Producto")

    v-text-field(
      v-if="Criterio === 'Por Envase'"
      v-model="NumeroEnvase"
      label="Buscar Envase"
      append-icon="search"
      :append-icon-cb="BuscarEnvase")

    v-select(
      v-if="Criterio === 'Por Envase'"
      v-bind:items="ItemsEnvase"
      v-model="EnvaseActual"
      label="Envase"
      item-text="Numero"
      item-value="Id"
      return-object
      autocomplete
      dark )

    v-select(
      v-if="Criterio === 'Por Producto'"
      v-bind:items="ItemsProducto"
      v-model="ProductoActual"
      label="Producto"
      item-text="Nombre"
      item-value="Id"
      return-object
      autocomplete
      class="mb-5"
      dark )

    v-card-actions
      v-spacer
      v-btn(
        dark
        @click.native="inventario"
        class="mt-0 blue darken-1"
        :disabled="!Criterio" ) Buscar

</template>

<style>
</style>

<script>
  import ENVASES from '~/queries/Envases.gql';
  import PRODUCTOS from '~/queries/Productos.gql';

  export default {
    data () {
      return {
        Criterio: null,
        NumeroEnvase: null,
        ItemsEnvase: [],
        EnvaseActual: null,
        ItemsProducto: [],
        ProductoActual: null,
      }
    },
    apollo: {
      Productos: {
        query: PRODUCTOS,
        fetchPolicy: 'network-only',
        update (data) {
          this.ItemsProducto = [];
          this.ItemsProducto = data.Productos;
        }
      }
    },
    methods: {
      BuscarEnvase () {
        this.ItemsEnvase = []
        if(
          null !== this.NumeroEnvase &&
          this.NumeroEnvase.length >= 2
        ){
          this.$apollo.query({
            query: ENVASES,
            fetchPolicy: 'network-only',
            variables: {
              Numero: this.NumeroEnvase,
              Disponible: 'No'
            },
          }).then( res => {
            //console.log(res.data);
            let Envases = res.data.Envases
            for (let i=0; i<Envases.length; i++) {
              var tmp = {}
              tmp.Id = Envases[i].Id;
              tmp.Numero = Envases[i].Numero;
              tmp.Capacidad = Envases[i].Capacidad;
              tmp.UnidadDeMedida = Envases[i].Producto.UnidadDeMedida;
              tmp.ProductoId = Envases[i].Producto.Id;
              tmp.Disponible = Envases[i].Disponible;
              tmp.Cliente = Envases[i].Propietario;
              this.ItemsEnvase.push(tmp);
            }
          });
        }
      },
      inventario () {
        this.$store.commit('produccion/changeEnvaseId', this.EnvaseActual ? this.EnvaseActual.Id : null);
        this.$store.commit('produccion/changeProductoId', this.ProductoActual ? this.ProductoActual.Id : null);
        this.$store.commit('produccion/changeDespachado', this.Despachado ? this.Despachado : null);
        this.$router.push('/reporte/inventario');
      }
    }
  }
</script>
