'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _05eb77e9 = () => import('/home/joseluis/Developments/gis/frontend/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _1a5f5e06 = () => import('/home/joseluis/Developments/gis/frontend/pages/remision.vue' /* webpackChunkName: "pages/remision" */)

const _63246dda = () => import('/home/joseluis/Developments/gis/frontend/pages/ente.vue' /* webpackChunkName: "pages/ente" */)

const _6257d06e = () => import('/home/joseluis/Developments/gis/frontend/pages/testgraphql.vue' /* webpackChunkName: "pages/testgraphql" */)

const _46221dcc = () => import('/home/joseluis/Developments/gis/frontend/pages/reporteremision.vue' /* webpackChunkName: "pages/reporteremision" */)

const _0139b4c3 = () => import('/home/joseluis/Developments/gis/frontend/pages/reportekardex.vue' /* webpackChunkName: "pages/reportekardex" */)

const _13c6343a = () => import('/home/joseluis/Developments/gis/frontend/pages/produccion.vue' /* webpackChunkName: "pages/produccion" */)

const _758d0034 = () => import('/home/joseluis/Developments/gis/frontend/pages/kardex.vue' /* webpackChunkName: "pages/kardex" */)

const _5af8185f = () => import('/home/joseluis/Developments/gis/frontend/pages/envase.vue' /* webpackChunkName: "pages/envase" */)

const _60d9ca00 = () => import('/home/joseluis/Developments/gis/frontend/pages/login.vue' /* webpackChunkName: "pages/login" */)

const _3398c5b8 = () => import('/home/joseluis/Developments/gis/frontend/pages/about.vue' /* webpackChunkName: "pages/about" */)

const _98001e7e = () => import('/home/joseluis/Developments/gis/frontend/pages/example.vue' /* webpackChunkName: "pages/example" */)

const _8dcdcb9e = () => import('/home/joseluis/Developments/gis/frontend/pages/inspire.vue' /* webpackChunkName: "pages/inspire" */)



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
			component: _05eb77e9,
			name: "index"
		},
		{
			path: "/remision",
			component: _1a5f5e06,
			name: "remision"
		},
		{
			path: "/ente",
			component: _63246dda,
			name: "ente"
		},
		{
			path: "/testgraphql",
			component: _6257d06e,
			name: "testgraphql"
		},
		{
			path: "/reporteremision",
			component: _46221dcc,
			name: "reporteremision"
		},
		{
			path: "/reportekardex",
			component: _0139b4c3,
			name: "reportekardex"
		},
		{
			path: "/produccion",
			component: _13c6343a,
			name: "produccion"
		},
		{
			path: "/kardex",
			component: _758d0034,
			name: "kardex"
		},
		{
			path: "/envase",
			component: _5af8185f,
			name: "envase"
		},
		{
			path: "/login",
			component: _60d9ca00,
			name: "login"
		},
		{
			path: "/about",
			component: _3398c5b8,
			name: "about"
		},
		{
			path: "/example",
			component: _98001e7e,
			name: "example"
		},
		{
			path: "/inspire",
			component: _8dcdcb9e,
			name: "inspire"
		}
  ]
})
