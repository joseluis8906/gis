<template lang="pug">
doctype html
v-app(id="sandbox" :dark="dark" :light="!dark" standalone)
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
      footer: {
        fixed: true
      },
      title: 'Iniciar Sesión'
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
