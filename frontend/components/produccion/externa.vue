<template lang="pug">
v-layout( row wrap )
  v-flex( xs12 )
    v-text-field(
      label="Numero"
      v-model="Numero"
      append-icon="cached"
      :append-icon-cb="LastRecprodcom"
      dark )

    v-menu(
      lazy
      :close-on-content-click="true"
      v-model="menu5"
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
      label="Lote"
      v-model="Lote"
      append-icon="cached"
      :append-icon-cb="SetLote"
      :disabled="items.length > 0"
      dark )

    v-text-field(
      v-model="NombreDocumento"
      label="Buscar Proveedor"
      append-icon="search"
      :append-icon-cb="BuscarProveedor"
      :disabled="items.length > 0" )

    v-select(
      v-bind:items="ItemsProveedor"
      v-model="Proveedor"
      label="Proveedor"
      item-value="Id"
      item-text="Nombre"
      autocomplete
      return-object
      :hint="`${Proveedor.TipoDocumento || ''}: ${Proveedor.NumeroDocumento || ''}`"
      persistent-hint
      :disabled="items.length > 0"
      dark )

    v-select(
      v-bind:items="ItemsProducto"
      v-model="Producto"
      label="Producto"
      item-text="Nombre"
      item-value="Id"
      return-object
      autocomplete
      :disabled="items.length > 0"
      dark )

    v-menu(
      lazy
      :close-on-content-click="true"
      v-model="menu6"
      transition="scale-transition"
      offset-y
      full-width
      :nudge-left="40"
      max-width="290px"
      :disabled="items.length > 0" )

      v-text-field(
        slot="activator"
        label="Fecha de Fabricacion"
        v-model="FechaFabricacion"
        :disabled="items.length > 0"
        readonly )

      v-date-picker(
        :months="months"
        :days="days"
        first-day-of-week="D"
        :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
        v-model="FechaFabricacion"
        no-title
        autosave
        dark )

        template( scope="{ save, cancel }" )
          v-card-actions
            v-btn( dark warning @click.native="FechaFabricacion=null" ) Limpiar

    v-menu(
      lazy
      :close-on-content-click="true"
      v-model="menu7"
      transition="scale-transition"
      offset-y
      full-width
      :nudge-left="40"
      max-width="290px"
      :disabled="items.length > 0" )

      v-text-field(
        slot="activator"
        label="Fecha de Vencimiento"
        v-model="FechaVencimiento"
        :disabled="items.length > 0"
        readonly )

      v-date-picker(
        :months="months"
        :days="days"
        first-day-of-week="D"
        :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
        v-model="FechaVencimiento"
        no-title
        autosave
        dark )

        template( scope="{ save, cancel }" )
          v-card-actions
            v-btn( dark warning @click.native="FechaVencimiento=null" ) Limpiar

    v-text-field( label="Pureza Final (%)" v-model="PurezaFinal" :disabled="items.length > 0" dark )

    v-text-field( label="Presion Final (psi)" v-model="PresionFinal" :disabled="items.length > 0" dark )

    //- v-text-field( label="Certificado" v-model="Certificado" :disabled="items.length > 0" dark )

    v-text-field( label="RegistroSanitario" v-model="RegistroSanitario" :disabled="items.length > 0" dark )

    //- v-text-field( label="Otros" v-model="Otros" multi-line :disabled="items.length > 0" dark )

    v-text-field( label="Observacion" v-model="Observacion" multi-line :disabled="items.length > 0" dark )

    v-data-table(
      v-bind:headers="headers"
      v-bind:items="items"
      hide-actions
      class="elevation-5 grey lighten-1 grey--text text--darken-4" )

      template(slot="items" scope="props")
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.index+1 }}
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.item.Envase.Numero }}
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.item.Cantidad }} {{ Producto.UnidadDeMedida }}
        td( style="border-left: 1px solid #999999" class="pt-0 pb-0") {{ props.item.Envase.Propietario.Nombre }}
        td( style="border-left: 1px solid #999999" class="pt-0 pb-0") {{ props.item.Despachado }}
        td(style="border-left: 1px solid #999999" class="text-xs-center pl-1 pr-1")
          v-btn(
            fab
            dark
            small
            error
            style="width: 16px; height:16px"
            @click.native="eliminar(props.item)"
            :disabled="props.item.Despachado === 'Si' || Cerrado")

            v-icon remove


    v-layout(row wrap mt-3)
      v-flex(xs12)
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

    v-btn(fab dark class="indigo mt-1" @click.native="Guardar" :disabled="!Autorizacion || Cerrado")
      v-icon(dark) add

    v-card-actions
      v-spacer
      v-btn( dark warning @click.native="Limpiar" ) Limpiar
      v-btn( dark primary @click.native="generar" class="mt-0" ) Imprimir

