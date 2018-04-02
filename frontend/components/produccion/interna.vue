<template lang="pug">
v-layout( row wrap )
  v-flex( xs12 )
    v-text-field(
      label="Orden Nº"
      v-model="Orden"
      append-icon="cached"
      :append-icon-cb="LastProduccion"
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
      label="Turno"
      v-model="Turno"
      :disabled="items.length > 0"
      dark )

    v-menu(
      lazy
      :close-on-content-click="true"
      v-model="menu1"
      transition="scale-transition"
      offset-y
      full-width
      :nudge-left="40"
      max-width="290px"
      :disabled="items.length > 0" )

      v-text-field(
        slot="activator"
        label="Fecha Inicial"
        v-model="FechaInicial"
        :disabled="items.length > 0"
        readonly )

      v-date-picker(
        :months="months"
        :days="days"
        first-day-of-week="D"
        :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
        v-model="FechaInicial"
        no-title
        dark )

        template( scope="{ save, cancel }" )
          v-card-actions
            v-btn( dark warning @click.native="Fecha=null" ) Limpiar

    v-menu(
      lazy
      :close-on-content-click="true"
      v-model="menu2"
      transition="scale-transition"
      offset-y
      full-width
      :nudge-left="40"
      max-width="290px"
      :disabled="items.length > 0" )

      v-text-field(
        slot="activator"
        label="Fecha Final"
        v-model="FechaFinal"
        :disabled="items.length > 0"
        readonly )

      v-date-picker(
        :months="months"
        :days="days"
        first-day-of-week="D"
        :header-date-format="({ monthName, year }) => { return `${monthName} ${year}` }"
        v-model="FechaFinal"
        no-title
        dark )

        template( scope="{ save, cancel }" )
          v-card-actions
            v-btn( dark warning @click.native="Fecha=null" ) Limpiar

    v-layout(row wrap)
      v-flex(xs12)
        v-menu(
          lazy
          :close-on-content-click="false"
          v-model="menu3"
          transition="scale-transition"
          offset-y
          :nudge-left="40"
          :disabled="items.length > 0" )

          v-text-field(
            slot="activator"
            label="Hora Inicial"
            v-model="HoraInicial"
            :disabled="items.length > 0"
            readonly )

          v-time-picker(v-model="HoraInicial" autosave)

      v-flex(xs12)
        v-menu(
          lazy
          :close-on-content-click="false"
          v-model="menu4"
          transition="scale-transition"
          offset-y
          :nudge-left="40"
          :disabled="items.length > 0" )

          v-text-field(
            slot="activator"
            label="Hora Final"
            v-model="HoraFinal"
            :disabled="items.length > 0"
            readonly )

          v-time-picker(v-model="HoraFinal" autosave)


    v-select(
      v-bind:items="ItemsProducto"
      v-model="Producto"
      label="Producto"
      item-text="Nombre"
      item-value="Id"
      return-object
      autocomplete
      :disabled="items.length > 0"
      class="mb-5"
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
        //-td(style="border-left: 1px solid #999999" class="text-xs-center pl-1 pr-1")
          v-btn(
            fab
            dark
            small
            error
            style="width: 16px; height:16px"
            @click.native="eliminar(props.item)"
            :disabled="props.item.EliminarDisable")

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

    v-btn(fab dark class="indigo mt-1" @click.native="agregar" :disabled="!Autorizacion || Cerrado")
      v-icon(dark) add

    v-card-actions
      v-spacer
      v-btn( dark warning @click.native="hardReset" ) Limpiar
      v-btn( dark primary @click.native="generar" class="mt-0" ) Imprimir

</template>

<style>
</style>

<script>
  import ENVASESBYPRODUCTO from '~/queries/EnvasesByProducto.gql';
  import ONE_ENVASE from '~/queries/OneEnvase.gql';
  import UPDATE_ENVASE from '~/queries/UpdateEnvase.gql';
  import PRODUCCIONS from '~/queries/Produccions.gql';
  import CREATE_PRODUCCION from '~/queries/CreateProduccion.gql';
  import UPDATE_ONE_PRODUCCION from '~/queries/UpdateOneProduccion.gql';
  import DELETE_PRODUCCION from '~/queries/DeleteProduccion.gql';
  import PRODUCTOS from '~/queries/Productos.gql';
  import ENTES from '~/queries/Entes.gql';
  import LAST_PRODUCCION from '~/queries/LastProduccion.gql';
  import LAST_LOTE from '~/queries/LastLote.gql';

  export default {
    data () {
      return {
        Orden: null,
        Turno: null,
        Fecha: null,
        Lote: null,
        FechaInicial: null,
        FechaFinal: null,
        HoraInicial: null,
        HoraFinal: null,
        FechaFabricacion: null,
        FechaVencimiento: null,
        Producto: {},
        PurezaFinal: null,
        PresionFinal: null,
        Observacion: null,
        saveUpdate: 'save',
        ChangeProducto: true,
        ChangeProductoCounter: 0,
        headers: [
          { text: 'N°', align: 'center', sortable: false,  value: '' },
          { text: 'Envase', align: 'center', sortable: false,  value: 'Numero' },
          //{ text: 'U. de Medida', align: 'center', sortable: false,  value: 'U. de Medida' },
          { text: 'Cantidad', align: 'center', sortable: false,  value: 'Cantidad' },
          { text: 'Cliente', align: 'center', sortable: false,  value: 'Cliente' },
          //{ text: 'Eliminar', align: 'center', sortable: false,  value: 'Eliminar' }
          { text: 'Despachado', align: 'center', sortable: false,  value: 'Despachado' }
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
          'Diciembre'],
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
        loading: 0,
      }
    },
    apollo: {
      Produccions: {
        query: PRODUCCIONS,
        fetchPolicy: 'network-only',
        variables () {
          return {
            Orden: this.Orden,
          }
        },
        update (data) {
          this.items = [];
          if (data.Produccions.length > 0) {
            this.Autorizacion=true;
            this.Turno = data.Produccions[0].Turno
            this.Fecha = data.Produccions[0].Fecha
            this.Lote = data.Produccions[0].Lote
            this.FechaInicial = data.Produccions[0].FechaInicial
            this.FechaFinal = data.Produccions[0].FechaFinal
            this.HoraInicial = data.Produccions[0].HoraInicial
            this.HoraFinal = data.Produccions[0].HoraFinal
            this.FechaFabricacion = data.Produccions[0].FechaFabricacion
            this.FechaVencimiento = data.Produccions[0].FechaVencimiento
            this.Producto = data.Produccions[0].Producto
            this.PurezaFinal = data.Produccions[0].PurezaFinal
            this.PresionFinal = data.Produccions[0].PresionFinal
            this.Observacion = data.Produccions[0].Observacion

            for ( let i=0; i<data.Produccions.length; i++ ) {
              var tmp = {
                Id: data.Produccions[i].Id,
                Envase: data.Produccions[i].Envase,
                Cantidad: data.Produccions[i].Cantidad,
                SaveUpdate: 'update',
                EliminarDisable: data.Produccions[i].Despachado === 'Si' ? true : false,
                Despachado: data.Produccions[i].Despachado
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
        this.LastProduccion();
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
      FechaInicial (value) {
        let hoy = new Date(Date.now()-(1000*60*60*5));
        let fecha = new Date(value+'T00:00:00');
        if(fecha > hoy){
          this.FechaInicial = hoy.toISOString().split('T')[0];
        }
      },
      FechaFinal (value) {
        let hoy = new Date(Date.now()-(1000*60*60*5));
        let fecha = new Date(value+'T00:00:00');
        if(fecha > hoy){
          this.FechaFinal = hoy.toISOString().split('T')[0];
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
      SetToday() {
        this.Fecha = new Date(Date.now()-(1000*60*60*5)).toISOString().split('T')[0];
      },
      SetLote() {
        if(this.items.length === 0){
          this.$apollo.query({
            query: LAST_LOTE,
            fetchPolicy: 'network-only',
            variables: {
              Fecha: this.Fecha
            }
          })
          .then(res => {
            this.Lote = res.data.LastLote ?
              res.data.LastLote.Lote.substr(0,4)+this.VerificarConsecutivo(res.data.LastLote.Lote.substr(5,3)) :
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
      LastProduccion () {
        this.$apollo.query({
          query: LAST_PRODUCCION,
          fetchPolicy: 'network-only',
        })
        .then(res => {
          res.data.LastProduccion !== null ? this.Orden = this.VerificarConsecutivo(res.data.LastProduccion.Orden) : this.Orden = '001';
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
          loadingKey: 'loading'
        }).then(() => {
          this.BuscarEnvase();
        })
      },
      Guardar () {

        if (!this.AutorizacionGuardar()) return;

          this.$apollo.mutate ({
            mutation: CREATE_PRODUCCION,
            variables: {
              Orden: this.Orden,
              Turno: this.Turno,
              Fecha: this.Fecha,
              Lote: this.Lote,
              FechaInicial: this.FechaInicial,
              FechaFinal: this.FechaFinal,
              HoraInicial: this.HoraInicial,
              HoraFinal: this.HoraFinal,
              FechaFabricacion: this.FechaFabricacion,
              FechaVencimiento: this.FechaVencimiento,
              Cantidad: this.EnvaseActual.Capacidad,
              ProductoId: this.Producto.Id,
              EnvaseId: this.EnvaseActual.Id,
              PurezaFinal: this.PurezaFinal,
              PresionFinal: this.PresionFinal,
              Observacion: this.Observacion,
              Despachado: 'No'
            },
            loadingKey: 'loading'
          }).then(res => {
            let data = res.data;
            var tmp = {
              Id: data.CreateProduccion[i].Id,
              Envase: data.CreateProduccion[i].Envase,
              Cantidad: data.CreateProduccion[i].Cantidad,
              EliminarDisable: data.CreateProduccion[i].Despachado === 'Si' ? true : false,
              Despachado: data.CreateProduccion[i].Despachado
            }
            this.items.push(tmp);
          });
      },
      eliminar (item) {

        for (let i=0; i<this.items.length; i++) {
          if ( item.Id === this.items[i].Id ) {
            this.items.splice(i, 1);
          }
        }

        this.$apollo.mutate ({
          mutation: DELETE_PRODUCCION,
          variables: {
            Id: item.Id,
          }
         }).then(() => {
           //Eliminado
         });

      },
      reset () {

        this.ChangeProducto = true
        this.Fecha = null
        this.Turno = null
        this.Lote = null
        this.FechaInicial = null
        this.FechaFinal = null
        this.HoraInicial = null
        this.HoraFinal = null
        this.FechaFabricacion = null
        this.FechaVencimiento = null
        this.Producto = {Id: null, Nombre: null}
        this.PurezaFinal = null
        this.PresionFinal = null
        this.Observacion = null

        this.ItemsEnvase = []
        this.items = []
        this.ChangeProductoCounter=0

        this.SetToday();
      },
      hardReset () {
        this.Orden = null
        this.reset ()
      },
      changeProductoCounter (){
        this.ChangeProductoCounter++
        if( this.ChangeProductoCounter === 2 ) {
          this.ChangeProducto=false
        }
      },
      generar() {
        this.$store.commit('produccion/changeOrden', this.Orden)
        this.$router.push('/reporte/produccion')
      }
    },
  }
</script>
