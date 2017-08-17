'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _1089b722 = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _cfa0c9b8 = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/remision.vue' /* webpackChunkName: "pages/remision" */)

const _7e5b7b6c = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/produccion.vue' /* webpackChunkName: "pages/produccion" */)

const _8292afca = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/kardex.vue' /* webpackChunkName: "pages/kardex" */)

const _31de3eba = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/ente.vue' /* webpackChunkName: "pages/ente" */)

const _1e5c4746 = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/about.vue' /* webpackChunkName: "pages/about" */)

const _b7bc7f74 = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/envase.vue' /* webpackChunkName: "pages/envase" */)

const _d5b721ac = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/inspire.vue' /* webpackChunkName: "pages/inspire" */)

const _4b9d4b8e = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/login.vue' /* webpackChunkName: "pages/login" */)

const _92cd3780 = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/producto.vue' /* webpackChunkName: "pages/producto" */)

const _3eda8a7c = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/reporte/remision.vue' /* webpackChunkName: "pages/reporte-remision" */)

const _640dd18e = () => import('/media/joseluis/Datos/Developments/gis/frontend/pages/reporte/kardex.vue' /* webpackChunkName: "pages/reporte-kardex" */)



const scrollBehavior = (to, from, savedPosition) => {
  // savedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // if no children detected
    if (to.matched.length < 2) {
      // scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // if one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // if link has anchor,  scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export default new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  scrollBehavior,
  routes: [
		{
			path: "/",
			component: _1089b722,
			name: "index"
		},
		{
			path: "/remision",
			component: _cfa0c9b8,
			name: "remision"
		},
		{
			path: "/produccion",
			component: _7e5b7b6c,
			name: "produccion"
		},
		{
			path: "/kardex",
			component: _8292afca,
			name: "kardex"
		},
		{
			path: "/ente",
			component: _31de3eba,
			name: "ente"
		},
		{
			path: "/about",
			component: _1e5c4746,
			name: "about"
		},
		{
			path: "/envase",
			component: _b7bc7f74,
			name: "envase"
		},
		{
			path: "/inspire",
			component: _d5b721ac,
			name: "inspire"
		},
		{
			path: "/login",
			component: _4b9d4b8e,
			name: "login"
		},
		{
			path: "/producto",
			component: _92cd3780,
			name: "producto"
		},
		{
			path: "/reporte/remision",
			component: _3eda8a7c,
			name: "reporte-remision"
		},
		{
			path: "/reporte/kardex",
			component: _640dd18e,
			name: "reporte-kardex"
		}
  ]
})
