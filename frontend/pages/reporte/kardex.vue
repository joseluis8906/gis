<template lang="pug">
v-container(pt-0 pr-0 pb-0 pl-0 mt-0 mb-0)
  page(size="Letter" layout="Landscape" v-for="(page, i) in pages" :key="i")
    table(style="width: 100%; height: auto; margin-bottom: 3mm")
      thead
      tbody
        tr
          th(rowspan="5" style="width: 7.5%; text-align: center")
            img(src="~assets/logo.gis.png" style="width: 100%")
          th(rowspan="5" style="text-align: center; width: 80%") KARDEX DE TRAZABILIDAD
        tr
          td(class="lado") Código
          td(class="lado") FVT-017
        tr
          td(class="lado") Página
          td(class="lado") 0{{ i+1 }}
        tr
          td(class="lado") Versión
          td(class="lado") 01
        tr
          td(class="lado") Fecha
          td(class="lado") {{ Fecha }}
            
    table(style="width: 100%; height: auto" class="table-kardex" )
      thead
        tr(class="green lighten-3")
          th(style="width: 5%") Cant
          th(style="width: 12%") Producto
          th(style="width: 6%") Número
          th(style="width: 8%") Fecha
            br
            | Elaboración
          th Lote
          th(style="width: 8%") Fecha
            br
            | Vencimiento
          th(style="width: 16%") Cliente
          th(style="width: 12%") Ciudad
          th(style="width: 8%") Fecha
            br
            | Sale
          th Factura
            br
            | Sale
          th(style="width: 8%") Fecha
            br
            | Entra
          th Factura
            br
            | Entra
      tbody
        tr(v-for="j in page.rows")
          td 
          td 
          td 
          td 
          td 
          td 
          td 
          td 
          td 
          td 
          td 
          td 
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      pages: [
        {rows: 34}
      ]
    }
  },
  computed: {
    Fecha () {
      return this.$store.state.kardex.Fecha
    }
  },
  layout: 'report',
  fetch ({ store }) {
    store.commit('reports/changeTitle', 'Kardex')
  }
}
</script>

<style lang="stylus" scoped>

@page
  size letter landscape
  margin 0mm
  padding 0mm

table
  font-size: 9pt
  border-spacing 0px
  border-collapse collapse

th, td
  border 1px solid black

th
  height 9mm
  line-height 10pt

td
  height 5mm

.lado
  height 4mm
  font-size 8pt
  padding-left 1mm
  padding-right 1mm
  text-align right
</style>
