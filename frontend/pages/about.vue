<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="~assets/logo.gis.png" class="mb-5" />
      </div>
      <v-card>
        <v-card-text>
          <p>Bienvenido a GIS.</p>
          <p>Somos una organización dedicada a la producción de oxigeno medicinal e industrial 
            y la comercialización de gases del aire con productos de alta calidad, con servicios 
            eficientes y oportunos a través de un equipo humano y técnico altamente calificado, 
            contribuyendo así al mejoramiento de la salud y el desarrollo sostenible de la sociedad.</p>
          <div class="text-xs-right">
            <em><small>&mdash; José Jesus Carrascal</small></em>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn primary flat router nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  beforeMount () {
    if (
      sessionStorage.getItem('x-access-token') === null 
      || 
      sessionStorage.getItem('x-access-token') === null ){

      this.$router.push('/')
    }

    this.$store.commit('security/AddRoles', []);
  }
}
</script>