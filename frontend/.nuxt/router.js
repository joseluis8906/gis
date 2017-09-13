'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _dde9bb94 = () => import('/home/jose/Developments/gis/frontend/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _0cb92126 = () => import('/home/jose/Developments/gis/frontend/pages/ente.vue' /* webpackChunkName: "pages/ente" */)

const _4e629f87 = () => import('/home/jose/Developments/gis/frontend/pages/kardex.vue' /* webpackChunkName: "pages/kardex" */)

const _ca80c8dc = () => import('/home/jose/Developments/gis/frontend/pages/usuario.vue' /* webpackChunkName: "pages/usuario" */)

const _219ca3b6 = () => import('/home/jose/Developments/gis/frontend/pages/produccion.vue' /* webpackChunkName: "pages/produccion" */)

const _71534771 = () => import('/home/jose/Developments/gis/frontend/pages/about.vue' /* webpackChunkName: "pages/about" */)

const _c4d13b66 = () => import('/home/jose/Developments/gis/frontend/pages/grupo.vue' /* webpackChunkName: "pages/grupo" */)

const _268930e0 = () => import('/home/jose/Developments/gis/frontend/pages/remision.vue' /* webpackChunkName: "pages/remision" */)

const _0b2530ac = () => import('/home/jose/Developments/gis/frontend/pages/producto.vue' /* webpackChunkName: "pages/producto" */)

const _33cdb7b2 = () => import('/home/jose/Developments/gis/frontend/pages/envase.vue' /* webpackChunkName: "pages/envase" */)

const _0a113584 = () => import('/home/jose/Developments/gis/frontend/pages/inspire.vue' /* webpackChunkName: "pages/inspire" */)

const _5ab2c54d = () => import('/home/jose/Developments/gis/frontend/pages/login.vue' /* webpackChunkName: "pages/login" */)

const _22b7b058 = () => import('/home/jose/Developments/gis/frontend/pages/reporte/produccion.vue' /* webpackChunkName: "pages/reporte-produccion" */)

const _169ce2a5 = () => import('/home/jose/Developments/gis/frontend/pages/reporte/kardex.vue' /* webpackChunkName: "pages/reporte-kardex" */)

const _e11d49a4 = () => import('/home/jose/Developments/gis/frontend/pages/reporte/remision.vue' /* webpackChunkName: "pages/reporte-remision" */)



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
			component: _dde9bb94,
			name: "index"
		},
		{
			path: "/ente",
			component: _0cb92126,
			name: "ente"
		},
		{
			path: "/kardex",
			component: _4e629f87,
			name: "kardex"
		},
		{
			path: "/usuario",
			component: _ca80c8dc,
			name: "usuario"
		},
		{
			path: "/produccion",
			component: _219ca3b6,
			name: "produccion"
		},
		{
			path: "/about",
			component: _71534771,
			name: "about"
		},
		{
			path: "/grupo",
			component: _c4d13b66,
			name: "grupo"
		},
		{
			path: "/remision",
			component: _268930e0,
			name: "remision"
		},
		{
			path: "/producto",
			component: _0b2530ac,
			name: "producto"
		},
		{
			path: "/envase",
			component: _33cdb7b2,
			name: "envase"
		},
		{
			path: "/inspire",
			component: _0a113584,
			name: "inspire"
		},
		{
			path: "/login",
			component: _5ab2c54d,
			name: "login"
		},
		{
			path: "/reporte/produccion",
			component: _22b7b058,
			name: "reporte-produccion"
		},
		{
			path: "/reporte/kardex",
			component: _169ce2a5,
			name: "reporte-kardex"
		},
		{
			path: "/reporte/remision",
			component: _e11d49a4,
			name: "reporte-remision"
		}
  ]
})