</template>

<style>
</style>

<script>
  import ENVASESBYPRODUCTO from '~/queries/EnvasesByProducto.gql';
  import ONE_ENVASE from '~/queries/OneEnvase.gql';
  import UPDATE_ENVASE from '~/queries/UpdateEnvase.gql';
  import RECPRODCOMS from '~/queries/Recprodcoms.gql';
  import CREATE_RECPRODCOM from '~/queries/CreateRecprodcom.gql';
  import UPDATE_ONE_RECPRODCOM from '~/queries/UpdateOneRecprodcom.gql';
  import DELETE_RECPRODCOM from '~/queries/DeleteRecprodcom.gql';
  import PRODUCTOS from '~/queries/Productos.gql';
  import ENTES from '~/queries/Entes.gql';
  import LAST_RECPRODCOM from '~/queries/LastRecprodcom.gql';
  import LAST_LOTE_RECPRODCOM from '~/queries/LastLoteRecprodcom.gql';

  export default {
    data () {
      return {
        Numero: null,
        Fecha: null,
        Lote: null,
        FechaFabricacion: null,
        FechaVencimiento: null,
        Producto: {},
        PurezaFinal: null,
        PresionFinal: null,
        Certificado: null,
        RegistroSanitario: null,
        Otros: null,
        Observacion: null,
        NombreDocumento: null,
        ItemsProveedor: [],
        Proveedor: {},
        ChangeProducto: true,
        ChangeProductoCounter: 0,
        headers: [
          { text: 'N°', align: 'center', sortable: false,  value: '' },
          { text: 'Envase', align: 'center', sortable: false,  value: 'Numero' },
          //{ text: 'U. de Medida', align: 'center', sortable: false,  value: 'U. de Medida' },
          { text: 'Cantidad', align: 'center', sortable: false,  value: 'Cantidad' },
          { text: 'Cliente', align: 'center', sortable: false,  value: 'Cliente' },
          { text: 'Despachado', align: 'center', sortable: false,  value: 'Despachado' },
          { text: 'Eliminar', align: 'center', sortable: false,  value: 'Eliminar' }
        ],
        items: [],
        pagination: {
          sortBy: 'Numero'
        },
        ItemsProducto: [],
        ItemsEnvase: [],
        EnvaseActual: {},
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
          'Diciembre'
        ],
        days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        NumeroEnvase: null,
        menu1: false,
        menu2: false,
        menu3: false,
        menu4: false,
        menu5: false,
        menu6: false,
        menu7: false,
        Autorizacion: false,
        Cerrado: false,
      }
    },
    apollo: {
      Recprodcoms: {
        query: RECPRODCOMS,
        fetchPolicy: 'network-only',
        variables () {
          return {
            Numero: this.Numero,
          }
        },
        update (data) {
          this.ItemsProveedor = [];
          this.Proveedor = {}

          this.items = [];
          if (data.Recprodcoms.length > 0) {
            this.Fecha = data.Recprodcoms[0].Fecha
            this.Lote = data.Recprodcoms[0].Lote
            this.FechaFabricacion = data.Recprodcoms[0].FechaFabricacion
            this.FechaVencimiento = data.Recprodcoms[0].FechaVencimiento
            this.ItemsProveedor.push(data.Recprodcoms[0].Proveedor)
            this.Proveedor = data.Recprodcoms[0].Proveedor
            this.Producto = data.Recprodcoms[0].Producto
            this.PurezaFinal = data.Recprodcoms[0].PurezaFinal
            this.PresionFinal = data.Recprodcoms[0].PresionFinal
            this.Certificado = data.Recprodcoms[0].Certificado
            this.RegistroSanitario = data.Recprodcoms[0].RegistroSanitario
            this.Otros = data.Recprodcoms[0].Otros
            this.Observacion = data.Recprodcoms[0].Observacion
            this.items = []
            for ( let i=0; i<data.Recprodcoms.length; i++ ) {
              var tmp = {
                Id: data.Recprodcoms[i].Id,
                Envase: data.Recprodcoms[i].Envase,
                Cantidad: data.Recprodcoms[i].Cantidad,
                Despachado: data.Recprodcoms[i].Despachado
              }
              this.items.push(tmp)

              if(!this.Cerrado && tmp.Despachado === 'Si') this.Cerrado=true;
            }

          } else {
            this.reset ()
          }

        }
      },
      Productos: {
        query: PRODUCTOS,
        fetchPolicy: 'network-only',
        update (data) {
          this.ItemsProducto = [];
          this.ItemsProducto = data.Productos;
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.LastRecprodcom();
      })
    },
    watch: {
      Producto: {
        handler: function () {
          this.changeProductoCounter ();
          this.AutorizacionGuardar();
        },
        deep: true
      },
      EnvaseActual: {
        handler (value) {
          this.AutorizacionGuardar();
        },
        deep: true
      },
      Fecha (value) {
        let hoy = new Date(Date.now()-(1000*60*60*5));
        let fecha = new Date(value+'T00:00:00');
        if(fecha > hoy){
          this.Fecha = hoy.toISOString().split('T')[0];
        }
      },
      FechaFabricacion (value) {
        let hoy = new Date(Date.now()-(1000*60*60*5));
        let fecha = new Date(value+'T00:00:00');
        if(fecha > hoy){
          this.FechaFabricacion = hoy.toISOString().split('T')[0];
        }
      }
    },
    methods: {
      AutorizacionGuardar(){
        let requisito1 = this.Producto;
        let requisito2 = this.EnvaseActual;

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
      BuscarProveedor () {
        this.ItemsProveedor = [];
        if(null !== this.NombreDocumento && this.NombreDocumento.length >= 3){
          this.$apollo.query({
            query: ENTES,
            fetchPolicy: 'network-only',
            variables: {
              NombreDocumento: this.NombreDocumento,
              Relacion: 'Proveedor'
            },
          }).then( res => {
            //console.log(res.data.Entes.length);
            this.ItemsProveedor = res.data.Entes;

          });
        }
      },
      SetToday() {
        this.Fecha = new Date(Date.now()-(1000*60*60*5)).toISOString().split('T')[0];
      },
      SetLote() {
        if(this.items.length === 0){
          this.$apollo.query({
            query: LAST_LOTE_RECPRODCOM,
            fetchPolicy: 'network-only',
            variables: {
              Fecha: this.Fecha
            }
          })
          .then(res => {
            this.Lote = res.data.LastLoteRecprodcom ?
              res.data.LastLoteRecprodcom.Lote.substr(0,4)+this.VerificarConsecutivo(res.data.LastLoteRecprodcom.Lote.substr(5,3)) :
              `${this.Fecha.substr(8,2)}${this.Fecha.substr(2,2)}001`;
          });
        }
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
      LastRecprodcom () {
        this.$apollo.query({
          query: LAST_RECPRODCOM,
          fetchPolicy: 'network-only',
        })
        .then(res => {
          res.data.LastRecprodcom !== null ? this.Numero = this.VerificarConsecutivo(res.data.LastRecprodcom.Numero) : this.Numero = '001';
        });
      },
      BuscarEnvase () {
        this.ItemsEnvase = []
        if(
          null !== this.NumeroEnvase
          &&
          this.NumeroEnvase.length >= 2
          &&
          null !== this.Producto.Nombre
        ){
          this.$apollo.query({
            query: ENVASESBYPRODUCTO,
            fetchPolicy: 'network-only',
            variables: {
              Numero: this.NumeroEnvase,
              NombreProducto: this.Producto.Nombre
            },
          }).then( res => {
            //console.log(res.data);
            let Envases = res.data.EnvasesByProducto
            for (let i=0; i<Envases.length; i++) {
              var tmp = {}
              tmp.Id = Envases[i].Id;
              tmp.Numero = Envases[i].Numero;
              tmp.Capacidad = Envases[i].Capacidad;
              tmp.UnidadDeMedida = Envases[i].Producto.UnidadDeMedida;
              tmp.ProductoId = Envases[i].Producto.Id;
              tmp.Disponible = Envases[i].Disponible;
              tmp.Cliente = Envases[i].Propietario;
              this.ItemsEnvase.push(tmp);
            }
          });
        }
      },
      UpdateEnvase (_Envase, Value) {
        const Envase = {
          Numero: _Envase.Numero,
          Disponible: Value
        };

        this.$apollo.mutate ({
          mutation: UPDATE_ENVASE,
          variables: {
            Numero: Envase.Numero,
            Disponible: Envase.Disponible
          },
        }).then(() => {
          this.BuscarEnvase();
        })
      },
      Guardar () {
        //console.log(item)
        if (!this.AutorizacionGuardar()) return;

          this.$apollo.mutate ({
            mutation: CREATE_RECPRODCOM,
            variables: {
              Numero: this.Numero,
              Fecha: this.Fecha,
              Lote: this.Lote,
              FechaFabricacion: this.FechaFabricacion,
              FechaVencimiento: this.FechaVencimiento,
              Cantidad: item.Cantidad,
              ProductoId: this.Producto.Id,
              EnteId: this.Proveedor.Id,
              EnvaseId: item.Envase.Id,
              PurezaFinal: this.PurezaFinal,
              PresionFinal: this.PresionFinal,
              Certificado: this.Certificado,
              RegistroSanitario: this.RegistroSanitario,
              Otros: this.Otros,
              Observacion: this.Observacion,
              Despachado: 'No'
            },
          }).then(() => {
            let data = res.data;
            var tmp = {
              Id: data.CreateRecprodcom[i].Id,
              Envase: data.CreateRecprodcom[i].Envase,
              Cantidad: data.CreateRecprodcom[i].Cantidad,
              EliminarDisable: data.CreateRecprodcom[i].Despachado === 'Si' ? true : false,
              Despachado: data.CreateRecprodcom[i].Despachado
            }
            this.items.push(tmp);

            this.ItemsEnvase = [];
            this.EnvaseActual = {};
          });
      },
      eliminar (item) {

        for (let i=0; i<this.items.length; i++) {
          if ( item.Id === this.items[i].Id ) {
            this.items.splice(i, 1)
          }
        }

        this.$apollo.mutate ({
          mutation: DELETE_RECPRODCOM,
          variables: {
            Id: Recprodcom.Id
          },
         }).then(() => {
           //eliminado
         });

      },
      reset () {

        this.ChangeProducto = true
        this.Fecha = null
        this.Lote = null
        this.FechaFabricacion = null
        this.FechaVencimiento = null
        this.Producto = {}
        this.Proveedor = {}
        this.EnvaseActual = {}
        this.PurezaFinal = null
        this.PresionFinal = null
        this.Certificado = null
        this.RegistroSanitario = null
        this.Otros = null
        this.Observacion = null
        this.NumeroEnvase = null
        this.Cerrado = false

        this.ItemsEnvase = []
        this.ItemsProveedor = []
        this.items = []
        this.ChangeProductoCounter=0

        this.SetToday();
      },
      Limpiar () {
        this.LastRecprodcom();
      },
      changeProductoCounter (){
        this.ChangeProductoCounter++
        if( this.ChangeProductoCounter === 2 ) {
          this.ChangeProducto=false
        }
      },
      generar() {
        this.$store.commit('recprodcom/changeNumero', this.Numero)
        this.$router.push('/reporte/recprodcom')
      }
    },
  }
</script>
