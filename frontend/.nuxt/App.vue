<template>
  <div id="__nuxt">
    <nuxt-loading ref="loading"></nuxt-loading>
    <component v-if="layout" :is="layout"></component>
  </div>
</template>

<script>
import NuxtLoading from './components/nuxt-loading.vue'

let layouts = {

  "_default": () => import('/media/Datos/joseluis/Developments/gis/frontend/layouts/default.vue'  /* webpackChunkName: "layouts/default" */),

  "_page": () => import('/media/Datos/joseluis/Developments/gis/frontend/layouts/page.vue'  /* webpackChunkName: "layouts/page" */),

  "_plain": () => import('/media/Datos/joseluis/Developments/gis/frontend/layouts/plain.vue'  /* webpackChunkName: "layouts/plain" */),

  "_report": () => import('/media/Datos/joseluis/Developments/gis/frontend/layouts/report.vue'  /* webpackChunkName: "layouts/report" */)

}

export default {
  head: {"title":"starter","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Nuxt.js project"}],"link":[{"rel":"icon","type":"image/png","href":"/logo.gis.favicon.png"},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css?family=Work+Sans:200"},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css?family=Archivo+Black"},{"rel":"stylesheet","href":"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"},{"rel":"stylesheet","href":"https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/1.9.33/css/materialdesignicons.min.css"}]},
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  
  mounted () {
    this.$loading = this.$refs.loading
    this.$nuxt.$loading = this.$loading
  },
  
  methods: {
    setLayout (layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      let _layout = '_' + layout
      this.layout = layouts[_layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      let _layout = '_' + layout
      if (typeof layouts[_layout] !== 'function') {
        return Promise.resolve(layouts[_layout])
      }
      return layouts[_layout]()
      .then((Component) => {
        layouts[_layout] = Component
        return layouts[_layout]
      })
      .catch((e) => {
        if (this.$nuxt) {
          return this.$nuxt.error({ statusCode: 500, message: e.message })
        }
        console.error(e)
      })
    }
  },
  components: {
    NuxtLoading
  }
}
</script>


<style src="swiper/dist/css/swiper.css" lang="css"></style>

<style src="~assets/style/app.styl" lang="styl"></style>

