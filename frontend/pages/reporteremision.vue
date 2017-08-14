<template lang="pug">
v-container(pt-0 pr-0 pb-0 pl-0 mt-0 mb-0)
  page(size="Letter" layout="Portrait" v-for="(page, i) in pages" :key="i")
    table(style="width: 100%; height: auto; margin-bottom: 3mm")
      thead
      tbody
        tr
          th(rowspan="2" style="width: 7.5%; text-align: center")
            img(src="~assets/logo.gis.png" style="width: 100%")
          th(colspan=3 style="width: 14%;") Fecha Expedición
          th(rowspan="2" style="text-align: center; width: 65%") REMISION
          th(rowspan="2") Nº
          th(rowspan="2") 0001
        tr
          td AAAA
          td MM
          td DD
          
    table(style="width: 100%; height: auto; margin-bottom: 3mm")
      thead
      tbody
        tr
          td(style="width: 75%") Cliente:
          td(style="width: 25%") Nit:
        tr 
          td Dirección:
          td Teléfono:
            
    table(style="width: 100%; height: auto" class="table-kardex" )
      thead
        tr(class="green lighten-3")
          th(style="width: 8%") Cant (m³)
          th(style="width: 16%") Producto
          th(style="width: 8%") Número
          th(style="width: 12%") Fecha
            br
            |Elaboración
          th(style="width: 12%") Fecha
            br
            |Vencimiento
          th Lote
          th Factura
            br
            | Sale
          th Factura
            br
            |Entra
          th Total
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
      
    table(style="width: 100%; height: 18mm; margin-top: 3mm; border-spacing: 3mm")
      thead
      tbody
        tr
          td(rowspan="2" style="width:50%") Firma Vendedor
          td Acepto
        tr 
          td C.C:
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      pages: [
        {rows: 41},
        {rows: 41},
        {rows: 41},
        {rows: 41},
        {rows: 41}
      ]
    }
  },
  layout: 'report',
  fetch ({ store }) {
    store.commit('reports/change', 'Remisión')
  }
}
</script>

<style lang="stylus" scoped>

@page
  size letter portraid
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
  padding 0
</style>
