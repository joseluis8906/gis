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
      :hint="`C.C ${Vendedor.NumeroDocumento || ''}`"
      persistent-hint
      autocomplete
      return-object
      :disabled="items.length > 0"
      dark )

    v-text-field(
      v-model="NumeroProduccionAndRecprodcom"
      label="Buscar Envase"
      append-icon="search"
      :append-icon-cb="BuscarProduccionAndRecprodcom")

    v-select(
      v-bind:items="ItemsProduccionAndRecprodcom"
      v-model="ProduccionAndRecprodcomActual"
      label="Envase"
      item-text="NumeroEnvase"
      item-value="Id"
      return-object
      autocomplete
      dark )

    v-btn(fab dark class="indigo mb-3" @click.native="Guardar" :disabled="!Autorizacion")
      v-icon(dark) add

    v-data-table(
      v-bind:headers="headers"
      v-bind:items="items"
      hide-actions
      class="elevation-5 grey lighten-1 grey--text text--darken-4" )

      template(slot="items" scope="props")
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.index + 1 }}
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ ImprimirEnvase(props.item) }}
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ ImprimirCantidad(props.item) }}
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ ImprimirProducto(props.item) }}
        td(style="border-left: 1px solid #999999" class="text-xs-center pl-1 pr-1")
          v-btn(
            fab
            dark
            small
            error
            style="width: 16px; height:16px"
            @click.native="Eliminar(props.item)"
            :disabled="props.item.EliminarDisable")

            v-icon remove
</template>

<style>
</style>

