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
            v-icon(ma) settings
            |  Producción

      v-tabs(dark fixed icons v-model="active")
        v-tabs-bar(slot="activators" class="light-blue darken-4")

          v-tabs-item(href="#interna")
            v-icon assignment_returned
            p(class="body-2 grey--text text--lighten-4") Interna

          v-tabs-item(href="#externa")
            v-icon add_shopping_cart
            p(class="body-2 grey--text text--lighten-4") Externa

          v-tabs-item(href="#correria")
            v-icon people
            p(class="body-2 grey--text text--lighten-4") Correria

          v-tabs-item(href="#listar")
            v-icon search
            p(class="body-2 grey--text text--lighten-4") Buscar



          v-tabs-slider(class="yellow")

        v-tabs-content(id="interna")
          v-card-text
            app-produccion-interna

        v-tabs-content(id="externa")
          v-card-text
            app-produccion-externa

        v-tabs-content(id="listar")
          v-card-text
            app-produccion-listar

        v-tabs-content(id="correria")
          v-card-text
            app-produccion-correria
</template>

<script>

  import AppProduccionInterna from '~/components/produccion/interna';
  import AppProduccionExterna from '~/components/produccion/externa';
  import AppProduccionListar from '~/components/produccion/listar';
  import AppProduccionCorreria from '~/components/produccion/correria';

  export default {
    data: () => ({
      snackbar: {
        context: 'secondary',
        mode: '',
        timeout: 6000,
        text: 'Cargando'
      },
      active: null,
      loading: null,
    }),
    beforeMount () {
      if ( sessionStorage.getItem('x-access-token') === null ) {
        this.$router.push('/')
      } else {
        var Roles = JSON.parse(sessionStorage.getItem('x-access-roles'))
        this.$store.commit('security/AddRoles', Roles);

        var AvailableRoles = ["Gerencia", "Produccion"];

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
      AppProduccionInterna,
      AppProduccionExterna,
      AppProduccionListar,
      AppProduccionCorreria
    }
  };
</script>

<style lang="stylus" scoped>

h5.bold
  font-weight bold

.alert-especial
  position absolute

.input-group--select
  height: 31px

.application .theme--dark.btn:disabled:not(.btn--icon):not(.btn--flat)
  background-color black !important
</style>
