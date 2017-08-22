'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _7a73cfca = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _0d8a3d08 = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/remision.vue' /* webpackChunkName: "pages/remision" */)

const _0c2552a2 = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/produccion.vue' /* webpackChunkName: "pages/produccion" */)

const _dbe0b71a = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/kardex.vue' /* webpackChunkName: "pages/kardex" */)

const _090b1ddc = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/ente.vue' /* webpackChunkName: "pages/ente" */)

const _5abbf505 = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/about.vue' /* webpackChunkName: "pages/about" */)

const _777abc9e = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/envase.vue' /* webpackChunkName: "pages/envase" */)

const _2ceafdd2 = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/inspire.vue' /* webpackChunkName: "pages/inspire" */)

const _441b72e1 = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/login.vue' /* webpackChunkName: "pages/login" */)

const _17a4aa98 = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/producto.vue' /* webpackChunkName: "pages/producto" */)

const _9703adcc = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/reporte/remision.vue' /* webpackChunkName: "pages/reporte-remision" */)

const _1e1c3b91 = () => import('/media/Datos/joseluis/Developments/gis/frontend/pages/reporte/kardex.vue' /* webpackChunkName: "pages/reporte-kardex" */)



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
			component: _7a73cfca,
			name: "index"
		},
		{
			path: "/remision",
			component: _0d8a3d08,
			name: "remision"
		},
		{
			path: "/produccion",
			component: _0c2552a2,
			name: "produccion"
		},
		{
			path: "/kardex",
			component: _dbe0b71a,
			name: "kardex"
		},
		{
			path: "/ente",
			component: _090b1ddc,
			name: "ente"
		},
		{
			path: "/about",
			component: _5abbf505,
			name: "about"
		},
		{
			path: "/envase",
			component: _777abc9e,
			name: "envase"
		},
		{
			path: "/inspire",
			component: _2ceafdd2,
			name: "inspire"
		},
		{
			path: "/login",
			component: _441b72e1,
			name: "login"
		},
		{
			path: "/producto",
			component: _17a4aa98,
			name: "producto"
		},
		{
			path: "/reporte/remision",
			component: _9703adcc,
			name: "reporte-remision"
		},
		{
			path: "/reporte/kardex",
			component: _1e1c3b91,
			name: "reporte-kardex"
		}
  ]
})
