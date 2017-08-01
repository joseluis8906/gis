<template lang="pug">
doctype html
v-layout(row wrap pt-3)
  v-flex(xs12 md2)
  v-flex(xs12 md2 v-for="(item,i) in items" v-bind:key="i")
    div(class="text-xs-center g-container-img-icon-grid")
      div(class="")
        div(class="small")
          pie-chart(:chart-data="item.datacollection" :options="{ tooltips: { enabled: false } }")
        h3(class="text-xs-center g-charts-percent") {{ item.datacollection.title }}%
        p(class="text-xs-center g-charts-percent") {{ item.datacollection.body }}
  v-flex(xs12 md2)
</template>

<script>
import PieChart from '~components/PieChart.js'
const deepOrange = '#e64a19'
const transparent = 'grey'
export default {
  components: {
    PieChart
  },
  data () {
    return {
      items: [
        {
          datacollection: {}
        },
        {
          datacollection: {}
        },
        {
          datacollection: {}
        },
        {
          datacollection: {}
        }
      ]
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      var datas = [
        {porcentaje: 41, body: 'Expansión De Mercado'},
        {porcentaje: 56, body: 'Crecimiento De Empleo'},
        {porcentaje: 66, body: 'Volumen De Inversion'},
        {porcentaje: 90, body: 'Aumento Salarial'}
      ]
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].datacollection = {
          labels: [],
          datasets: [
            {
              label: '',
              borderColor: '#ebebed',
              backgroundColor: [deepOrange, transparent],
              data: [datas[i].porcentaje, (100 - datas[i].porcentaje)]
            }
          ],
          title: datas[i].porcentaje,
          body: datas[i].body
        }
      }
    }
  }
}
</script>

<style lang="stylus" scope>
.small 
  max-width 148px;
  margin 0 auto 0.75em auto
  
.g-charts-percent
  font-weight bold

</style>
