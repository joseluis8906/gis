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
          h6(class="grey--text text--lighten-4") Cliente

        v-flex(xs12)
          v-text-field(
            v-model="NombreDocumento"
            label="Buscar Cliente"
            append-icon="search"
            :append-icon-cb="BuscarCliente"
            :disabled="items.length > 0" )

          v-select(
            v-bind:items="ItemsCliente"
            v-model="Cliente"
            label="Cliente"
            item-text="Nombre"
            autocomplete
            return-object
            :disabled="items.length > 0"
            dark )

        v-flex(xs12 md6)
          v-text-field(
            label="Documento"
            v-model="Cliente.NumeroDocumento"
            :hint="`${Cliente.TipoDocumento || ''}`"
            persistent-hint
            readonly )

        v-flex(xs12 md6)
          v-text-field(
            label="Ciudad"
            v-model="Cliente.Ciudad"
            readonly )

        v-flex(xs12 md6)
          v-text-field(
            label="Dirección"
            v-model="Cliente.Direccion"
            readonly )

        v-flex(xs12 md6)
          v-text-field(
            label="Teléfono"
            v-model="Cliente.Telefono"
            readonly )

    v-data-table(
      v-bind:headers="headers"
      :items="items"
      class="elevation-5 grey lighten-1 grey--text text--darken-4" )

      template(slot="items" scope="props")
        td(class="text-xs-center") {{ props.item.Produccion ? props.item.Produccion.Cantidad : props.item.Recprodcom ? props.item.Recprodcom.Cantidad : props.item.Envase.Capacidad }}
        td(class="text-xs-center" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.Producto.Nombre : props.item.Recprodcom ? props.item.Recprodcom.Producto.Nombre : props.item.Envase.Producto.Nombre }}
        td(class="text-xs-left" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.Envase.Numero : props.item.Recprodcom ? props.item.Recprodcom.Envase.Numero : '' }}
        td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.FechaFabricacion : props.item.Recprodcom ? props.item.Recprodcom.FechaFabricacion : '' }}
        td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.FechaVencimiento : props.item.Recprodcom ? props.item.Recprodcom.FechaVencimiento : '' }}
        td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.Lote : props.item.Recprodcom ? props.item.Recprodcom.Lote : '' }}
        td(class="text-xs-left" style="border-left: 1px solid #999999") {{ props.item.Envase ? props.item.Envase.Numero : '' }}
        td(class="text-xs-right pl-2 pr-2" style="min-width: 64px; border-left: 1px solid #999999") {{ props.item.Total | currency('$', 0) }}
        td(style="border-left: 1px solid #999999" class="text-xs-center pl-1 pr-1")
          v-btn(
            fab
            dark
            small
            error
            style="width: 16px; height:16px"
            @click.native="eliminar(props.item)")

            v-icon(dark) remove

    v-layout(row wrap mt-5)
      v-flex(xs12 md4)
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

      v-flex(xs12 md4)
        v-text-field(
          v-model="NumeroEnvase"
          label="Buscar Entra"
          append-icon="search"
          :append-icon-cb="BuscarEnvase" )

        v-select(
          v-bind:items="ItemsEnvase"
          v-model="EnvaseActual"
          label="Envase Entra"
          item-text="Numero"
          return-object
          autocomplete
          dark )

      v-flex(xs12 md4)
        v-money(
          label="Total"
          v-model="TotalActual"
          maskType="currency" )

    v-btn(
      fab
      dark
      class="indigo mt-0" @click.native="agregar" )

      v-icon(dark) add

    v-card-actions
      v-spacer

      v-btn(
        dark
        primary
        @click.native="generar"
        class="mt-0" ) Imprimir

      v-btn(
        dark
        warning
        @click.native="hardReset"
        class="mt-0" ) Limpiar

</template>

<style>
</style>

