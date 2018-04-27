<template lang="pug">
v-container(pt-0 pr-0 pb-0 pl-0 mt-0 mb-0)
  page(v-bind:size="page.Size" v-bind:layout="page.Layout" v-for="(page, i) in pages" :key="i")
    table(style="width: 100%; height: auto; margin-bottom: 3mm")
      thead
      tbody
        tr
          th(rowspan="2" style="width: 7.5%; text-align: center")
            img(src="~assets/logo.gis.png" style="width: 100%")
          th(colspan=3 style="width: 14%;") Fecha Expedición
          th(rowspan="2" style="text-align: center; width: 65%") REMISION
          th(rowspan="2") Nº
          th(rowspan="2") {{ Numero }}
        tr
          td(style="text-align: center") {{ Fecha.AAAA }}
          td(style="text-align: center") {{ Fecha.MM }}
          td(style="text-align: center") {{ Fecha.DD }}

    table(style="width: 100%; height: auto; margin-bottom: 3mm")
      thead
      tbody
        tr
          td(style="width: 70%") {{ TipoEnte }}: {{ Cliente.Nombre }}
          td(style="width: 30%") Nit: {{ Cliente.NumeroDocumento }}
        tr
          td Dirección: {{ Cliente.Direccion }}
          td Teléfono: {{ Cliente.Telefono }}

    table(style="width: 100%; height: auto" class="table-kardex" )
      thead
        tr(class="green lighten-3")
          th(style="width: 8%") Cant
          th(style="width: 22%") Producto
          th(style="width: 10%") Sale
          th(style="width: 10%") Entra
          th(style="width: 14%") Fecha
            br
            |Elaboración
          th(style="width: 14%") Fecha
            br
            |Vencimiento
          th(style="width: 7%") Lote
          th Total
      tbody
        tr(v-for="(item, j) in page.Items" :key="j")
          td(style="text-align: right")
            | {{ item.Produccion ? item.Produccion.Cantidad : item.Recprodcom ? item.Recprodcom.Cantidad : item.EnvaseEntra ? item.EnvaseEntra.Capacidad : item.EnvaseSale.Capacidad }}
            | {{ item.Produccion ? item.Produccion.Producto.UnidadDeMedida : item.Recprodcom ? item.Recprodcom.Producto.UnidadDeMedida : item.EnvaseEntra ? item.EnvaseEntra.Producto.UnidadDeMedida : item.EnvaseSale.Producto.UnidadDeMedida }}
          td(style="text-align: left")
            | {{ item.Produccion ? item.Produccion.Producto.Nombre : item.Recprodcom ? item.Recprodcom.Producto.Nombre : item.EnvaseEntra ? item.EnvaseEntra.Producto.Nombre : item.EnvaseSale.Producto.Nombre }}
          td(style="text-align: center")
            | {{ item.Produccion ? item.Produccion.Envase.Numero : item.Recprodcom ? item.Recprodcom.Envase.Numero : item.EnvaseSale ? item.EnvaseSale.Numero : '' }}
          td(style="text-align: center")
            | {{ item.EnvaseEntra ? item.EnvaseEntra.Numero : '' }}
          td(style="text-align: center")
            | {{ item.Produccion ? item.Produccion.FechaFabricacion : item.Recprodcom ? item.Recprodcom.FechaFabricacion : '' }}
          td(style="text-align: center")
            | {{ item.Produccion ? item.Produccion.FechaVencimiento : item.Recprodcom ? item.Recprodcom.FechaVencimiento : '' }}
          td(style="text-align: center")
            | {{ item.Produccion ? item.Produccion.Lote : item.Recprodcom ? item.Recprodcom.Lote : '' }}
          td(style="text-align: right")
            | {{ item.Total | currency('$', 0) }}

    table(style="width: 100%; height: 18mm; margin-top: 2mm; border-spacing: 1mm 0mm; border-collapse: separate")
      thead
      tbody
        tr
          td(colspan="2" style="border:none;") Nota: Los cilindros aquí relacionados son propiedad de Gases Industriales de los Santanderes S.A.S.
             | en caso de extravio o perdida se cobrará el valor del cilindro en la actualidad.
        tr
          td(rowspan="2" style="width:50%; vertical-align: top") Firma Vendedor
          td(style="height: 9mm; vertical-align: top") Acepto
        tr
          td C.C:
</template>

<script>

