<template lang="pug">
v-layout( align-center justify-center )
  v-snackbar(
    :timeout="snackbar.timeout"
    :success="snackbar.context === 'success'"
    :info="snackbar.context === 'info'"
    :warning="snackbar.context === 'warning'"
    :error="snackbar.context === 'error'"
    :primary="snackbar.context === 'primary'"
    :secondary="snackbar.context === 'secondary'"
    :multi-line="snackbar.mode === 'multi-line'"
    :vertical="snackbar.mode === 'vertical'"
    :top="true"
    v-model="loading" )
      h6(class="grey--text text--lighten-4 mb-0") {{ snackbar.text }}
      v-icon autorenew

  v-flex( xs12 )
    v-card
      v-layout(row wrap pt-3 light-blue)
        v-flex( xs12 )
          h5(class="grey--text text--lighten-4 text-xs-center bold")
            v-icon(ma) subtitles
            |  Ente

      v-tabs(dark fixed icons v-model="active")
        v-tabs-bar(slot="activators" class="light-blue darken-4")

          v-tabs-item(href="#editar")
            v-icon create
            p(class="body-2 grey--text text--lighten-4") Editar

          v-tabs-item(href="#listar")
            v-icon search
            p(class="body-2 grey--text text--lighten-4") Listar

          v-tabs-slider(class="yellow")

        v-tabs-content(id="editar")
          v-card-text
            app-ente-edit

        v-tabs-content(id="listar")
          v-card-text
            app-ente-listar

</template>

<script>

import AppEnteEdit from '~/components/ente/edit';
import AppEnteListar from '~/components/ente/listar';



export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    loading: 0,
    active: "editar",
  }),
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    } else {
      var Roles = JSON.parse(sessionStorage.getItem('x-access-roles'))
      this.$store.commit('security/AddRoles', Roles);
    }
  },
  components: {
    AppEnteEdit,
    AppEnteListar
  }
};


</script>

<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

</style>
