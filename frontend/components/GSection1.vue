<template lang="pug">
doctype html
v-container(fluid pt-0 pb-0 especial)
  v-layout(row wrap pt-3 class="g-section-layout")
    v-flex(xs10 offset-xs1 md8 offset-md2 pt-5 pb-5)
      div(class="pt-5 pb-5")
        h3(class="text-xs-center g-section-title") Sobre Nosotros
        div
          p(class="text-xs-center grey--text text--darken-4 g-section-msg") El objetivo de nuesta compañía es ofrecer servicios y productos de alta calidad
            |que se adecuen a las necesidades de nuestros clientes, trabajamos en pro del desarrollo económico e industial de la región, desde 
            |nuestos inicios nos hemos caráterizado por brindar productos y servicios de excelente calidad y por la responsabilidad de nuestros profesionales.
    v-flex(xs12 pb-5 mb-5)
      g-charts
</template>

<script>
import GCharts from '~components/GCharts'

export default {
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    GCharts
  }
}
</script>

<style lang="stylus" scoped>
.g-section-title
  font-family 'Roboto', sans
  font-weight bold
  padding-bottom 0.8em
  margin-bottom: 1em
  background url('~assets/bottom-red.svg') no-repeat bottom

.g-section-msg  
  font-family 'Work Sans', sans-serif
  font-size 130%

.g-section-layout
  background-color #ebebed

.especial
  border-bottom 2px solid #d2d2d5

</style>
