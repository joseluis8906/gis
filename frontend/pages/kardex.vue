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
            v-icon(ma) assignment
            |  Kardéx
      v-card-text
        v-layout( row wrap )
          v-flex( xs12 )
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu3"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )

              v-text-field( slot="activator"
                            label="Fecha"
                            v-model="Fecha"
                            readonly )

              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="Fecha"
                             no-title
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar

            v-select(
              v-bind:items="ItemsTipoKardex"
              v-model="TipoKardex"
              label="Tipo"
              item-value="text"
              dark )

            v-text-field(
              v-model="NumeroEnvase"
              label="Buscar Envases"
              append-icon="search"
              v-if="esUnico"
              :append-icon-cb="BuscarEnvase")

            v-select(
              v-bind:items="ItemsEnvase"
              v-model="Envase"
              label="Envase"
              item-text="Numero"
              item-value="Id"
              return-object
              autocomplete
              v-if="esUnico"
              dark )

            v-text-field(
              v-model="NombreDocumento"
              label="Buscar Cliente"
              append-icon="search"
              v-if="esCliente"
              :append-icon-cb="BuscarCliente")


            v-select( v-bind:items="ItemsCliente"
                      v-model="Cliente"
                      label="Cliente"
                      item-value="Id"
                      item-text="Nombre"
                      autocomplete
                      return-object
                      :hint="`${Cliente.TipoDocumento || ''}: ${Cliente.NumeroDocumento || ''}`"
                      persistent-hint
                      v-if="esCliente"
                      dark )

            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu1"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )

              v-text-field( slot="activator"
                            label="Fecha Inicial"
                            v-model="FechaInicial"
                            readonly )

              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="FechaInicial"
                             no-title
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="FechaInicial=null" ) Limpiar

            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu2"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )

              v-text-field( slot="activator"
                            label="Fecha Final"
                            v-model="FechaFinal"
                            readonly )

              v-date-picker( :months="months"
                             :days="days"
                             first-day-of-week="D"
                             :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
                             v-model="FechaFinal"
                             no-title
                             autosave
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel



      v-card-actions
        v-spacer
        v-btn( dark primary @click.native="generar" ) Generar

</template>

<script>

import gql from 'graphql-tag'
import ENTES from '~/queries/Entes.gql'
import ENVASES from '~/queries/Envases.gql'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    TipoKardex: null,
    Fecha: null,
    FechaInicial: null,
    FechaFinal: null,
    Numero: null,
    esUnico: false,
    esCliente: false,
    ItemsTipoKardex: [{text: 'Todos'}, {text: 'Único'}, {text: 'Por Cliente'}],

    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'],
    days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],

    ItemsCliente: [],
    Cliente: {
      Id: null,
      TipoDocumento: null,
      NumeroDocumento: null,
      Nombre: null,
      Ciudad: null,
      Direccion: null,
      Telefono: null
    },
    ItemsEnvase: [],
    Envase: {
      Id: null,
      Estado: null,
      Propietario: {Nombre: null, NumeroDocumento: null, Id: null},
      EnteId: null,
      Material: null,
      Producto: {Id: null, Nombre: null, UnidadDeMedida: null},
      Capacidad: null,
      Numero: null,
      NumeroInterno: null,
      Presion: null,
      AlturaConValvula: null,
      PesoConValvula: null,
      Valvula: null,
      TipoValvula: null,
      AcabadoColor: null,
      NormaTecnicaFabricacion: null,
      Proveedor: null,
      FechaCompra: null,
      Garantia: null,
      FechaFabricacion: null,
      PruebaHidrostatica: null,
      EquipoAlquilado: null,
      FechaAlquiler: null,
      Observaciones: null
    },
    NumeroEnvase: null,
    NombreDocumento: null,
    menu1: false,
    menu2: false,
    menu3: false,
    loading: 0
  }),
  beforeMount () {
    if ( sessionStorage.getItem('x-access-token') === null ) {
      this.$router.push('/')
    } else {
      var Roles = JSON.parse(sessionStorage.getItem('x-access-roles'))
      this.$store.commit('security/AddRoles', Roles);

      var AvailableRoles = ["Gerencia"];

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
  methods: {
    BuscarCliente () {
      this.ItemsCliente = [];
      if(null !== this.NombreDocumento && this.NombreDocumento.length >= 3){
        this.$apollo.query({
          query: ENTES,
          variables: {
            NombreDocumento: this.NombreDocumento
          },
          fetchPolicy: 'network-only',
          loadingKey: 'loading'
        }).then( res => {
          console.log(res.data);
          this.ItemsCliente = res.data.Entes;
        });
      }
    },
    BuscarEnvase () {
      this.ItemsEnvase = [];
      if(null !== this.NumeroEnvase && this.NumeroEnvase.length >= 2){
        this.$apollo.query({
          query: ENVASES,
          variables: {
            Numero: this.NumeroEnvase
          },
          fetchPolicy: 'network-only',
          loadingKey: 'loading'
        }).then (res => {
          console.log(res.data.Envases.length)
          this.ItemsEnvase = res.data.Envases
        });
      }
    },
    generar() {
      this.$store.commit('kardex/changeTipo', this.TipoKardex)
      this.$store.commit('kardex/changeFecha', this.Fecha)
      this.$store.commit('kardex/changeCliente', this.Cliente)
      this.$store.commit('kardex/changeEnvase', this.Envase)
      this.$store.commit('kardex/changeFechaInicial', this.FechaInicial)
      this.$store.commit('kardex/changeFechaFinal', this.FechaFinal)
      this.$router.push('/reporte/kardex')
    },
    ResetCliente () {
      this.Cliente = {
        Id: null,
        TipoDocumento: null,
        NumeroDocumento: null,
        Nombre: null,
        Ciudad: null,
        Direccion: null,
        Telefono: null
      }
    },
    ResetEnvase () {
      this.Envase = {
        Id: null,
        Estado: null,
        Propietario: {Nombre: null, NumeroDocumento: null, Id: null},
        EnteId: null,
        Material: null,
        Producto: {Id: null, Nombre: null, UnidadDeMedida: null},
        Capacidad: null,
        Numero: null,
        NumeroInterno: null,
        Presion: null,
        AlturaConValvula: null,
        PesoConValvula: null,
        Valvula: null,
        TipoValvula: null,
        AcabadoColor: null,
        NormaTecnicaFabricacion: null,
        Proveedor: null,
        FechaCompra: null,
        Garantia: null,
        FechaFabricacion: null,
        PruebaHidrostatica: null,
        EquipoAlquilado: null,
        FechaAlquiler: null,
        Observaciones: null
      }
    }
  },
  watch: {
    TipoKardex (value) {
      value === 'Único' ? this.esUnico = true : this.esUnico = false
      value === 'Por Cliente' ? this.esCliente = true : this.esCliente = false
    }
  }
};

</script>

<style lang="stylus" scoped>
  h5.bold
    font-weight bold

  .alert-especial
    position absolute
</style>
