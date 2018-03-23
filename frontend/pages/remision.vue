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
            v-icon(ma) compare_arrows
            |  Remisión

      v-tabs(dark fixed icons v-model="active")
        v-tabs-bar(slot="activators" class="light-blue darken-4")

          v-tabs-item(href="#editar")
            v-icon(fa) edit
            p(class="body-2 grey--text text--lighten-4") Editar

          v-tabs-slider(class="yellow")

        v-tabs-content(id="editar")
          v-card-text
            app-remision-editar
</template>

<script>
  import AppRemisionEditar from '~/components/remision/editar.vue';

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    active: 'editar',
    loading: 0
  }),
  beforeMount () {
    if ( sessionStorage.getItem('x-access-token') === null ) {
      this.$router.push('/')
    } else {
      var Roles = JSON.parse(sessionStorage.getItem('x-access-roles'))
      this.$store.commit('security/AddRoles', Roles);

      var AvailableRoles = ["Gerencia", "Ventas"];

      var allowAccess = false;
      for (let i=0;i<Roles.length; i++) {
        if(AvailableRoles.indexOf(Roles[i]) !== -1) {
          allowAccess = true;
          break;
        }
      }

      if(!allowAccess){
        sessionStorage.removeItem("x-access-token");
        sessionStorage.removeItem("x-access-roles");
        this.$router.push('/');
      }
    }
  },
  components: {
    AppRemisionEditar
  }
};

</script>

<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

.input-tab
  text-align center
  outline none
  border-bottom 1px dotted #555555

.select-especial
  border-bottom none !important

.input-group--select
  height: 32px

</style>
