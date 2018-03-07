<template lang="pug">
v-layout( row wrap )
  v-flex( xs12 )
    v-subheader Criterio de búsqueda
    v-radio(label="Todos" v-model="Criterio" value="Todos")

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
  export default {
    data () {
      return {
        Criterio: null
      }
    },
    methods: {
      inventario () {
        this.$router.push('/reporte/inventario')
      }
    }
  }
</script>
