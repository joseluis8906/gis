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
      v-card-text
        v-layout( row wrap )
          v-flex( xs12 )
            v-text-field( label="Número" v-model="Numero" @keyup.native.enter="AutoLLenar" dark )

            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu1"
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
                    :append-icon-cb="BuscarCliente")

                  v-select( v-bind:items="ItemsCliente"
                            v-model="Cliente"
                            label="Cliente"
                            item-text="Nombre"
                            autocomplete
                            return-object
                            dark )

                v-flex(xs12 md6)
                  v-text-field( label="Documento" v-model="Cliente.NumeroDocumento" :hint="`${Cliente.TipoDocumento || ''}`" persistent-hint readonly )

                v-flex(xs12 md6)
                  v-text-field( label="Ciudad" v-model="Cliente.Ciudad" readonly )

                v-flex(xs12 md6)
                  v-text-field( label="Dirección" v-model="Cliente.Direccion" readonly )

                v-flex(xs12 md6)
                  v-text-field( label="Teléfono" v-model="Cliente.Telefono" readonly )

            v-data-table( v-bind:headers="headers"
                          :items="items"
                          class="elevation-5 grey lighten-1 grey--text text--darken-4" )

              template(slot="items" scope="props")
                td(class="text-xs-center") {{ props.item.Produccion.Cantidad ? props.item.Produccion.Cantidad : props.item.Envase.Capacidad }}
                td(class="text-xs-center" style="border-left: 1px solid #999999") {{ props.item.Produccion.Producto.Nombre ? props.item.Produccion.Producto.Nombre : props.item.Envase.Producto.Nombre }}
                td(class="text-xs-left" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.Envase.Numero : '' }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.FechaFabricacion : '' }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.FechaVencimiento : '' }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.Lote : '' }}
                td(class="text-xs-left" style="border-left: 1px solid #999999") {{ props.item.Envase ? props.item.Envase.Numero : '' }}
                td(class="text-xs-right pl-2 pr-2" style="min-width: 64px; border-left: 1px solid #999999") {{ props.item.Total | currency('$', 0) }}
                td(style="border-left: 1px solid #999999" class="text-xs-center pl-1 pr-1")
                  v-btn( fab
                         dark
                         small
                         error
                         style="width: 16px; height:16px"
                         @click.native="eliminar(props.item)")
                    v-icon(dark) remove

            v-layout(row wrap mt-5)
              v-flex(xs12 md4)
                v-text-field(
                  v-model="NumeroProduccion"
                  label="Buscar Sale"
                  append-icon="search"
                  :append-icon-cb="BuscarProduccion")

                v-select(
                  v-bind:items="ItemsProduccion"
                  v-model="ProduccionActual"
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
                  :append-icon-cb="BuscarEnvase")

                v-select(
                  v-bind:items="ItemsEnvase"
                  v-model="EnvaseActual"
                  label="Envase Entra"
                  item-text="Numero"
                  return-object
                  autocomplete
                  dark )


              v-flex(xs12 md4)
                v-money(label="Total" v-model="TotalActual" maskType="currency")

            v-btn(fab dark class="indigo mt-0" @click.native="agregar")
              v-icon(dark) add

      v-card-actions
        v-spacer
        v-btn( dark primary @click.native="generar" class="mt-0" ) Imprimir
        v-btn( dark warning @click.native="hardReset" class="mt-0" ) Limpiar

</template>

<script>

import VMoney from '~/components/MonetaryInput.vue'

