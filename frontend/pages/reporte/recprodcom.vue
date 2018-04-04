<template lang="pug">
v-container(pt-0 pr-0 pb-0 pl-0 mt-0 mb-0)
  page(v-bind:size="page.Size" v-bind:layout="page.Layout" v-for="(page, i) in pages" :key="i")
    table(style="width: 100%; height: auto; margin-bottom: 3mm")
      tbody
        tr
          th(rowspan="5" style="width: 7.5%; text-align: center")
            img(src="~assets/logo.gis.png" style="width: 100%")
          th(rowspan="5" style="text-align: center; width: 75%") RECEPCIÓN DE PRODUCTO A COMERCIALIZAR
        tr
          td(class="lado") Código
          td(class="lado") FCP-012
        tr
          td(class="lado") Página
          td(class="lado") 0{{ i+1 }}
        tr
          td(class="lado") Versión
          td(class="lado") 05
        tr
          td(class="lado") Fecha
          td(class="lado") 07/02/18

    table(style="width: 38%; height: auto; display: inline-block; vertical-align: top; margin-bottom: 2%" class="table-kardex" )
      tbody
        tr
          td(style="text-align: left") Fecha Recepción:
          td(style="text-align: right") {{ Fecha }}
        tr
          td(style="text-align: left") Proveedor:
          td(style="text-align: right") {{ Proveedor ? MaxLength (Proveedor.Nombre, 27) : '' }}
        tr
          td(style="text-align: left") Factura Nº:
          td(style="text-align: right") {{ Numero }}

        tr
          td(style="text-align: left") Cantidad:
          td(style="text-align: right") {{ Cantidad }}
        tr
          td(style="text-align: left") Cantidad Vol:
          td(style="text-align: right") {{ Redondear(CantidadM3, 1) }} {{ UnidadDeMedida }}
        tr
          td(style="text-align: left") Nº De Lote:
          td(style="text-align: right") {{ Lote }}

    table(style="width: 32%; height: auto; display: inline-block; vertical-align: top; margin-left: 1%; margin-bottom: 2%" class="table-kardex" )
      tbody
        tr
          td(style="text-align: left") Producto:
          td(style="text-align: right") {{ MaxLength (Producto, 19) }}
        //- tr
          td(style="text-align: left") Certificado:
          td(style="text-align: right") {{ MaxLength (Certificado, 19) }}
        tr
          td(style="text-align: left") Registro Sanitario:
          td(style="text-align: right") {{ MaxLength (RegistroSanitario, 19) }}

        //- tr
          td(style="text-align: left") Otros:
          td(style="text-align: right") {{ MaxLength (Otros, 19) }}

    table(style="width: 28%; height: auto; display: inline-block; vertical-align: top; margin-left: 1%; margin-bottom: 2%" class="table-kardex" )
      tbody
        tr
          td(style="text-align: left") Pureza Final:
          td(style="text-align: right") {{ PurezaFinal }} %
        tr
          td(style="text-align: left") Presión Final:
          td(style="text-align: right") {{ PresionFinal }} psi
        tr
          td(style="text-align: left") Fecha Fabricación:
          td(style="text-align: right") {{ fechaMilitar(FechaFabricacion) }}
        tr
          td(style="text-align: left") Fecha Vencimiento:
          td(style="text-align: right") {{ fechaMilitar(FechaVencimiento) }}


    table(style="width: 49%; height: auto; display: inline-block;" class="table-kardex" )
      thead
        tr(class="green lighten-3")
          th(style="width: 5%") Cap
          th(style="width: 12%") Producto
          th(style="width: 6%") Número
          th(style="width: 16%") Cliente

      tbody
        tr(v-for="(item, j) in items1" :key="j")
          td(style="text-align: right; font-size: 7.5pt;") {{ item.Cantidad }} {{ item.Envase.Capacidad ? UnidadDeMedida : '' }}
          td(style="text-align: right; font-size: 7.5pt;") {{ MaxLength (item.Producto.Nombre, 16) }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.Envase.Numero }}
          td(style="text-align: right; font-size: 7.5pt;") {{ MaxLength (item.Envase.Cliente.Nombre, 24) }}

    table(style="width: 49%; margin-left: 2%; height: auto; display: inline-block;")
      thead
        tr(class="green lighten-3")
          th(style="width: 5%") Cap
          th(style="width: 12%") Producto
          th(style="width: 6%") Número
          th(style="width: 16%") Cliente

      tbody
        tr(v-for="(item, k) in items2" :key="k")
          td(style="text-align: right; font-size: 7.5pt;") {{ item.Cantidad }} {{ item.Envase.Capacidad ? UnidadDeMedida : '' }}
          td(style="text-align: right; font-size: 7.5pt;") {{ MaxLength (item.Producto.Nombre, 16) }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.Envase.Numero }}
          td(style="text-align: right; font-size: 7.5pt;") {{ MaxLength (item.Envase.Cliente.Nombre, 24) }}

    div(style="width: 100%; height:40mm; margin-top: 3mm; display: inline-block; vertical-align: top;")
      h6(class="headlines") Observación:
      p {{ Observacion }}

    div(style="width: 49%; height:40mm; margin-top: 5mm; display: inline-block; vertical-align: top;")
      h6(class="body-2") Elaboró ___________________________________
      p(class="body-2") Jefe de Producción y Mantenimiento

    div(style="width: 49%; margin-left: 2%; height:40mm; margin-top: 5mm; display: inline-block; vertical-align: top;")
      h6(class="body-2") Revisó ____________________________________
      p(class="body-2") Dirección Técnica y Jefe de Control de Calidad
