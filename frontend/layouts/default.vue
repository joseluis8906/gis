<template lang="pug">
doctype html
v-app(id="sandbox" :dark="dark" :light="!dark" standalone)
  v-navigation-drawer(v-model="primaryDrawer.model" persistent="persistent")
    v-list(dense)
      template(v-for="(item, i) in items")
        v-list-tile(:key="i" nuxt link :to="item.to")
          v-list-tile-action
            v-icon {{ item.icon }}
            
          v-list-tile-content
            v-list-tile-title {{ item.text }}
            
  v-toolbar(fixed)
    v-toolbar-side-icon(@click.native.stop="primaryDrawer.model = !primaryDrawer.model" v-if="primaryDrawer.type !== 'permanent'")
    v-toolbar-title {{ title }}
    
  main
    v-container(fluid mb-5 pt-0)
      nuxt
      
  v-footer(fixed)
    <span> © {{ new Date().getFullYear() }} </span> Jose Luis Cáceres Escudero
    
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
        { icon: 'subtitles', text: 'Ente', to: '/ente'},
        { icon: 'battery_alert', text: 'Envase', to: '/envase' },
        { icon: 'settings', text: 'Produccion', to: '/produccion' },
        { icon: 'compare_arrows', text: 'Remisión', to: '/remision' },
        { icon: 'assignment', text: 'Kardex', to: '/kardex' },
        { icon: 'exit_to_app', text: 'Salir', to: '/'}
      ],
      title: 'Administración GIS'
    })
  }
</script>

<style lang="stylus">
@import '../node_modules/vuetify/src/stylus/settings/_colors'

$theme := {
  primary: $teal.lighten-3
  accent: $blue.accent-2
  secondary: $grey.darken-3
  info: $blue.base
  warning: $amber.base
  error: $red.base
  success: $green.base
}
/*primary: $teal.lighten-3*/
 
@import '~vuetify/src/stylus/main'

#sandbox
  border 1px solid rgba(0, 0, 0, .1)
  overflow hidden

</style>
