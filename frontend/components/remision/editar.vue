<template lang="pug">
v-layout( row wrap )
  v-flex( xs12 )
    v-text-field(
      label="Número"
      v-model="Numero"
      @keyup.native.enter="AutoLLenar"
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
        autosave
        dark )

        template( scope="{ save, cancel }" )
          v-card-actions
            v-btn( dark warning @click.native="Fecha=null" ) Limpiar

    div( style="border: 1px solid #555555; border-radius: 5px; padding: 12px;"
         class="mb-4"  )
      v-layout(row wrap)
        v-flex(xs12)
          v-select(
            v-model="TipoEnte"
            :items="OptionsTipoEnte"
            label="Tipo de Ente"
            @click.native="ResetTipoEnte"
            :disabled="items.length > 0 || this.EsSoloVendedor"
          )

        v-flex(xs12)
          v-text-field(
            v-model="NombreDocumento"
            :label="`Buscar ${TipoEnte}`"
            append-icon="search"
            :append-icon-cb="BuscarClienteOProveedor"
            :disabled="items.length > 0" )

          v-select(
            v-bind:items="ItemsClienteOProveedor"
            v-model="ClienteOProveedor"
            :label="`${TipoEnte}`"
            item-text="Nombre"
            autocomplete
            return-object
            :disabled="items.length > 0"
            dark )

        v-flex(xs12 md6)
          v-text-field(
            label="Documento"
            v-model="ClienteOProveedor.NumeroDocumento"
            :hint="`${ClienteOProveedor.TipoDocumento || ''}`"
            persistent-hint
            readonly )

        v-flex(xs12 md6)
          v-text-field(
            label="Ciudad"
            v-model="ClienteOProveedor.Ciudad"
            readonly )

        v-flex(xs12 md6)
          v-text-field(
            label="Dirección"
            v-model="ClienteOProveedor.Direccion"
            readonly )

        v-flex(xs12 md6)
          v-text-field(
            label="Teléfono"
            v-model="ClienteOProveedor.Telefono"
            readonly )

    v-data-table(
      v-bind:headers="headers"
      :items="items"
      hide-actions
      class="elevation-5 grey lighten-1 grey--text text--darken-4" )

      template(slot="items" scope="props")
        td( style="border-left: 1px solid #999999" class="text-xs-center" ) {{ props.index+1 }}
        td(class="text-xs-center" style="border-left: 1px solid #999999") {{ ImprimirCantidad(props.item) }}
        td(class="text-xs-center" style="border-left: 1px solid #999999") {{ ImprimirProducto(props.item) }}
        td(class="text-xs-left" style="border-left: 1px solid #999999") {{ ImprimirSale(props.item) }}
        td(class="text-xs-right" style="border-left: 1px solid #999999") {{ ImprimirFabricacion(props.item) }}
        td(class="text-xs-right" style="border-left: 1px solid #999999") {{ ImprimirVencimiento(props.item) }}
        td(class="text-xs-right" style="border-left: 1px solid #999999") {{ ImprimirLote(props.item) }}
        td(class="text-xs-left" style="border-left: 1px solid #999999") {{ ImprimirEntra(props.item) }}
        td(class="text-xs-right pl-2 pr-2" style="min-width: 64px; border-left: 1px solid #999999") {{ props.item.Total | currency('$', 0) }}
        td(style="border-left: 1px solid #999999" class="text-xs-center pl-1 pr-1")
          v-btn(
            fab
            dark
            small
            error
            style="width: 16px; height:16px"
            @click.native="eliminar(props.item)")
            //-:disabled="EsSoloVendedor")

            v-icon(dark) remove

    v-layout(row wrap mt-5)
      v-flex(xs12)
        v-switch(v-model="Entra" :label="EntradaSalida")
      v-flex(xs12 md6 v-if="TipoEnte==='Cliente' && EntradaSalida==='Salida'")
        v-text-field(
          v-model="NumeroProduccionAndRecprodcom"
          label="Buscar Sale"
          append-icon="search"
          :append-icon-cb="BuscarProduccionAndRecprodcom" )

        v-select(
          v-bind:items="ItemsProduccionAndRecprodcom"
          v-model="ProduccionAndRecprodcomActual"
          label="Envase Sale"
          item-text="Buscar"
          return-object
          autocomplete
          dark )

      v-flex(xs12 md6 v-if="TipoEnte==='Proveedor' && EntradaSalida==='Salida'")
        v-text-field(
          v-model="NumeroEnvaseSale"
          label="Buscar Sale"
          append-icon="search"
          :append-icon-cb="BuscarEnvaseSale" )

        v-select(
          v-bind:items="ItemsEnvaseSale"
          v-model="EnvaseSaleActual"
          label="Envase Sale"
          item-text="Numero"
          return-object
          autocomplete
          dark )

      v-flex(xs12 v-if="EntradaSalida==='Entrada'")
        v-text-field(
          v-model="NumeroEnvaseEntra"
          label="Buscar Entra"
          append-icon="search"
          :append-icon-cb="BuscarEnvaseEntra" )

        v-select(
          v-bind:items="ItemsEnvaseEntra"
          v-model="EnvaseEntraActual"
          label="Envase Entra"
          item-text="Numero"
          return-object
          autocomplete
          dark )

      v-flex(xs12 md6 v-if="TipoEnte==='Cliente' && EntradaSalida==='Salida'")
        v-money(
          label="Total"
          v-model="TotalActual"
          maskType="currency" )

    v-btn(
      fab
      dark
      class="indigo mt-0" @click.native="Guardar" :disabled="!Autorizacion")

      v-icon(dark) add

    v-card-actions
      v-spacer

      v-btn(
        dark
        warning
        @click.native="Limpiar"
        class="mt-0" ) Limpiar

      v-btn(
        dark
        primary
        @click.native="generar"
        class="mt-0" ) Imprimir

