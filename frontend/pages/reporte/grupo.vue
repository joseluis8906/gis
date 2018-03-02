<template lang="pug">
v-container(pt-0 pr-0 pb-0 pl-0 mt-0 mb-0)
  page(v-bind:size="page.Size" v-bind:layout="page.Layout" v-for="(page, i) in pages" :key="i")
    table(style="width: 100%; height: auto; margin-bottom: 3mm")
      thead
      tbody
        tr
          th(rowspan="5" style="width: 7.5%; text-align: center")
            img(src="~assets/logo.gis.png" style="width: 100%")
          th(rowspan="5" style="text-align: center; width: 80%") GRUPOS
        //-tr
          td(class="lado") Código
          td(class="lado") FVT-017
        tr
          td(class="lado") Página
          td(class="lado") 0{{ i+1 }}
        //-tr
          td(class="lado") Versión
          td(class="lado") 01
        tr
          td(class="lado") Fecha
          td(class="lado") {{ Fecha }}

    table(style="width: 100%; height: auto" class="table-kardex" )
      thead
        tr(class="green lighten-3")
          th(style="width: 10%") N°
          th(style="width: 20%") Name

      tbody
        tr(v-for="(item, j) in page.Items" :key="j")
          td(style="text-align: right; font-size: 7.5pt;") {{ j + 1 }}
          td(style="text-align: right; font-size: 7.5pt;") {{ item.Name }}

</template>

<script>

import GROUPS from '~/queries/Groups.gql'

export default {
  data () {
    return {
      pages: [],
      loading: 0,
      Fecha: '2017-11-10',
    }
  },
  layout: 'report',
  fetch ({ store }) {
    store.commit('reports/changeTitle', 'Grupos')
  },
  mounted() {
    this.$nextTick( ()=>{
      this.Buscar();
    });
  },
  methods: {
    MaxLength ( value ) {
      if( value ){
        //console.log(value.length)
        return value.length >= 26 ? value.substr(0, 20)+'...'+value.substr(-6, 6) : value;
      }
    },
    Buscar () {
      var Variables = {}

      this.$apollo.query({
        query: GROUPS,
        fetchPolicy: 'network-only',
        variables: Variables
      }).then( R => {
        var data = R.data;
        //console.log(data);
        let page = 0;
        for( let i=0; i < data.Groups.length; i++ ) {
          let tmp = data.Groups[i];
          if( Number.isInteger(i / 34) ){
            page = Math.trunc(i / 34);
            this.pages.push({Size: 'Letter', Layout: 'Landscape', Items: []});
          }
          this.pages[page].Items.push(tmp)
        }
      });
    },
    printRoles (roles){
      let rolesString = '';
      roles.forEach(R => {
        rolesString +=  `[${R.Name}], `;
      });
      return rolesString;
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
