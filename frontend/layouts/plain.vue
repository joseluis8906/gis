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
      dark: false,
      footer: {
        fixed: true
      },
      title: 'Iniciar Sesión'
    })
  }
</script>

<style lang="stylus">
@import '../node_modules/vuetify/src/stylus/settings/_colors'
 
@import '../node_modules/vuetify/src/stylus/main'

#sandbox
  border 1px solid rgba(0, 0, 0, .1)
  overflow hidden

</style>