import REMISIONS from '~/queries/Remisions.gql'
import PRODUCCIONS2 from '~/queries/Produccions2.gql'
import PRODUCCIONSBYENVASE from '~/queries/ProduccionsByEnvase.gql'
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
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
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
    ItemsProduccion: [],
    ItemsAllEnvase: [],
    ItemsEnvase: [],
    ProduccionActual: null,
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
    NumeroProduccion: null,
    NombreDocumento: null,

    menu1: false,
    loading: 0
  }),
  apollo: {
    Remisions:{
      query: REMISIONS,
      variables () {
        return {
          Numero: this.Numero
        }
      },
      fetchPolicy: 'network-only',
      loadingKey: "loading",
      update (data) {
        //console.log(data)

        if (data.Remisions.length > 0) {
          this.Fecha = data.Remisions[0].Fecha

          this.ItemsCliente.push(data.Remisions[0].Ente)
          this.Cliente = data.Remisions[0].Ente

          this.items = []
          for (let i=0; i<data.Remisions.length; i++) {
            var tmp = {
              Id: data.Remisions[i].Id,
              Produccion: {
                Id: data.Remisions[i].Produccion ? data.Remisions[i].Produccion.Id : null,
                Cantidad: data.Remisions[i].Produccion ? data.Remisions[i].Produccion.Cantidad : null,
                FechaFabricacion: data.Remisions[i].Produccion ? data.Remisions[i].Produccion.FechaFabricacion : null,
                FechaVencimiento: data.Remisions[i].Produccion ? data.Remisions[i].Produccion.FechaVencimiento : null,
                Lote: data.Remisions[i].Produccion ? data.Remisions[i].Produccion.Lote : null,
                Envase: {
                  Id: data.Remisions[i].Produccion ? data.Remisions[i].Produccion.Envase.Id : null,
                  Numero: data.Remisions[i].Produccion ? data.Remisions[i].Produccion.Envase.Numero : null,
                },
                Producto: {
                  Id: data.Remisions[i].Produccion ? data.Remisions[i].Produccion.Producto.Id : null,
                  Nombre: data.Remisions[i].Produccion ? data.Remisions[i].Produccion.Producto.Nombre : null,
                  UnidadDeMedida: data.Remisions[i].Produccion ? data.Remisions[i].Produccion.Producto.UnidadDeMedida : null
                },
                Despachado: data.Remisions[i].Despachado
              },
              Envase: data.Remisions[i].Envase ? {
                Id: data.Remisions[i].Envase.Id,
                Numero: data.Remisions[i].Envase.Numero,
                Capacidad: data.Remisions[i].Envase.Capacidad,
                Producto: data.Remisions[i].Envase.Producto
              } : {
                Id: null,
                Numero: null,
                Capacidad: null,
                Producto: null
              },
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
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    } else {
      var Roles = JSON.parse(sessionStorage.getItem('x-access-roles'))
      this.$store.commit('security/AddRoles', Roles);
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
          console.log(res.data.Entes.length);
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
          console.log(res.data.Envases.length);
          for (let i=0; i<res.data.Envases.length; i++) {
            var tmp = {
              Id: res.data.Envases[i].Id,
              Numero: res.data.Envases[i].Numero,
              Disponible: res.data.Envases[i].Disponible
            }
            this.ItemsEnvase.push(tmp)
          }
        });
      }
    },
    BuscarProduccion () {
      this.ItemsProduccion = [];
      if(null !== this.NumeroProduccion && this.NumeroProduccion.length >= 2){
        this.$apollo.query({
          query: PRODUCCIONSBYENVASE,
          variables: {
            NumeroEnvase: this.NumeroProduccion
          },
          fetchPolicy: 'network-only',
          loadingKey: 'loading'
        }).then( res => {
          console.log(res.data.ProduccionsByEnvase.length);
          let Produccions = res.data.ProduccionsByEnvase;

          for ( let i=0; i<Produccions.length; i++ ) {
            var tmp = {
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
            tmp.Despachado === 'No' ? this.ItemsProduccion.push(tmp) : null
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
      var tmp = {
        Id: null,
        Produccion: {
          Id: this.ProduccionActual ? this.ProduccionActual.Id : null,
          FechaFabricacion: this.ProduccionActual ? this.ProduccionActual.FechaFabricacion : null,
          FechaVencimiento: this.ProduccionActual ? this.ProduccionActual.FechaVencimiento : null,
          Lote: this.ProduccionActual ? this.ProduccionActual.Lote : null,
          Cantidad: this.ProduccionActual ? this.ProduccionActual.Cantidad : null,
          Envase: {
            Id: this.ProduccionActual ? this.ProduccionActual.Envase.Id : null,
            Numero: this.ProduccionActual ? this.ProduccionActual.Envase.Numero : null,
          },
          Producto: {
            Id: this.ProduccionActual ? this.ProduccionActual.Producto.Id : null,
            Nombre: this.ProduccionActual ? this.ProduccionActual.Producto.Nombre : null,
            UnidadDeMedida: this.ProduccionActual ? this.ProduccionActual.Producto.UnidadDeMedida : null,
          }
        },
        Envase: this.EnvaseActual ? { Id: this.EnvaseActual.Id,  Numero: this.EnvaseActual.Numero } : null,
        Total: this.TotalActual,
        SaveUpdate: 'save'
      }

      //this.items.push(tmp)
      this.guardar(tmp)

      this.ItemsProduccion = this.ItemsProduccion.filter( Item => {
        return tmp.Produccion.Id !== Item.Id
      })

      this.ItemsEnvase = this.ItemsEnvase.filter( Item => {
        return Item.Id !== (tmp.Envase ? tmp.Envase.Id : null);
      })

      this.ProduccionActual = null,
      this.EnvaseActual = null,
      this.TotalActual = null;

    },
    guardar (item) {

      if( //item.Id === null &&
          this.Fecha !== null &&
          this.Cliente.Id !== null
          //item.Produccion.Id !== null &&
          //item.Envase.Id !== null &&
          //item.Total !== null &&
         //item.Total !== ''
      ) {

        const Remision = {
          Numero: this.Numero,
          Fecha: this.Fecha,
          EnteId: this.Cliente.Id,
          ProduccionId: item.Produccion ? item.Produccion.Id : null,
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
            EnvaseId: Remision.EnvaseId,
            Total: Remision.Total
          },
          loadingKey: 'loading',
          refetchQueries: [
            {
              query: REMISIONS,
              variables: {
                Numero: this.Numero
              }
            }
          ]
        });/*.then(() => {
          this.$apollo.queries.Remisions.refetch();
        })*/

        this.UpdateProduccion(item, 'Si');
        item.Produccion.Envase ? this.UpdateEnvase(item.Produccion.Envase, 'Si') : null;
        this.CreateKardexEntra(item);
        this.CreateKardexSale(item);

      }
    },
    eliminar (item) {

      if ( item.Id === null ) {
        for (let i=0; i<this.items.length; i++) {
          if ( item.ProduccionId === this.items[i].ProduccionId ) {
            this.items.splice(i, 1)
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
        ProduccionId: item.Produccion.Id
      }

      if (item.Id !== null) {

        this.$apollo.mutate ({
          mutation: DELETE_REMISION,
          variables: {
            Id: Remision.Id
          },
          loadingKey: 'loading',
          refetchQueries: [
            {
              query: REMISIONS,
              variables: {
                Numero: this.Numero
              }
            }
          ]
        });/*then(() => {
          this.$apollo.queries.Remisions.refetch();
        })*/

        this.UpdateProduccion(item, 'No')
        item.Produccion.Envase ? this.UpdateEnvase(item.Produccion.Envase, 'No') : null;
        this.EliminarKardex(item)

      } else {

        for (let i=0; i<this.items.length; i++) {
          if (item.ProduccionId === this.items[i].ProduccionId) {
            //console.log('Eliminado de cache')
            this.items.splice(i, 1)
          }
        }

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
    CreateKardexSale (item) {
      //console.log(item)
      if(item.Produccion.Id === null){
        return;
      }
      var kardex = {
        Cantidad: item.Produccion.Cantidad,
        ProductoId: item.Produccion.Producto.Id,
        EnvaseId: item.Produccion.Envase.Id,
        FechaElaboracion: item.Produccion.FechaFabricacion,
        Lote: item.Produccion.Lote,
        FechaVencimiento: item.Produccion.FechaVencimiento,
        EnteId: this.Cliente.Id,
        FechaSale: this.Fecha,
        NumeroFacturaSale: this.Numero
      }

      this.$apollo.mutate({
        mutation: CREATE_KARDEX_SALE,
        variables: {
          Cantidad: kardex.Cantidad,
          ProductoId: kardex.ProductoId,
          EnvaseId: kardex.EnvaseId,
          FechaElaboracion: kardex.FechaElaboracion,
          Lote: kardex.Lote,
          FechaVencimiento: kardex.FechaVencimiento,
          EnteId: kardex.EnteId,
          FechaSale: kardex.FechaSale,
          NumeroFacturaSale: kardex.NumeroFacturaSale
        },
        loadingKey: 'loading'
      })
    },
    CreateKardexEntra (item) {
      if(item.Envase === null){
        return
      }
      var kardex = {
        EnvaseId: item.Envase.Id,
        EnteId: this.Cliente.Id,
        FechaEntra: this.Fecha,
        NumeroFacturaEntra: this.Numero
      }

      this.$apollo.mutate({
        mutation: CREATE_KARDEX_ENTRA,
        variables: {
          EnvaseId: kardex.EnvaseId,
          EnteId: kardex.EnteId,
          FechaEntra: kardex.FechaEntra,
          NumeroFacturaEntra: kardex.NumeroFacturaEntra
        },
        loadingKey: 'loading'
      })
    },
    EliminarKardex (item) {
      if(item.Produccion.Id === null){
        return;
      }
      var kardex1 = {
        EnvaseId: item.Produccion.Envase.Id,
        NumeroFacturaSale: this.Numero
      }

      this.$apollo.mutate({
        mutation: DELETE_KARDEX_SALE,
        variables: {
          EnvaseId: kardex1.EnvaseId,
          NumeroFacturaSale: kardex1.NumeroFacturaSale
        },
        loadingKey: 'loading'
      })

      if(!item.Envase)
      {
        return
      }

      if (item.Envase.Id) {

        var kardex2 = {
          EnvaseId: item.Envase.Id,
          NumeroFacturaEntra: this.Numero
        }

        this.$apollo.mutate({
        mutation: DELETE_KARDEX_ENTRA,
        variables: {
          EnvaseId: kardex2.EnvaseId,
          NumeroFacturaEntra: kardex2.NumeroFacturaEntra
        },
        loadingKey: 'loading'
      })
      }
    },
    UpdateProduccion (item, Tipo) {
      if(item.Produccion.Id === null){
        return;
      }

      const Produccion = {
        Id: item.Produccion.Id,
        Cantidad: item.Produccion.Cantidad,
        EnvaseId: item.Produccion.Envase.Id,
        Despachado: Tipo
      }

      this.$apollo.mutate ({
        mutation: UPDATE_ONE_PRODUCCION,
        variables: {
          Id: Produccion.Id,
          Cantidad: Produccion.Cantidad,
          EnvaseId: Produccion.EnvaseId,
          Despachado: Produccion.Despachado
        },
        loadingKey: 'loading',
        refetchQueries: [
          {
            query: PRODUCCIONS2,
            variables: {
              Despachado: 'No'
            }
          }
        ]
      });/*.then(() => {
        this.$apollo.queries.Produccions.refetch();
      });*/
      /*
      var tmp = {
        Buscar: item.Produccion.Envase.Numero,
        Id: item.Produccion.Id,
        Cantidad: item.Produccion.Cantidad,
        FechaFabricacion: item.Produccion.FechaFabricacion,
        FechaVencimiento: item.Produccion.FechaVencimiento,
        Lote: item.Produccion.Lote,
        NumeroEnvase: item.Produccion.Envase.Numero,
        Envase: {
          Id: item.Produccion.Envase.Id,
          Numero: item.Produccion.Envase.Numero
        },
        Producto: {
          Id: item.Produccion.Producto.Id,
          Nombre: item.Produccion.Producto.Nombre,
          UnidadDeMedida: item.Produccion.Producto.UnidadDeMedida
        },
        Despachado: 'No'
      }

      this.ItemsProduccion.push(tmp)

      var tmp = item.Envase ? {
        Id: item.Envase.Id,
        Numero: item.Envase.Numero,
        Disponible: item.Envase.Disponible
      } : null;

      tmp ? this.ItemsEnvase.push(tmp) : null;
      */
    },
    UpdateEnvase (_Envase, Value) {
      if(_Envase.Id === null){
        return;
      }
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
        loadingKey: 'loading',
        refetchQueries: [
          {
            query: ENVASES,
            variables: {
              Disponible: 'Si'
            }
          }
        ]
      });/*.then(() => {
        this.$apollo.queries.Envases.refetch();
      })*/

    },
    FiltrarEnvases () {
      for (let i=0; i<this.ItemsProduccion.length; i++){
        let tmpId = this.ItemsProduccion[i].Envase.Id
        this.ItemsEnvase = this.ItemsEnvase.filter(function (item) {
          return tmpId != item.Id;
        });
      }
    },
  },
  components: {
    VMoney
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