</template>

<style>
</style>

<script>
  import VMoney from '~/components/MonetaryInput.vue'

  import REMISIONS from '~/queries/Remisions.gql'
  import PRODUCCIONS2 from '~/queries/Produccions2.gql'
  import PRODUCCIONSBYCORRERIA from '~/queries/ProduccionsByCorreria.gql'
  import RECPRODCOMSBYCORRERIA from '~/queries/RecprodcomsByCorreria.gql'
  import CREATE_REMISION from '~/queries/CreateRemision.gql'
  import CREATE_REMISION_PROVEEDOR from '~/queries/CreateRemisionProveedor.gql'
  import UPDATE_REMISION from '~/queries/UpdateRemision.gql'
  import UPDATE_ONE_PRODUCCION from '~/queries/UpdateOneProduccion.gql'
  import DELETE_REMISION from '~/queries/DeleteRemision.gql'
  import DELETE_REMISION_PROVEEDOR from '~/queries/DeleteRemisionProveedor.gql'
  import ENTES from '~/queries/Entes.gql'
  import ONE_ENTE from '~/queries/OneEnte.gql'
  import ENVASES from '~/queries/Envases.gql'
  import UPDATE_ENVASE from '~/queries/UpdateEnvase.gql'
  import CREATE_KARDEX_SALE from '~/queries/CreateKardexSale.gql'
  import CREATE_KARDEX_ENTRA from '~/queries/CreateKardexEntra.gql'
  import DELETE_KARDEX_SALE from '~/queries/DeleteKardexSale.gql'
  import DELETE_KARDEX_ENTRA from '~/queries/DeleteKardexEntra.gql'
  import LAST_REMISION from '~/queries/LastRemision.gql'


  export default {
    mounted () {
      this.$nextTick(() => {
        if(!this.$store.state.security.Roles.includes("Gerencia")){
          this.EsSoloVendedor = true;
        }
        //console.log(this.$store.state.security.UserName);
      })
    },
    data () {
      return {
        Numero: null,
        Fecha: null,
        TipoEnte: 'Cliente',
        OptionsTipoEnte: [
          'Cliente',
          'Proveedor'
        ],
        ClienteOProveedor: {},
        ItemsDocumento: [
          {text: 'Nit'},
          {text: 'Cédula'}
        ],
        ItemsClienteOProveedor: [],
        ItemsProduccionAndRecprodcom: [],
        ItemsAllEnvase: [],
        ItemsEnvaseEntra: [],
        ItemsEnvaseSale: [],
        ProduccionAndRecprodcomActual: {},
        EnvaseEntraActual: {},
        EnvaseSaleActual: {},
        TotalActual: null,
        headers: [
          { text: 'N°', align: 'center', sortable: false,  value: '' },
          { text: 'Cantidad', align: 'center', sortable: false,  value: 'Cantidad' },
          { text: 'Producto', align: 'center', sortable: false, value: 'Producto' },
          { text: 'Sale', align: 'center', sortable: false,  value: 'Sale' },
          { text: 'F.Elaboración', align: 'center', sortable: false,  value: 'Elaboración' },
          { text: 'F.Vencimiento', align: 'center', sortable: false,  value: 'Vencimiento' },
          { text: 'Lote', align: 'center', sortable: false,  value: 'Lote' },
          { text: 'Entra', align: 'center', sortable: false,  value: 'Entra' },
          { text: 'Total', align: 'center', sortable: false,  value: 'Total' },
          { text: 'Eliminar', align: 'center', sortable: false,  value: 'Eliminar' }
        ],
        items: [],

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
        NumeroEnvaseEntra: null,
        NumeroEnvaseSale: null,
        NumeroProduccionAndRecprodcom: null,
        NombreDocumento: null,
        menu1: false,
        Autorizacion: false,
        VendedorId: null,
        EsSoloVendedor: false,
        EntradaSalida: 'Salida',
        Entra: false,
      }
    },
    apollo: {
      Remisions:{
        query: REMISIONS,
        fetchPolicy: 'network-only',
        variables () {
          return {
            Numero: this.Numero,
            VendedorId: this.VendedorId ? this.VendedorId : 0
          }
        },
        update (data) {
          //console.log(this.$store.state.security.UserName);
          if (data.Remisions.length > 0) {
            this.Fecha = data.Remisions[0].Fecha
            this.TipoEnte = data.Remisions[0].Tipo;

            this.ItemsClienteOProveedor.push(data.Remisions[0].Ente)
            this.ClienteOProveedor = data.Remisions[0].Ente || {}

            this.items = []
            for (let i=0; i<data.Remisions.length; i++) {
              var tmp = {
                Id: data.Remisions[i].Id,
                Produccion: data.Remisions[i].Produccion,
                Recprodcom: data.Remisions[i].Recprodcom,
                EnvaseEntra: data.Remisions[i].EnvaseEntra,
                EnvaseSale: data.Remisions[i].EnvaseSale,
                Total: data.Remisions[i].Total,
                //SaveUpdate: 'update',
              }

              this.items.push(tmp)
            }
          } else {
            this.reset()
          }
        }
      },
      Vendedor: {
        query: ENTES,
        fetchPolicy: 'network-only',
        variables () {
          return {
            NumeroDocumento: this.$store.state.security.UserName,
            Relacion: 'Vendedor'
          }
        },
        update (data) {

          if(data.Entes.length > 0){
            this.VendedorId = data.Entes[0].Id
          }
          else {
            this.VendedorId = null
          }

        }
      }
      /*LastRemision: {
        query: LAST_REMISION,
        loading: 'loading',
        update (data) {
          if(data.LastRemision === null) {
            this.Numero = this.zfill(1, 4)
          }
          else {
            this.Numero = this.zfill(Number(data.LastRemision.Numero) + 1, 4)
          }

        }
      },*/
    },
    watch: {
      Fecha (value) {
        let hoy = new Date(Date.now()-(1000*60*60*5));
        let fecha = new Date(value+'T00:00:00');
        if(fecha > hoy){
          this.Fecha = hoy.toISOString().split('T')[0];
        }
      },
      ClienteOProveedor: {
        handler (value) {
          this.AutorizacionGuardar ();
        },
        deep: true
      },
      ProduccionAndRecprodcomActual: {
        handler (value) {
          this.AutorizacionGuardar ();
        },
        deep: true
      },
      EnvaseEntraActual: {
        handler (value) {
          this.AutorizacionGuardar ();
        },
        deep: true
      },
      EnvaseSaleActual: {
        handler (value) {
          this.AutorizacionGuardar ();
        },
        deep: true
      },
      VendedorId: {
          handler(value) {
            console.log(value);
          }
      },
      Entra: {
        handler (value) {
          if(value){
            this.EntradaSalida = 'Entrada';
          }else{
            this.EntradaSalida = 'Salida';
          }
          this.ItemsProduccionAndRecprodcom = [];
          this.ItemsEnvaseEntra = [];
          this.ItemsEnvaseSale = [];
          this.ProduccionAndRecprodcomActual = {};
          this.EnvaseEntraActual = {};
          this.EnvaseSaleActual = {};
        }
      }
    },
    methods: {
      ImprimirCantidad(item){
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;
        let EnvaseSale = item.EnvaseSale;
        let EnvaseEntra = item.EnvaseEntra;
        
        if(null !== Produccion && undefined !== Produccion) return `${Produccion.Cantidad} ${Produccion.Producto.UnidadDeMedida}`;
        if(null !== Recprodcom && undefined !== Recprodcom) return `${Recprodcom.Cantidad} ${Recprodcom.Producto.UnidadDeMedida}`;
        if(null !== EnvaseEntra && undefined !== EnvaseEntra) return `${EnvaseEntra.Capacidad} ${EnvaseEntra.Producto.UnidadDeMedida}`;
        if(null !== EnvaseSale && undefined !== EnvaseSale) return `${EnvaseSale.Capacidad} ${EnvaseSale.Producto.UnidadDeMedida}`;
      
        return '';
      },
      ImprimirProducto(item) {
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;
        let EnvaseEntra = item.EnvaseEntra;
        let EnvaseSale = item.EnvaseSale;

        if(null !== Produccion && undefined !== Produccion) return Produccion.Producto.Nombre;
        if(null !== Recprodcom && undefined !== Recprodcom) return Recprodcom.Producto.Nombre;
        if(null !== EnvaseEntra && undefined !== EnvaseEntra) return EnvaseEntra.Producto.Nombre;
        if(null !== EnvaseSale && undefined !== EnvaseSale) return EnvaseSale.Producto.Nombre;
      },
      ImprimirSale(item) {
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;
        let EnvaseSale = item.EnvaseSale;

        if(null !== Produccion && undefined !== Produccion) return Produccion.Envase.Numero;
        if(null !== Recprodcom && undefined !== Recprodcom) return Recprodcom.Envase.Numero;
        if(null !== EnvaseSale && undefined !== EnvaseSale) return EnvaseSale.Numero;

        return '';
      },
      ImprimirFabricacion(item) {
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;

        if(null !== Produccion && undefined !== Produccion) return Produccion.FechaFabricacion;
        if(null !== Recprodcom && undefined !== Recprodcom) return Recprodcom.FechaFabricacion;

        return '';
      },
      ImprimirVencimiento(item) {
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;

        if(null !== Produccion && undefined !== Produccion) return Produccion.FechaVencimiento;
        if(null !== Recprodcom && undefined !== Recprodcom) return Recprodcom.FechaVencimiento;

        return '';
      },
      ImprimirLote(item) {
        let Produccion = item.Produccion;
        let Recprodcom = item.Recprodcom;

        if(null !== Produccion && undefined !== Produccion) return Produccion.Lote;
        if(null !== Recprodcom && undefined !== Recprodcom) return Recprodcom.Lote;

        return '';
      },
      ImprimirEntra(item) {
        let EnvaseEntra = item.EnvaseEntra;

        if(null !== EnvaseEntra && undefined !== EnvaseEntra) return EnvaseEntra.Numero;

        return '';
      },
      ResetTipoEnte () {
        this.ClienteOProveedor = {},
        this.ItemsClienteOProveedor = []
        this.NombreDocumento = null
      },
      EncontrarClave (Obj, clave) {
        //console.log(Obj);
        if(Obj.hasOwnProperty(clave)){
          return Obj[clave];
        }
        else if(Obj.Produccion){
          if(Obj.Produccion.hasOwnProperty(clave)){
            return Obj.Produccion[clave];
          }else if(Obj.Produccion.Producto.hasOwnProperty(clave)){
            return Obj.Produccion.Producto[clave];
          }
        }
        else if(Obj.Recprodcom){
          if(Obj.Recprodcom.hasOwnProperty(clave)){
            return Obj.Recprodcom[clave];
          }else if(Obj.Recprodcom.Producto.hasOwnProperty(clave)){
            return Obj.Recprodcom.Producto[clave];
          }
        }
        else if(Obj.Envase){
          if(Obj.Envase.hasOwnProperty(clave)){
            return Obj.Envase[clave];
          }else if(Obj.Envase.Producto.hasOwnProperty(clave)){
            return Obj.Envase.Producto[clave];
          }
          return '';
        }
      },
      BuscarClienteOProveedor () {
        this.ItemsClienteOProveedor = [];
        if(null !== this.NombreDocumento && this.NombreDocumento.length >= 3){
          this.$apollo.query({
            query: ENTES,
            fetchPolicy: 'network-only',
            variables: {
              NombreDocumento: this.NombreDocumento,
              Relacion: this.TipoEnte === 'Cliente' ? 'Cliente' : 'Proveedor'
            },
          }).then( res => {
            console.log(res.data.Entes.length);
            this.ItemsClienteOProveedor = res.data.Entes;
          });
        }
      },
      BuscarEnvaseEntra () {
        this.EnvaseEntraActual = {};
        this.ItemsEnvaseEntra = [];
        if(null !== this.NumeroEnvaseEntra && this.NumeroEnvaseEntra.length >= 2){
          this.$apollo.query({
            query: ENVASES,
            fetchPolicy: 'network-only',
            variables: {
              Numero: this.NumeroEnvaseEntra
            },
          }).then (res => {
            for (let i=0; i<res.data.Envases.length; i++) {
              var tmp = {
                Id: res.data.Envases[i].Id,
                Numero: res.data.Envases[i].Numero,
                Disponible: res.data.Envases[i].Disponible,
                Producto: res.data.Envases[i].Producto
              }
              let esta = false;
              if(undefined === this.items.find(x => x.EnvaseEntra.Id === tmp.Id)){
                 this.ItemsEnvaseEntra.push(tmp);
              };
            }
          });
        }
      },
      BuscarEnvaseSale () {
        this.EnvaseSaleActual = {};
        this.ItemsEnvaseSale = [];
        if(null !== this.NumeroEnvaseSale && this.NumeroEnvaseSale.length >= 2){
          this.$apollo.query({
            query: ENVASES,
            fetchPolicy: 'network-only',
            variables: {
              Numero: this.NumeroEnvaseSale
            },
          }).then (res => {
            console.log(res.data.Envases.length);
            for (let i=0; i<res.data.Envases.length; i++) {
              var tmp = {
                Id: res.data.Envases[i].Id,
                Numero: res.data.Envases[i].Numero,
                Disponible: res.data.Envases[i].Disponible,
                Producto: res.data.Envases[i].Producto
              }
              this.ItemsEnvaseSale.push(tmp)
            }
          });
        }
      },
      BuscarProduccionAndRecprodcom () {
        this.ProduccionAndRecprodcomActual = {};
        this.ItemsProduccionAndRecprodcom = [];

        if(null !== this.NumeroProduccionAndRecprodcom && this.NumeroProduccionAndRecprodcom.length >= 2 && this.Fecha !== null && this.Fecha !== ''){

          //Produccions
          this.$apollo.query({
            query: PRODUCCIONSBYCORRERIA,
            fetchPolicy: 'network-only',
            variables: {
              VendedorId: this.VendedorId,
              NumeroEnvase: this.NumeroProduccionAndRecprodcom,
              FechaFabricacion: this.Fecha
            },
          }).then( res => {
            console.log(res.data.ProduccionsByCorreria.length);
            let Produccions = res.data.ProduccionsByCorreria;

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
          });

          //Recprodcoms
          this.$apollo.query({
            query: RECPRODCOMSBYCORRERIA,
            fetchPolicy: 'network-only',
            variables: {
              VendedorId: this.VendedorId,
              NumeroEnvase: this.NumeroProduccionAndRecprodcom,
              FechaFabricacion: this.Fecha
            },
          }).then( res => {
            console.log(res.data.RecprodcomsByCorreria.length);
            let Recprodcoms = res.data.RecprodcomsByCorreria;

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
          });
        }
      },
      AutoLLenar () {
        this.$apollo.queries.LastRemision.refetch()
      },
      zfill (num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
      },
      AutorizacionGuardar(){
        let requisito1 = this.ClienteOProveedor;
        let requisito2 = this.ProduccionAndRecprodcomActual;
        let requisito3 = this.EnvaseSaleActual;
        let requisito4 = this.EnvaseEntraActual;
        let requisito5 = this.VendedorId;

        if(
          requisito1.hasOwnProperty("Id") &&
          (
            requisito2.hasOwnProperty("Id") ||
            requisito3.hasOwnProperty("Id") ||
            requisito4.hasOwnProperty("Id")
          ) &&
          requisito5 !== null
        ){
          this.Autorizacion = true;
          return true;
        }

        this.Autorizacion = false;
        return false;
      },
      Guardar () {
        if(!this.AutorizacionGuardar()) return;

        if(this.TipoEnte === 'Cliente'){
          var tmp = {
            Id: null,
            Produccion: this.ProduccionAndRecprodcomActual.Type === "Produccion" ? this.ProduccionAndRecprodcomActual : null,
            Recprodcom: this.ProduccionAndRecprodcomActual.Type === "Recprodcom" ? this.ProduccionAndRecprodcomActual : null,
            EnvaseEntra: this.EnvaseEntraActual,
            Total: this.TotalActual,
            VendedorId: this.VendedorId
          }

          this.guardarTipoCliente(tmp)
        }
        else if(this.TipoEnte === 'Proveedor'){
          var tmp = {
            Id: null,
            EnvaseEntra: this.EnvaseEntraActual ? { Id: this.EnvaseEntraActual.Id,  Numero: this.EnvaseEntraActual.Numero } : null,
            EnvaseSale: this.EnvaseSaleActual ? { Id: this.EnvaseSaleActual.Id,  Numero: this.EnvaseSaleActual.Numero } : null,
            VendedorId: this.VendedorId
          }

          this.guardarTipoProveedor(tmp)
        }

        
        this.ItemsProduccionAndRecprodcom = this.ItemsProduccionAndRecprodcom.filter( Item => {
          return ( (tmp.Produccion !== null && tmp.Produccion.Id !== Item.Id) || (tmp.Recprodcom !== null && tmp.Recprodcom.Id !== Item.Id) )
        });

        this.ItemsEnvaseEntra = this.ItemsEnvaseEntra.filter( Item => {
          return Item.Id !== (tmp.EnvaseEntra ? tmp.EnvaseEntra.Id : null);
        });

        this.ItemsEnvaseSale = this.ItemsEnvaseSale.filter( Item => {
          return Item.Id !== (tmp.EnvaseSale ? tmp.EnvaseSale.Id : null);
        });

        this.ProduccionAndRecprodcomActual = {},
        this.NumeroEnvaseEntraActual = {},
        this.NumeroEnvaseSaleActual = {},
        this.TotalActual = null;

      },
      guardarTipoCliente (item) {

        this.$apollo.mutate ({
          mutation: CREATE_REMISION,
          variables: {
            Numero: this.Numero,
            Fecha: this.Fecha,
            EnteId: this.ClienteOProveedor.Id,
            ProduccionId: item.Produccion ? item.Produccion.Id : null,
            EnvaseProduccionId: item.Produccion ? item.Produccion.Envase.Id : null,
            RecprodcomId: item.Recprodcom ? item.Recprodcom.Id : null,
            EnvaseRecprodcomId: item.Recprodcom ? item.Recprodcom.Envase.Id : null,
            EnvaseEntraId: item.EnvaseEntra ? item.EnvaseEntra.Id : null,
            Total: item.Total,
            VendedorId: item.VendedorId
          },
          update: (store, { data: res }) => {
            var tmp = {
              Id: res.CreateRemision.Id,
              Produccion: res.CreateRemision.Produccion,
              Recprodcom: res.CreateRemision.Recprodcom,
              EnvaseEntra: res.CreateRemision.EnvaseEntra,
              Total: res.CreateRemision.Total
            }
            this.items.push(tmp);
          }
        });

      },
      guardarTipoProveedor (item) {

        this.$apollo.mutate ({
          mutation: CREATE_REMISION_PROVEEDOR,
          variables: {
            Numero: this.Numero,
            Fecha: this.Fecha,
            EnteId: this.ClienteOProveedor.Id,
            EnvaseEntraId: item.EnvaseSale ? item.EnvaseSale.Id : null,
            EnvaseSaleId: item.EnvaseEntra ? item.EnvaseEntra.Id : null,
            VendedorId: item.VendedorId
          },
          update: (store, { data: res }) => {
            var tmp = {
              Id: res.CreateRemisionProveedor.Id,
              EnvaseEntra: res.CreateRemisionProveedor.EnvaseEntra,
              EnvaseSale: res.CreateRemisionProveedor.EnvaseSale
            }
            this.items.push(tmp);
          }
        });
      },
      eliminar (item) {

        /*if ( item.Id === null ) {
          for (let i=0; i<this.items.length; i++) {
            if ( item.Produccion !== null ) {
              if( this.items[i].Produccion !== null ){
                if(item.Produccion.Id === this.item[i].Produccion.Id){
                  this.items.splice(i, 1);
                  break;
                }
              }
            }
            else if( item.Recprodcom !== null ){
              if( this.items[i].Recprodcom !== null ){
                if(item.Recprodcom.Id === this.item[i].Recprodcom.Id){
                  this.items.splice(i, 1);
                  break;
                }
              }
            }
            else if( item.EnvaseEntra !== null ){
              if( this.items[i].EnvaseEntra !== null ){
                if(item.EnvaseEntra.Id === this.item[i].EnvaseEntra.Id){
                  this.items.splice(i, 1);
                  break;
                }
              }
            }
            else if( item.EnvaseSale !== null ){
              if( this.items[i].EnvaseSale !== null ){
                if(item.EnvaseSale.Id === this.item[i].EnvaseSale.Id){
                  this.items.splice(i, 1);
                  break;
                }
              }
            }
          }
        }
        else {*/
          for (let i=0; i<this.items.length; i++) {
            if ( item.Id === this.items[i].Id ) {
              this.items.splice(i, 1);
              break;
            }
          }
        //}

        if(this.TipoEnte === 'Cliente'){
          const Remision = {
            Id: item.Id,
            Numero: this.Numero,
            ProduccionId: item.Produccion ? item.Produccion.Id : null,
            EnvaseProduccionId: item.Produccion ? item.Produccion.Envase.Id : null,
            RecprodcomId: item.Recprodcom ? item.Recprodcom.Id : null,
            EnvaseRecprodcomId: item.Recprodcom ? item.Recprodcom.Envase.Id : null,
            EnvaseEntraId: item.EnvaseEntra ? item.EnvaseEntra.Id : null
          }

          if (item.Id !== null) {
            this.$apollo.mutate ({
              mutation: DELETE_REMISION,
              variables: {
                Id: Remision.Id,
                Numero: Remision.Numero,
                ProduccionId: Remision.ProduccionId,
                EnvaseProduccionId: Remision.EnvaseProduccionId,
                RecprodcomId: Remision.RecprodcomId,
                EnvaseRecprodcomId: Remision.EnvaseRecprodcomId,
                EnvaseEntraId: Remision.EnvaseEntraId
              }
            });
          }
          else {
            for (let i=0; i<this.items.length; i++) {
              if (item.Id === this.items[i].Id) {
                this.items.splice(i, 1)
                break;
              }
            }
          }
        }
        else if(this.TipoEnte === 'Proveedor') {
          const Remision = {
            Id: item.Id,
            Numero: this.Numero,
            EnvaseEntraId: item.EnvaseEntra ? item.EnvaseEntra.Id : null,
            EnvaseSaleId: item.EnvaseSale ? item.EnvaseSale.Id : null

          }
          if (item.Id !== null) {
            this.$apollo.mutate ({
              mutation: DELETE_REMISION_PROVEEDOR,
              variables: {
                Id: Remision.Id,
                Numero: Remision.Numero,
                EnvaseEntraId: Remision.EnvaseEntraId,
                EnvaseSaleId: Remision.EnvaseSaleId,
              }
            });
          }
          else {
            for (let i=0; i<this.items.length; i++) {
              if (item.Id === this.items[i].Id) {
                this.items.splice(i, 1)
                break;
              }
            }
          }
        }

        if(this.items.length === 0){
          this.reset();
        }

      },
      Limpiar () {
        this.Numero = null
      },
      reset () {

        this.Fecha = null,

        this.ClienteOProveedor = {};
        this.EnvaseEntraActual = {}
        this.EnvaseSaleActual = {}
        this.ProduccionAndRecprodcomActual = {}

        this.ItemsClienteOProveedor = [];
        this.ItemsProduccionAndRecprodcom = [];
        this.ItemsAllEnvase = [];
        this.ItemsEnvaseEntra = [];
        this.ItemsEnvaseSale = [];
        this.items = []
        this.TipoEnte = 'Cliente';

        this.NumeroEnvaseEntra = null;
        this.NumeroEnvaseSale = null;
        this.NumeroProduccionAndRecprodcom = null;
        this.NombreDocumento = null;


      },
      generar () {
        this.$store.commit('remision/changeNumero', this.Numero)
        this.$router.push('/reporte/remision');
      },
      FiltrarEnvases () {
        for (let i=0; i<this.ItemsProduccionAndRecprodcom.length; i++){
          let tmpId = this.ItemsProduccionAndRecprodcom[i].Envase.Id
          this.ItemsEnvaseEntra = this.ItemsEnvaseEntra.filter(function (item) {
            return tmpId != item.Id;
          });
        }
      },
    },
    components: {
      VMoney
    }
  }
</script>
