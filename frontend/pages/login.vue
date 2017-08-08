<template lang="pug">
  v-layout(column justify-center align-center pt-0 pb-0)
    v-flex(xs12 sm10 md6 )

      v-card(class="mt-5 pt-3 pb-3 pl-3 pr-3")
        v-card-text
          div(class="text-xs-center")
            img(src="~assets/logo.gis.png" alt="Vuetify.js")
            
          h6(class="pt-4 grey--text text--lighten-4") Inicie Sessión
          p(class="pb-4") Con su cuenta GIS
          
          v-text-field(label="Nombre de Usuario" id="UserName" class="pb-3")
          v-text-field(label="Contraseña" id="Password")
            
                
        v-card-actions
          v-btn(primary dark router nuxt to="/inspire" class="mb-3") Continuar
          
</template>

<script>
  export default {
    layout: 'plain'
  }
</script>
