<template lang="pug">
v-container(pt-0 pr-0 pb-0 pl-0 mt-0 mb-0)
  page(v-bind:size="page.Size" v-bind:layout="page.Layout" v-for="(page, i) in pages" :key="i")
    table(style="width: 100%; height: auto; margin-bottom: 3mm")
      thead
      tbody
        tr
          th(rowspan="5" style="width: 7.5%; text-align: center")
            img(src="~assets/logo.gis.png" style="width: 100%")
          th(rowspan="5" style="text-align: center; width: 75%") ENTREGA DE ENVASES
        tr
          td(class="lado") Código
          td(class="lado") FEV-004
        tr
          td(class="lado") Página
          td(class="lado") 0{{ i+1 }}
        tr
          td(class="lado") Versión
          td(class="lado") 09
        tr
          td(class="lado") Fecha
          td(class="lado") {{ Fecha }}

    table(style="width: 100%; height: auto" class="table-kardex" )
      thead
        tr(class="green lighten-3")
          th(style="width: 4%") N°
          th(style="width: 6%") Capacidad
          th(style="width: 8%") Descripción
          th(style="width: 8%") Número
          th(style="width: 20%") Cliente
          th(style="width: 10%") Lote
          th(style="width: 10%") LLeno/Vacío
          th(style="width: 10%") Tapa

      tbody
        tr(v-for="(item, j) in page.Items" :key="j")
          td {{ item.Contador }}
          td(style="text-align: right; font-size: 7.5pt;") {{ ImprimirCantidad(item) }}
          td(style="text-align: right; font-size: 7.5pt;")
          td(style="text-align: right; font-size: 7.5pt;") {{ ImprimirEnvase(item) }}
          td(style="text-align: right; font-size: 7.5pt;") {{ MaxLength(ImprimirCliente(item)) }}
          td(style="text-align: right; font-size: 7.5pt;") {{ ImprimirLote(item) }}
          td(style="text-align: right; font-size: 7.5pt;") Lleno
          td(style="text-align: right; font-size: 7.5pt;") {{ ImprimirTapa(item) }}

</template>

<script>
  import CORRERIAS from '~/queries/Correrias.gql'

  export default {
    data () {
      return {
        pages: [],
        loading: 0,
        Fecha: '2017-11-10'
      }
    },
    layout: 'report',
    fetch ({ store }) {
      store.commit('reports/changeTitle', 'Despacho De Envases')
    },
    computed: {
      Numero () {
        return this.$store.state.correria.Numero;
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.Buscar();
      });
    },
    methods: {
      Buscar () {
        this.$apollo.query({
          query: CORRERIAS,
          fetchPolicy: 'network-only',
          variables () {
            Numero: this.Numero
          }
        }).then( res => {
          let data = res.data;
          var contador = 0;
          let page = 0;

          for( let i=0; i < data.Correrias.length; i++ ) {
            contador += 1;

            var tmp = {
              Contador: contador,
              Numero: data.Correrias[i].Numero,
              Recprodcom: data.Correrias[i].Recprodcom,
              Produccion: data.Correrias[i].Produccion
            }

            if( Number.isInteger(i / 34) ){
              page = Math.trunc(i / 34);
              this.pages.push({Size: 'Letter', Layout: 'Portrait', Items: []});
            }

            this.pages[page].Items.push(tmp);
          }
        });
      },
      MaxLength ( value ) {
        if( value ){
          //console.log(value.length)
          return value.length >= 26 ? value.substr(0, 20)+'...'+value.substr(-6, 6) : value;
        }
      },
      ImprimirCantidad(item){
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;

        if(null !== Produccion) return `${Produccion.Cantidad} ${Produccion.Producto.UnidadDeMedida}`;
        if(null !== Recprodcom) return `${Recprodcom.Cantidad} ${Recprodcom.Producto.UnidadDeMedida}`;

        return '';
      },
      ImprimirEnvase(item){
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;

        if(null !== Produccion) return Produccion.Envase.Numero;
        if(null !== Recprodcom) return Recprodcom.Envase.Numero;

        return '';
      },
      ImprimirCliente(item){
        console.log(item);
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;

        if(null !== Produccion) return Produccion.Envase.Propietario.Nombre;
        if(null !== Recprodcom) return Recprodcom.Envase.Propietario.Nombre;

        return '';
      },
      ImprimirLote(item){
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;

        if(null !== Produccion) return Produccion.Lote;
        if(null !== Recprodcom) return Recprodcom.Lote;

        return '';
      },
      ImprimirTapa(item){
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;

        if(null !== Produccion) return Produccion.Envase.Valvula;
        if(null !== Recprodcom) return Recprodcom.Envase.Valvula;

        return '';
      },
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