<script>
  import VMoney from '~/components/MonetaryInput.vue'

  import REMISIONS from '~/queries/Remisions.gql'
  import PRODUCCIONS2 from '~/queries/Produccions2.gql'
  import PRODUCCIONSBYENVASE from '~/queries/ProduccionsByEnvase.gql'
  import RECPRODCOMSBYENVASE from '~/queries/RecprodcomsByEnvase.gql'
  import CREATE_REMISION from '~/queries/CreateRemision.gql'
  import UPDATE_REMISION from '~/queries/UpdateRemision.gql'
  import UPDATE_ONE_PRODUCCION from '~/queries/UpdateOneProduccion.gql'
  import DELETE_REMISION from '~/queries/DeleteRemision.gql'
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
    data () {
      return {
        Numero: null,
        Fecha: null,
        Cliente: {
          Id: null,
          TipoDocumento: null,
          NumeroDocumento: null,
          Nombre: null,
          Ciudad: null,
          Direccion: null,
          Telefono: null
        },
        ItemsDocumento: [
          {text: 'Nit'},
          {text: 'Cédula'}
        ],
        ItemsCliente: [],
        ItemsProduccionAndRecprodcom: [],
        ItemsAllEnvase: [],
        ItemsEnvase: [],
        ProduccionAndRecprodcomActual: null,
        EnvaseActual: null,
        TotalActual: null,
        headers: [
          { text: 'Cant', align: 'center', sortable: false,  value: 'Cantidad' },
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
        NumeroEnvase: null,
        NumeroProduccionAndRecprodcom: null,
        NombreDocumento: null,

        menu1: false,
      }
    },
    apollo: {
      Remisions:{
        query: REMISIONS,
        variables () {
          return {
            Numero: this.Numero
          }
        },
        fetchPolicy: 'network-only',
        update (data) {

          if (data.Remisions.length > 0) {
            this.Fecha = data.Remisions[0].Fecha

            this.ItemsCliente.push(data.Remisions[0].Ente)
            this.Cliente = data.Remisions[0].Ente

            this.items = []
            for (let i=0; i<data.Remisions.length; i++) {
              var tmp = {
                Id: data.Remisions[i].Id,
                Produccion: data.Remisions[i].Produccion ? {
                  Id: data.Remisions[i].Produccion.Id,
                  Cantidad: data.Remisions[i].Produccion.Cantidad,
                  FechaFabricacion: data.Remisions[i].Produccion.FechaFabricacion,
                  FechaVencimiento: data.Remisions[i].Produccion.FechaVencimiento,
                  Lote: data.Remisions[i].Produccion.Lote,
                  Envase: {
                    Id: data.Remisions[i].Produccion.Envase.Id,
                    Numero: data.Remisions[i].Produccion.Envase.Numero,
                  },
                  Producto: {
                    Id: data.Remisions[i].Produccion.Producto.Id,
                    Nombre: data.Remisions[i].Produccion.Producto.Nombre,
                    UnidadDeMedida: data.Remisions[i].Produccion.Producto.UnidadDeMedida
                  },
                  Despachado: data.Remisions[i].Produccion.Despachado
                } : null,
                Recprodcom: data.Remisions[i].Recprodcom ? {
                  Id: data.Remisions[i].Recprodcom.Id,
                  Cantidad: data.Remisions[i].Recprodcom.Cantidad,
                  FechaFabricacion: data.Remisions[i].Recprodcom.FechaFabricacion,
                  FechaVencimiento: data.Remisions[i].Recprodcom.FechaVencimiento,
                  Lote: data.Remisions[i].Recprodcom.Lote,
                  Envase: {
                    Id: data.Remisions[i].Recprodcom.Envase.Id,
                    Numero: data.Remisions[i].Recprodcom.Envase.Numero,
                  },
                  Producto: {
                    Id: data.Remisions[i].Recprodcom.Producto.Id,
                    Nombre: data.Remisions[i].Recprodcom.Producto.Nombre,
                    UnidadDeMedida: data.Remisions[i].Recprodcom.Producto.UnidadDeMedida
                  },
                  Despachado: data.Remisions[i].Recprodcom.Despachado
                } : null,
                Envase: data.Remisions[i].Envase ? {
                  Id: data.Remisions[i].Envase.Id,
                  Numero: data.Remisions[i].Envase.Numero,
                  Capacidad: data.Remisions[i].Envase.Capacidad,
                  Producto: data.Remisions[i].Envase.Producto
                } : null,
                Total: data.Remisions[i].Total,
                SaveUpdate: 'update',
              }
              this.items.push(tmp)
            }
          } else {
            this.reset()
          }
        }
      },
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
      }
    },
    methods: {
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
            console.log(res.data.Entes.length);
            this.ItemsCliente = res.data.Entes;
          });
        }
      },
      BuscarEnvase () {
        this.EnvaseActual = null;
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
            console.log(res.data.Envases.length);
            for (let i=0; i<res.data.Envases.length; i++) {
              var tmp = {
                Id: res.data.Envases[i].Id,
                Numero: res.data.Envases[i].Numero,
                Disponible: res.data.Envases[i].Disponible,
                Producto: {
                  Nombre: res.data.Envases[i].Producto.Nombre,
                  UnidadDeMedida: res.data.Envases[i].Producto.UnidadDeMedida
                }
              }
              this.ItemsEnvase.push(tmp)
            }
          });
        }
      },
      BuscarProduccionAndRecprodcom () {
        this.ProduccionAndRecprodcomActual = null;
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
                Envase: {
                  Id: Produccions[i].Envase.Id,
                  Numero: Produccions[i].Envase.Numero
                },
                Producto: {
                  Id: Produccions[i].Producto.Id,
                  Nombre: Produccions[i].Producto.Nombre,
                  UnidadDeMedida: Produccions[i].Producto.UnidadDeMedida
                },
                Despachado: Produccions[i].Despachado
              }
              tmp.Despachado === 'No' ? this.ItemsProduccionAndRecprodcom.push(tmp) : null
            }
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
                Envase: {
                  Id: Recprodcoms[i].Envase.Id,
                  Numero: Recprodcoms[i].Envase.Numero
                },
                Producto: {
                  Id: Recprodcoms[i].Producto.Id,
                  Nombre: Recprodcoms[i].Producto.Nombre,
                  UnidadDeMedida: Recprodcoms[i].Producto.UnidadDeMedida
                },
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
      agregar () {
        if(
          (null === this.ProduccionAndRecprodcomActual || typeof(this.ProduccionAndRecprodcomActual) !== 'object') &&
          (null === this.EnvaseActual || typeof(this.EnvaseActual) !== 'object')
         ){
          console.log('Error en Envase, produccion o recprodcom');
          return;
        }
        var tmp = {
          Id: null,
          Produccion: this.ProduccionAndRecprodcomActual ? this.ProduccionAndRecprodcomActual.Type === "Produccion" ?  {
            Type: this.ProduccionAndRecprodcomActual.Type,
            Id: this.ProduccionAndRecprodcomActual.Id,
            FechaFabricacion: this.ProduccionAndRecprodcomActual.FechaFabricacion,
            FechaVencimiento: this.ProduccionAndRecprodcomActual.FechaVencimiento,
            Lote: this.ProduccionAndRecprodcomActual.Lote,
            Cantidad: this.ProduccionAndRecprodcomActual.Cantidad,
            Envase: {
              Id: this.ProduccionAndRecprodcomActual.Envase.Id,
              Numero: this.ProduccionAndRecprodcomActual.Envase.Numero,
            },
            Producto: {
              Id: this.ProduccionAndRecprodcomActual.Producto.Id,
              Nombre: this.ProduccionAndRecprodcomActual.Producto.Nombre,
              UnidadDeMedida: this.ProduccionAndRecprodcomActual.Producto.UnidadDeMedida,
            }
          } : null : null,
          Recprodcom: this.ProduccionAndRecprodcomActual ? this.ProduccionAndRecprodcomActual.Type === "Recprodcom" ? {
            Type: this.ProduccionAndRecprodcomActual.Type,
            Id: this.ProduccionAndRecprodcomActual.Id,
            FechaFabricacion: this.ProduccionAndRecprodcomActual.FechaFabricacion,
            FechaVencimiento: this.ProduccionAndRecprodcomActual.FechaVencimiento,
            Lote: this.ProduccionAndRecprodcomActual.Lote,
            Cantidad: this.ProduccionAndRecprodcomActual.Cantidad,
            Envase: {
              Id: this.ProduccionAndRecprodcomActual.Envase.Id,
              Numero: this.ProduccionAndRecprodcomActual.Envase.Numero,
            },
            Producto: {
              Id: this.ProduccionAndRecprodcomActual.Producto.Id,
              Nombre: this.ProduccionAndRecprodcomActual.Producto.Nombre,
              UnidadDeMedida: this.ProduccionAndRecprodcomActual.Producto.UnidadDeMedida,
            }
          } : null : null,
          Envase: this.EnvaseActual ? { Id: this.EnvaseActual.Id,  Numero: this.EnvaseActual.Numero } : null,
          Total: this.TotalActual,
          SaveUpdate: 'save'
        }

        this.guardar(tmp)

        this.ItemsProduccionAndRecprodcom = this.ItemsProduccionAndRecprodcom.filter( Item => {
          return ( (tmp.Produccion !== null && tmp.Produccion.Id !== Item.Id) || (tmp.Recprodcom !== null && tmp.Recprodcom.Id !== Item.Id) )
        })

        this.ItemsEnvase = this.ItemsEnvase.filter( Item => {
          return Item.Id !== (tmp.Envase ? tmp.Envase.Id : null);
        })

        this.ProduccionAndRecprodcomActual = null,
        this.EnvaseActual = null,
        this.TotalActual = null;

      },
      guardar (item) {
        if(
          this.Fecha !== null &&
          (this.Cliente.Id !== null || typeof(this.Cliente) !== 'object' ) &&
          (item.Produccion !== null || item.Envase !== null || item.Recprodcom !== null)
        ) {

          const Remision = {
            Numero: this.Numero,
            Fecha: this.Fecha,
            EnteId: this.Cliente.Id,
            ProduccionId: item.Produccion ? item.Produccion.Id : null,
            EnvaseProduccionId: item.Produccion ? item.Produccion.Envase.Id : null,
            RecprodcomId: item.Recprodcom ? item.Recprodcom.Id : null,
            EnvaseRecprodcomId: item.Recprodcom ? item.Recprodcom.Envase.Id : null,
            EnvaseId: item.Envase ? item.Envase.Id : null,
            Total: item.Total
          }

          this.$apollo.mutate ({
            mutation: CREATE_REMISION,
            variables: {
              Numero: Remision.Numero,
              Fecha: Remision.Fecha,
              EnteId: Remision.EnteId,
              ProduccionId: Remision.ProduccionId,
              EnvaseProduccionId: Remision.EnvaseProduccionId,
              RecprodcomId: Remision.RecprodcomId,
              EnvaseRecprodcomId: Remision.EnvaseRecprodcomId,
              EnvaseId: Remision.EnvaseId,
              Total: Remision.Total,
              Tipo: 'Cliente'
            },
            loadingKey: 'loading',
            update: (store, { data: res }) => {
              var tmp = {
                Id: res.CreateRemision.Id,
                Produccion: res.CreateRemision.Produccion ? {
                  Id: res.CreateRemision.Produccion.Id,
                  Cantidad: res.CreateRemision.Produccion.Cantidad,
                  FechaFabricacion: res.CreateRemision.Produccion.FechaFabricacion,
                  FechaVencimiento: res.CreateRemision.Produccion.FechaVencimiento,
                  Lote: res.CreateRemision.Produccion.Lote,
                  Envase: {
                    Id: res.CreateRemision.Produccion.Envase.Id,
                    Numero: res.CreateRemision.Produccion.Envase.Numero,
                  },
                  Producto: {
                    Id: res.CreateRemision.Produccion.Producto.Id,
                    Nombre: res.CreateRemision.Produccion.Producto.Nombre,
                    UnidadDeMedida: res.CreateRemision.Produccion.Producto.UnidadDeMedida
                  },
                  Despachado: res.CreateRemision.Produccion.Despachado
                } : null,
                Recprodcom: res.CreateRemision.Recprodcom ? {
                  Id: res.CreateRemision.Recprodcom.Id,
                  Cantidad: res.CreateRemision.Recprodcom.Cantidad,
                  FechaFabricacion: res.CreateRemision.Recprodcom.FechaFabricacion,
                  FechaVencimiento: res.CreateRemision.Recprodcom.FechaVencimiento,
                  Lote: res.CreateRemision.Recprodcom.Lote,
                  Envase: {
                    Id: res.CreateRemision.Recprodcom.Envase.Id,
                    Numero: res.CreateRemision.Recprodcom.Envase.Numero,
                  },
                  Producto: {
                    Id: res.CreateRemision.Recprodcom.Producto.Id,
                    Nombre: res.CreateRemision.Recprodcom.Producto.Nombre,
                    UnidadDeMedida: res.CreateRemision.Recprodcom.Producto.UnidadDeMedida
                  },
                  Despachado: res.CreateRemision.Recprodcom.Despachado
                } : null,
                Envase: res.CreateRemision.Envase ? {
                  Id: res.CreateRemision.Envase.Id,
                  Numero: res.CreateRemision.Envase.Numero,
                  Capacidad: res.CreateRemision.Envase.Capacidad,
                  Producto: res.CreateRemision.Envase.Producto
                } : null,
                Total: res.CreateRemision.Total,
                SaveUpdate: 'update'
              }

              this.items.push(tmp)
            }
          });

        } else {
          console.log('Erro en función guardar');
        }
      },
      eliminar (item) {
        if ( item.Id === null ) {
          for (let i=0; i<this.items.length; i++) {
            if ( item.Produccion !== null ) {
              if( this.items[i].Produccion !== null ){
                if(item.Produccion.Id === this.item[i].Produccion.Id){
                  this.items.splice(i, 1)
                }
              }
            } else if( item.Recprodcom !== null ){
              if( this.items[i].Recprodcom !== null ){
                if(item.Recprodcom.Id === this.item[i].Recprodcom.Id){
                  this.items.splice(i, 1)
                }
              }
            } else if( item.Envase !== null ){
              if( this.items[i].Envase !== null ){
                if(item.Envase.Id === this.item[i].Envase.Id){
                  this.items.splice(i, 1)
                }
              }
            }
          }
        } else {
          for (let i=0; i<this.items.length; i++) {
            if ( item.Id === this.items[i].Id ) {
              this.items.splice(i, 1)
            }
          }
        }

        const Remision = {
          Id: item.Id,
          Numero: this.Numero,
          ProduccionId: item.Produccion ? item.Produccion.Id : null,
          EnvaseProduccionId: item.Produccion ? item.Produccion.Envase.Id : null,
          RecprodcomId: item.Recprodcom ? item.Recprodcom.Id : null,
          EnvaseRecprodcomId: item.Recprodcom ? item.Recprodcom.Envase.Id : null,
          EnvaseId: item.Envase ? item.Envase.Id : null
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
              EnvaseId: Remision.EnvaseId
            },
            loadingKey: 'loading'
          });

        } else {

          for (let i=0; i<this.items.length; i++) {
            if (item.Id === this.items[i].Id) {
              this.items.splice(i, 1)
            }
          }
        }

        if(this.items.length === 0){
          this.reset();
        }

      },
      hardReset () {
        this.Numero = null
      },
      reset () {

        this.Fecha = null,

        this.Cliente = {
          Id: null,
          TipoDocumento: null,
          NumeroDocumento: null,
          Nombre: null,
          Direccion: null,
          Direccion: null,
          Telefono: null
        }

        this.items = []
      },
      generar () {
        this.$store.commit('remision/changeNumero', this.Numero)
        this.$router.push('/reporte/remision');
      },
      FiltrarEnvases () {
        for (let i=0; i<this.ItemsProduccionAndRecprodcom.length; i++){
          let tmpId = this.ItemsProduccionAndRecprodcom[i].Envase.Id
          this.ItemsEnvase = this.ItemsEnvase.filter(function (item) {
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
