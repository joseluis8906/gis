<template lang="pug">
v-container(pt-0 pr-0 pb-0 pl-0 mt-0 mb-0)
  page(v-bind:size="page.Size" v-bind:layout="page.Layout" v-for="(page, i) in pages" :key="i")
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
          th(style="width: 13%") Producto
          th(style="width: 6%") Número
          th(style="width: 7.5%") Fecha
            br
            | Elaboración
          th Lote
          th(style="width: 7.5%") Fecha
            br
            | Vencimiento
          th(style="width: 17.5%") Cliente
          th(style="width: 12%") Ciudad
          th(style="width: 8%") Fecha
            br
            | Sale
          th Factura
            br
            | Sale
          th(style="width: 7.5%") Fecha
            br
            | Entra
          th Factura
            br
            | Entra
      tbody
        tr(v-for="(item, j) in items" :key="j")
          td(style="text-align: right; font-size: 7.5pt;") {{ item.Cantidad }} {{ item.Producto.UnidadDeMedida }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.Producto.Nombre }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.Envase ? item.Envase.Numero : '' }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.FechaElaboracion }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.Lote }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.FechaVencimiento }}
          td(style="text-align: right; font-size: 7.5pt;") {{ MaxLength(item.Ente.Nombre) }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.Ente.Ciudad }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.FechaSale }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.NumeroFacturaSale }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.FechaEntra }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.NumeroFacturaEntra }}
</template>

<script>

import KARDEXS from '~/queries/Kardexs.gql'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      pages: [
        {Size: 'Letter', Layout: 'Landscape'}
      ],
      items: [],
      loading: 0
    }
  },
  layout: 'report',
  fetch ({ store }) {
    store.commit('reports/changeTitle', 'Kardex')
  },
  computed: {
    Fecha () {
      return this.$store.state.kardex.Fecha
    },
    Tipo () {
      return this.$store.state.kardex.Tipo
    },
    Cliente () {
      return this.$store.state.kardex.Cliente
    },
    Envase () {
      return this.$store.state.kardex.Envase
    },
    FechaInicial () {
      return this.$store.state.kardex.FechaInicial
    },
    FechaFinal () {
      return this.$store.state.kardex.FechaFinal
    }
  },
  apollo: {
    Kardexs: {
      query: KARDEXS,
      variables () {
        return {
          Tipo: this.Tipo,
          EnteId: this.Cliente.Id,
          EnvaseId: this.Envase.Id,
          FechaInicial: this.FechaInicial,
          FechaFinal: this.FechaFinal
        }
      },
      loadingKey: 'loading',
      update (data) {
        console.log(data)
        this.items = []
        if (data.Kardexs.length>0) {
          for(let i=0; i<data.Kardexs.length; i++) {
            var tmp = {
              Cantidad: data.Kardexs[i].Cantidad,
              Producto: data.Kardexs[i].Producto,
              Envase: data.Kardexs[i].Envase,
              FechaElaboracion: data.Kardexs[i].FechaElaboracion,
              Lote: data.Kardexs[i].Lote,
              FechaVencimiento: data.Kardexs[i].FechaVencimiento,
              Ente: data.Kardexs[i].Ente,
              FechaSale: data.Kardexs[i].FechaSale,
              NumeroFacturaSale: data.Kardexs[i].NumeroFacturaSale,
              FechaEntra: data.Kardexs[i].FechaEntra,
              NumeroFacturaEntra: data.Kardexs[i].NumeroFacturaEntra
            }
            this.items.push(tmp)
          }

        }
        if (this.items.length < 33) {
          for (let k=this.items.length; k<=33; k++) {
            var tmp = {
              Cantidad: null,
              Producto: {Nombre: null},
              Envase: {Numero: null},
              FechaElaboracion: null,
              Lote: null,
              FechaVencimiento: null,
              Ente: {Nombre: null, Ciudad: null},
              FechaSale: null,
              NumeroFacturaSale: null,
              FechaEntra: null,
              NumeroFacturaEntra: null
            }
            this.items.push (tmp)
          }
        }
      }
    }
  },
  methods: {
    MaxLength (value) {
      if(value){
        console.log(value.length)
        return value.length > 32 ? value.substr(0, 26)+'...'+value.substr(-6, 6) : value;
      }
    }
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
  padding-left 1mm
  padding-right 1mm

.lado
  height 4mm
  font-size 8pt
  padding-left 1mm
  padding-right 1mm
  text-align right
</style>