<script>
import CORRERIAS from '~/queries/Correrias.gql';
import CREATE_CORRERIA from '~/queries/CreateCorreria.gql';
import DELETE_CORRERIA from '~/queries/DeleteCorreria.gql';
import LAST_CORRERIA from '~/queries/LastCorreria.gql';
import ENTES from '~/queries/Entes.gql';
import PRODUCCIONSBYENVASE from '~/queries/ProduccionsByEnvase.gql';
import RECPRODCOMSBYENVASE from '~/queries/RecprodcomsByEnvase.gql';


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
      NumeroProduccionAndRecprodcom: null,
      ItemsVendedor: [],
      Vendedor: {},
      ItemsProduccionAndRecprodcom: [],
      ProduccionAndRecprodcomActual: {},
      headers: [
        { text: 'N°', align: 'center', sortable: false },
        { text: 'Envase', align: 'center', sortable: false,  value: 'Numero' },
        { text: 'Cantidad', align: 'center', sortable: false,  value: 'Cantidad' },
        { text: 'Producto', align: 'center', sortable: false,  value: 'Producto' },
        { text: 'Eliminar', align: 'center', sortable: false,  value: 'Eliminar' }
      ],
      Autorizacion: false,
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.LastCorreria();
    })
  },
  watch: {
    Fecha: {
      handler (value) {
        let hoy = new Date(Date.now()-(1000*60*60*5));
        let fecha = new Date(value+'T00:00:00');
        if(fecha > hoy){
          this.Fecha = hoy.toISOString().split('T')[0];
        }
      }
    },
    Vendedor: {
      handler (value) {
        this.NombreDocumento = null;
        this.AutorizacionGuardar();
      },
      deep: true,
    },
    ProduccionAndRecprodcomActual: {
      handler (value) {
        this.AutorizacionGuardar();
      },
      deep: true,
    }
  },
  apollo:{
    Correrias: {
      query: CORRERIAS,
      fetchPolicy: 'network-only',
      variables () {
        return {
          Numero: this.Numero,
        }
      },
      update (data) {
        this.ItemsVendedor = [];
        this.items = [];
        if (data.Correrias.length > 0) {
          this.Fecha = data.Correrias[0].Fecha;
          this.ItemsVendedor.push(data.Correrias[0].Ente);
          this.Vendedor = this.ItemsVendedor[0];


          for ( let i=0; i<data.Correrias.length; i++ ) {
            var tmp = {
              Id: data.Correrias[i].Id,
              Produccion: data.Correrias[i].Produccion,
              Recprodcom: data.Correrias[i].Recprodcom,
              EliminarDisable: data.Correrias[i].Produccion ? data.Correrias[i].Produccion.Despachado === 'Si' ? true : false  : data.Correrias[i].Recprodcom.Despachado === 'Si' ? true : false,
            }

            this.items.push(tmp);
          }

        } else {

          this.Reset ();

        }

      }
    },
  },
  methods: {
    FiltrarSeleccionados () {
      for(let i=0; i<this.items.length; i++){
        for(let j=0; j<this.ItemsProduccionAndRecprodcom.length; j++){
          if(this.items[i].Produccion && this.ItemsProduccionAndRecprodcom[j].Type==="Produccion"){
            if(this.items[i].Produccion.Id === this.ItemsProduccionAndRecprodcom[j].Id){
              this.ItemsProduccionAndRecprodcom.splice(j, 1);
            }
          }
          if(this.items[i].Recprodcom && this.ItemsProduccionAndRecprodcom[j].Type==="Recprodcom"){
            if(this.items[i].Recprodcom.Id === this.ItemsProduccionAndRecprodcom[j].Id){
              this.ItemsProduccionAndRecprodcom.splice(j, 1);
            }
          }
        }
      }
    },
    SetToday() {
      this.Fecha = new Date(Date.now()-(1000*60*60*5)).toISOString().split('T')[0];
    },
    ImprimirCantidad(item){
      let Produccion = item.Produccion;
      let Recprodcom = item.Recprodcom;

      if(null !== Produccion) return `${Produccion.Cantidad} ${Produccion.Producto.UnidadDeMedida}`;
      if(null !== Recprodcom) return `${Recprodcom.Cantidad} ${Recprodcom.Producto.UnidadDeMedida}`;
    },
    ImprimirProducto(item) {
      let Produccion = item.Produccion;
      let Recprodcom = item.Recprodcom;

      if(null !== Produccion) return Produccion.Producto.Nombre;
      if(null !== Recprodcom) return Recprodcom.Producto.Nombre;
    },
    ImprimirEnvase(item) {
      let Produccion = item.Produccion;
      let Recprodcom = item.Recprodcom;

      if(null !== Produccion) return Produccion.Envase.Numero;
      if(null !== Recprodcom) return Recprodcom.Envase.Numero;
    },
    VerificarConsecutivo (number) {
      let nextNumber = Number(number) + 1;
      if(nextNumber < 10){
        return '00' + nextNumber.toString();
      }
      else if(nextNumber < 100){
        return '0' + nextNumber.toString();
      }

      return nextNumber.toString();

    },
    LastCorreria () {
      this.$apollo.query({
        query: LAST_CORRERIA
      })
      .then(res => {
        res.data.LastCorreria !== null ? this.Numero = this.VerificarConsecutivo(res.data.LastCorreria.Numero) : this.Numero = '001';
      });
    },
    AutorizacionGuardar(){
      let requisito1 = this.Vendedor;
      let requisito2 = this.ProduccionAndRecprodcomActual;

      if(
        requisito1.hasOwnProperty("Id") &&
        requisito2.hasOwnProperty("Id")
      ){
        this.Autorizacion = true;
        return true;
      }

      this.Autorizacion = false;
      return false;
    },
    BuscarVendedor () {
      this.ItemsVendedor = [];
      if(null !== this.NombreDocumento && this.NombreDocumento.length >= 3){

        this.$apollo.query({
          query: ENTES,
          variables: {
            NombreDocumento: this.NombreDocumento,
            Relacion: 'Vendedor',
          },
          fetchPolicy: 'network-only',
        }).then( res => {
          console.log(res.data.Entes.length);
          this.ItemsVendedor = res.data.Entes;
        });

      }
    },
    BuscarProduccionAndRecprodcom () {
      this.ProduccionAndRecprodcomActual = {};
      this.ItemsProduccionAndRecprodcom = [];

      if(null !== this.NumeroProduccionAndRecprodcom && this.NumeroProduccionAndRecprodcom.length >= 2 && this.Fecha !== null && this.Fecha !== ''){
        //Produccions
        this.$apollo.query({
          query: PRODUCCIONSBYENVASE,
          variables: {
            NumeroEnvase: this.NumeroProduccionAndRecprodcom,
            FechaFabricacion: this.Fecha
          },
          fetchPolicy: 'network-only',
          loadingKey: 'loading'
        }).then( res => {
          console.log(res.data.ProduccionsByEnvase.length);
          let Produccions = res.data.ProduccionsByEnvase;

          for ( let i=0; i<Produccions.length; i++ ) {
            var tmp = {
              Type: 'Produccion',
              Buscar: Produccions[i].Envase.Numero,
              Id: Produccions[i].Id,
              Cantidad: Produccions[i].Cantidad,
              FechaFabricacion: Produccions[i].FechaFabricacion,
              FechaVencimiento: Produccions[i].FechaVencimiento,
              Lote: Produccions[i].Lote,
              NumeroEnvase: Produccions[i].Envase.Numero,
              Envase: Produccions[i].Envase,
              Producto: Produccions[i].Producto,
              Despachado: Produccions[i].Despachado
            }
            tmp.Despachado === 'No' ? this.ItemsProduccionAndRecprodcom.push(tmp) : null
          }

          this.FiltrarSeleccionados();

        });

        //Recprodcoms
        this.$apollo.query({
          query: RECPRODCOMSBYENVASE,
          variables: {
            NumeroEnvase: this.NumeroProduccionAndRecprodcom,
            FechaFabricacion: this.Fecha
          },
          fetchPolicy: 'network-only'
        }).then( res => {
          console.log(res.data.RecprodcomsByEnvase.length);
          let Recprodcoms = res.data.RecprodcomsByEnvase;

          for ( let i=0; i<Recprodcoms.length; i++ ) {
            var tmp = {
              Type: 'Recprodcom',
              Buscar: Recprodcoms[i].Envase.Numero,
              Id: Recprodcoms[i].Id,
              Cantidad: Recprodcoms[i].Cantidad,
              FechaFabricacion: Recprodcoms[i].FechaFabricacion,
              FechaVencimiento: Recprodcoms[i].FechaVencimiento,
              Lote: Recprodcoms[i].Lote,
              NumeroEnvase: Recprodcoms[i].Envase.Numero,
              Envase: Recprodcoms[i].Envase,
              Producto: Recprodcoms[i].Producto,
              Despachado: Recprodcoms[i].Despachado
            }
            tmp.Despachado === 'No' ? this.ItemsProduccionAndRecprodcom.push(tmp) : null
          }

          this.FiltrarSeleccionados();

        });
      }
    },
    Guardar () {

      this.$apollo.mutate ({
        mutation: CREATE_CORRERIA,
        variables: {
          Numero: this.Numero,
          Fecha: this.Fecha,
          EnteId: this.Vendedor.Id,
          ProduccionId: this.ProduccionAndRecprodcomActual.Type === 'Produccion' ? this.ProduccionAndRecprodcomActual.Id : null,
          RecprodcomId: this.ProduccionAndRecprodcomActual.Type === 'Recprodcom' ? this.ProduccionAndRecprodcomActual.Id : null,
        },
        update: (store, { data: res }) => {
          var tmp = res.CreateCorreria;
          this.items.push(tmp)
        }
      });

    },
    Eliminar(item){

      this.$apollo.mutate ({
        mutation: DELETE_CORRERIA,
        variables: {
          Id: item.Id,
        },
        update: (store, { data: res }) => {
          console.log(res.DeleteCorreria);
          this.items = this.items.filter(c => c.Id !== item.Id);
        }
      });

      this.ProduccionAndRecprodcomActual = {};
      this.ItemsProduccionAndRecprodcom = [];
    },
    Reset () {
      this.SetToday();

      this.Vendedor = {};
      this.ItemsVendedor = [];

      this.ProduccionAndRecprodcomActual = {};
      this.ItemsProduccionAndRecprodcom = [];

      this.items = [];
    }
  }
}
</script>