import { mapMutations } from 'vuex'
import REMISIONS from '~/queries/Remisions.gql'


export default {
  data () {
    return {
      pages: [],
      Fecha: {
        AAAA: null,
        MM: null,
        DD: null
      },
      Cliente: {
        TipoDocumento: null,
        NumeroDocumento: null,
        Nombre: null,
        Ciudad: null,
        Dirección: null,
        Telefono: null
      },
      TipoEnte: 'Cliente',
      items: []
    }
  },
  computed: {
    Numero () {
      return this.$store.state.remision.Numero
    }
  },
  layout: 'report',
  fetch ({ store }) {
    store.commit('reports/changeTitle', 'Remisión')
  },
  apollo: {
    Remisions:{
      query: REMISIONS,
      fetchPolicy: 'network-only',
      variables () {
        return {
          Numero: this.Numero
        }
      },
      update (data) {

        if (data.Remisions.length > 0) {

          this.Fecha.AAAA = data.Remisions[0].Fecha.split('-')[0];
          this.Fecha.MM = data.Remisions[0].Fecha.split('-')[1];
          this.Fecha.DD = data.Remisions[0].Fecha.split('-')[2];
          this.Cliente = data.Remisions[0].Ente;
          this.TipoEnte = data.Remisions[0].Tipo;

          this.items = [];

          let page = 0;
          for (let i=0; i<data.Remisions.length; i++) {

            let tmp = {
              Produccion: data.Remisions[i].Produccion ? {
                Cantidad: data.Remisions[i].Produccion.Cantidad,
                FechaFabricacion: data.Remisions[i].Produccion.FechaFabricacion,
                FechaVencimiento: data.Remisions[i].Produccion.FechaVencimiento,
                Lote: data.Remisions[i].Produccion.Lote,
                Envase: {
                  Numero: data.Remisions[i].Produccion.Envase.Numero,
                },
                Producto: {
                  Nombre: data.Remisions[i].Produccion.Producto.Nombre,
                  UnidadDeMedida: data.Remisions[i].Produccion.Producto.UnidadDeMedida
                }
              } : null,
              Recprodcom: data.Remisions[i].Recprodcom ? {
                Id: data.Remisions[i].Recprodcom.Id,
                Cantidad: data.Remisions[i].Recprodcom.Cantidad,
                FechaFabricacion: data.Remisions[i].Recprodcom.FechaFabricacion,
                FechaVencimiento: data.Remisions[i].Recprodcom.FechaVencimiento,
                Lote: data.Remisions[i].Recprodcom.Lote,
                Envase: {
                  Id: data.Remisions[i].Recprodcom.Envase.Id,
                  Numero: data.Remisions[i].Recprodcom.Envase.Numero,
                },
                Producto: {
                  Id: data.Remisions[i].Recprodcom.Producto.Id,
                  Nombre: data.Remisions[i].Recprodcom.Producto.Nombre,
                  UnidadDeMedida: data.Remisions[i].Recprodcom.Producto.UnidadDeMedida
                }
              } : null,
              EnvaseEntra: data.Remisions[i].EnvaseEntra ?  {
                Numero: data.Remisions[i].EnvaseEntra.Numero,
                Capacidad: data.Remisions[i].EnvaseEntra.Capacidad,
                Producto: data.Remisions[i].EnvaseEntra.Producto
              } : null,
              EnvaseSale: data.Remisions[i].EnvaseSale ?  {
                Numero: data.Remisions[i].EnvaseSale.Numero,
                Capacidad: data.Remisions[i].EnvaseSale.Capacidad,
                Producto: data.Remisions[i].EnvaseSale.Producto
              } : null,
              Total: data.Remisions[i].Total
            }

            if(data.Remisions.length < 12){
              if( Number.isInteger(i / 12) ){
                page = Math.trunc(i / 12);
                this.pages.push({Size: 'MidLetter', Layout: 'Landscape', Items: []});
              }
            }
            else {
              if( Number.isInteger(i / 40) ){
                page = Math.trunc(i / 40);
                this.pages.push({Size: 'Letter', Layout: 'Portrait', Items: []});
              }
            }

            this.pages[page].Items.push(tmp)

          }
        }
        else {
          console.log('no hay items');
        }
      }
    }
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
  padding-left: 1mm
  padding-right: 1mm

.lado
  height 4mm
  font-size 8pt
  padding 0
</style>
