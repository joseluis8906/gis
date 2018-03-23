<<template lang="pug">
v-layout( row wrap )
  v-flex( xs12 )
    v-text-field(
      label="Número"
      v-model="Numero"
      append-icon="cached"
      :append-icon-cb="LastCorreria"
      dark )

    v-menu(
      lazy
      :close-on-content-click="true"
      v-model="MenuFecha"
      transition="scale-transition"
      offset-y
      full-width
      :nudge-left="40"
      max-width="290px"
      :disabled="items.length > 0" )

      v-text-field(
        slot="activator"
        label="Fecha"
        v-model="Fecha"
        :disabled="items.length > 0"
        readonly )

      v-date-picker(
        :months="months"
        :days="days"
        first-day-of-week="D"
        :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
        v-model="Fecha"
        no-title
        dark )

        template( scope="{ save, cancel }" )
          v-card-actions
            v-btn( dark warning @click.native="Fecha=null" ) Limpiar

    v-text-field(
      v-model="NombreDocumento"
      label="Buscar Vendedor"
      append-icon="search"
      :append-icon-cb="BuscarVendedor"
      :disabled="items.length > 0" )

    v-select(
      v-bind:items="ItemsVendedor"
      v-model="Vendedor"
      label="Vendedor"
      item-text="Nombre"
      autocomplete
      return-object
      :disabled="items.length > 0"
      dark )

    v-text-field(
      v-model="NumeroEnvase"
      label="Buscar Envase"
      append-icon="search"
      :append-icon-cb="BuscarEnvase")

    v-select(
      v-bind:items="ItemsEnvase"
      v-model="EnvaseActual"
      label="Envase"
      item-text="Numero"
      item-value="Id"
      return-object
      autocomplete
      dark )

    v-btn(fab dark class="indigo mb-3" @click.native="Agregar" :disabled="!Autorizacion")
      v-icon(dark) add

    v-data-table(
      v-bind:headers="headers"
      v-bind:items="items"
      hide-actions
      class="elevation-5 grey lighten-1 grey--text text--darken-4" )

      template(slot="items" scope="props")
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.index + 1 }}
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.item.Envase.Numero }}
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ Producto.UnidadDeMedida }}
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.item.Cantidad }}
        td( style="border-left: 1px solid #999999" class="pt-0 pb-0") {{ props.item.Envase.Cliente.Nombre }}
        td(style="border-left: 1px solid #999999" class="text-xs-center pl-1 pr-1")
          v-btn(
            fab
            dark
            small
            error
            style="width: 16px; height:16px"
            @click.native="eliminar(props.item)"
            :disabled="props.item.EliminarDisable")

            v-icon remove
</template>

<style>
</style>

<script>
import CORRERIAS from '~/queries/Correrias.gql';
import CREATE_CORRERIA from '~/queries/CreateCorreria.gql';

export default {
  data(){
    return {
      Numero: null,
      Fecha: null,
      MenuFecha: null,
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
      items: [],
      NombreDocumento: null,
      ItemsVendedor: [],
      Vendedor: null,
      NumeroEnvase: null,
      ItemsEnvase: [],
      EnvaseActual: null,
      headers: [
        { text: 'N°', align: 'center', sortable: false },
        { text: 'Envase', align: 'center', sortable: false,  value: 'Numero' },
        { text: 'Cantidad', align: 'center', sortable: false,  value: 'Cantidad' },
        { text: 'U. de Medida', align: 'center', sortable: false,  value: 'U. de Medida' },
        { text: 'Producto', align: 'center', sortable: false,  value: 'Producto' },
        { text: 'Eliminar', align: 'center', sortable: false,  value: 'Eliminar' }
      ],
      Autorizacion: false,
    }
  },
  methods: {
    LastCorreria () {
      console.log("last correria");
    },
    BuscarVendedor () {
      console.log("buscar vendedor");
    },
    BuscarEnvase () {
      console.log("buscar envase")
    },
    Agregar () {

    }
  }
}
</script>
