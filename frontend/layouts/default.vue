<template>
  <v-app
    id="sandbox"
    :dark="dark"
    :light="!dark"
    standalone>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      persistent="persistent">
        <v-list dense>
          <template v-for="(item, i) in items">
            <v-list-tile :key="i" nuxt link :to="item.to">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>            
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
         </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.native.stop="primaryDrawer.model = !primaryDrawer.model" v-if="primaryDrawer.type !== 'permanent'"></v-toolbar-side-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid mb-5>
        <nuxt />
      </v-container>
    </main>
    <v-footer fixed>
      <span>© {{ new Date().getFullYear() }} </span>Jose Luis Cáceres Escudero
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dark: true,
      primaryDrawer: {
        model: true,
        type: 'persistent',
        clipped: false,
        floating: true,
        mini: false
      },
      footer: {
        fixed: true
      },
      items: [
        { icon: 'home', text: 'Index', to: '/'},
        { icon: 'lightbulb_outline', text: 'Inspire', to: '/inspire' },
        { icon: 'touch_app', text: 'Example', to: '/example' }
      ],
      title: 'Frontend'
    })
  }
</script>

<style lang="stylus">

#sandbox
  border 1px solid rgba(0, 0, 0, .1)
  overflow hidden

</style>