</template>

<script>
import RECPRODCOMS from '~/queries/Recprodcoms.gql'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      pages: [
        {Size: 'Letter', Layout: 'Portrait'}
      ],
      Fecha: null,
      Proveedor: null,
      Producto: null,
      Cantidad: null,
      CantidadM3: null,
      UnidadDeMedida: null,
      Lote: null,
      FechaFabricacion: null,
      FechaVencimiento: null,
      PurezaFinal: null,
      PresionFinal: null,
      Certificado: null,
      RegistroSanitario: null,
      Otros: null,
      Observacion: null,

      items1: [],
      items2: [],
      loading: 0
    }
  },
  layout: 'report',
  fetch ({ store }) {
    store.commit('reports/changeTitle', 'RECEPCIÓN DE PRODUCTO A COMERCIALIZAR')
  },
  computed: {
    Numero () {
      return this.$store.state.recprodcom.Numero
    }
  },
  apollo: {
    Produccions: {
      query: RECPRODCOMS,
      fetchPolicy: 'network-only',
      variables () {
        return {
          Numero: this.Numero !== null ? this.Numero : '',
        }
      },
      update (data) {
        console.log(data)
        if (data.Recprodcoms.length > 0) {
          this.Fecha = data.Recprodcoms[0].Fecha
          this.Lote = data.Recprodcoms[0].Lote
          this.FechaFabricacion = data.Recprodcoms[0].FechaFabricacion
          this.FechaVencimiento = data.Recprodcoms[0].FechaVencimiento
          this.Proveedor = data.Recprodcoms[0].Proveedor
          this.Producto = data.Recprodcoms[0].Producto.Nombre
          this.PurezaFinal = data.Recprodcoms[0].PurezaFinal
          this.PresionFinal = data.Recprodcoms[0].PresionFinal
          this.Certificado = data.Recprodcoms[0].Certificado
          this.RegistroSanitario = data.Recprodcoms[0].RegistroSanitario
          this.Otros = data.Recprodcoms[0].Otros
          this.Observacion = data.Recprodcoms[0].Observacion

          this.items1 = []
          this.Cantidad = 0
          this.CantidadM3 = 0.0
          this.UnidadDeMedida = data.Recprodcoms[0].Producto.UnidadDeMedida
          var length = data.Recprodcoms.length;

          for ( let i=0; i<=19; i++ ) {
            if( i < length ) {
              var tmp = {
                Producto: {
                  Id: data.Recprodcoms[i].Producto.Id,
                  Nombre: data.Recprodcoms[i].Producto.Nombre
                },
                Envase: {
                  Id: data.Recprodcoms[i].Envase.Id,
                  Numero: data.Recprodcoms[i].Envase.Numero,
                  Capacidad: data.Recprodcoms[i].Envase.Capacidad,
                  UnidadDeMedida: data.Recprodcoms[i].Producto.UnidadDeMedida,
                  Cliente: data.Recprodcoms[i].Envase.Propietario
                },
                Cantidad: data.Recprodcoms[i].Cantidad,
              }

              this.Cantidad++
              this.CantidadM3 += data.Recprodcoms[i].Cantidad

            } else {
              var tmp = {
                Producto: {
                  Id: null,
                  Nombre: null
                },
                Envase: {
                  Id: null,
                  Numero: null,
                  Capacidad: null,
                  UnidadDeMedida: null,
                  Cliente: {Nombre: null},
                },
                Cantidad: null
              }
            }

            this.items1.push(tmp)
          }

          this.items2 = []

          for ( let i=20; i<=39; i++ ) {
            if( i < length ) {
              var tmp = {
                Producto: {
                  Id: data.Recprodcoms[i].Producto.Id,
                  Nombre: data.Recprodcoms[i].Producto.Nombre
                },
                Envase: {
                  Id: data.Recprodcoms[i].Envase.Id,
                  Numero: data.Recprodcoms[i].Envase.Numero,
                  Capacidad: data.Recprodcoms[i].Envase.Capacidad,
                  UnidadDeMedida: data.Recprodcoms[i].Producto.UnidadDeMedida,
                  Cliente: data.Recprodcoms[i].Envase.Propietario
                },
                Cantidad: data.Recprodcoms[i].Cantidad,
              }

              this.Cantidad++
              this.CantidadM3 += data.Recprodcoms[i].Cantidad

            } else {
              var tmp = {
                Producto: {
                  Id: null,
                  Nombre: null
                },
                Envase: {
                  Id: null,
                  Numero: null,
                  Capacidad: null,
                  UnidadDeMedida: null,
                  Cliente: {Nombre: null}
                },
                Cantidad: null
              }
            }

            this.items2.push(tmp)
          }

        }
      }
    }
  },
  methods: {
    fechaMilitar (fecha){
      if(null === fecha ){return '';}
      let fechaList = fecha.split('-');
      let fechaMil = `${fechaList[2]}/${fechaList[1]}/${fechaList[0].substr(2,2)}`;
      return fechaMil;
    },
    MaxLength (value, len) {
      if(value){
        return value.length >= len ? value.substr(0, (len-3))+'...' : value;
      }
    },
    Redondear(num, scale) {
      if(!("" + num).includes("e")) {
        return +(Math.round(num + "e+" + scale)  + "e-" + scale);
      } else {
        var arr = ("" + num).split("e");
        var sig = ""
        if(+arr[1] + scale > 0) {
          sig = "+";
        }
        return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

@page
  size letter portrait
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
