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
                td(class="text-xs-center") {{ props.item.Produccion ? props.item.Produccion.Cantidad : '0' }}
                td(class="text-xs-center" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.Producto.Nombre : '' }}
                td(class="text-xs-left" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.Envase.Numero : '' }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.FechaFabricacion : '' }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccion ? props.item.Produccion.FechaVencimiento : '' }}
                td(class="text-xs-right" style="border-left: 1px solid #999999") {{ props.item.Produccionv ? props.item.Produccion.Lote : '' }}
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
                v-select( v-bind:items="ItemsProduccion"
                          v-model="ProduccionActual"
                          label="Sale"
                          item-text="Buscar"
                          return-object
                          autocomplete
                          dark )

              v-flex(xs12 md4)
                v-select( v-bind:items="ItemsEnvase"
                          v-model="EnvaseActual"
                          label="Entra"
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
import PRODUCCIONS from '~/queries/Produccions.gql'
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
    Numero: '',
    Fecha: '',
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

    menu1: false,
    loading: 0,

  }),
  apollo: {
    Remisions:{
      query: REMISIONS,
      variables () {
        return {
          Numero: this.Numero
        }
      },
      loadingKey: "loading",
      update (data) {
        //console.log(data)

        if (data.Remisions.length > 0) {
          this.Fecha = data.Remisions[0].Fecha
          for(let i=0; i<this.ItemsCliente.length; i++){
            if(data.Remisions[0].Ente.Id === this.ItemsCliente[i].Id){
              this.Cliente = this.ItemsCliente[i];
              break;
            }

          }

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
              Envase: data.Remisions[i].Envase ? { Id: data.Remisions[i].Envase.Id,  Numero: data.Remisions[i].Envase.Numero } : null,
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
    /*OneEnte: {
      query: ONE_ENTE,
      variables () {
        return {
          TipoDocumento: this.Cliente.TipoDocumento ? this.Cliente.TipoDocumento : '',
          NumeroDocumento: this.Cliente.NumeroDocumento ? this.Cliente.NumeroDocumento : ''
        }
      },
      loadingKey: 'loading',
      update (data) {
        this.Cliente.Id = data.OneEnte ? data.OneEnte.Id : null
        this.Cliente.Nombre = data.OneEnte ? data.OneEnte.Nombre : null
        this.Cliente.Ciudad = data.OneEnte ? data.OneEnte.Ciudad : null
        this.Cliente.Direccion = data.OneEnte ? data.OneEnte.Direccion : null
        this.Cliente.Telefono = data.OneEnte ? data.OneEnte.Telefono : null
      }
    },*/
    Produccions: {
      query: PRODUCCIONS,
      variables () {
        //console.log(this.Cliente)
        return {
          Despachado: 'No',
        }
      },
      loadingKey: 'loading',
      update (data) {

        if (data.Produccions.length > 0) {
          for ( let i=0; i<data.Produccions.length; i++ ) {

            var tmp = {
              Buscar: data.Produccions[i].Envase.Numero,
              Id: data.Produccions[i].Id,
              Cantidad: data.Produccions[i].Cantidad,
              FechaFabricacion: data.Produccions[i].FechaFabricacion,
              FechaVencimiento: data.Produccions[i].FechaVencimiento,
              Lote: data.Produccions[i].Lote,
              NumeroEnvase: data.Produccions[i].Envase.Numero,
              Envase: {
                Id: data.Produccions[i].Envase.Id,
                Numero: data.Produccions[i].Envase.Numero
              },
              Producto: {
                Id: data.Produccions[i].Producto.Id,
                Nombre: data.Produccions[i].Producto.Nombre,
                UnidadDeMedida: data.Produccions[i].Producto.UnidadDeMedida
              },
              Despachado: data.Produccions[i].Despachado
            }

            tmp.Despachado === 'No' ? this.ItemsProduccion.push(tmp) : null

          }

          this.FiltrarEnvases();

        } else {

          this.ItemsProduccion = [];

        }
      }
    },
    Envases: {
      query: ENVASES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsEnvase = []
        if (data.Envases.length>0) {
          for (let i=0; i<data.Envases.length; i++) {
            var tmp = {
              Id: data.Envases[i].Id,
              Numero: data.Envases[i].Numero,
              Disponible: data.Envases[i].Disponible
            }

            tmp.Disponible === 'Si' ? this.ItemsEnvase.push(tmp) : null
          }
        }
      }
    },
    Entes: {
      query: ENTES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        if (data.Entes) {
          this.ItemsCliente = data.Entes
        }
      }
    }
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

      //console.log(item);
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
          update (store, {data: res}) {

            try{
              var data = store.readQuery({
                query: REMISIONS,
                variables: {
                  Numero: Remision.Numero
                }
              })

              data.Remisions.push(res.CreateRemision)

              store.writeQuery({
                query: REMISIONS,
                variables: {
                  Numero: Remision.Numero
                },
                data
              })

            } catch (Err) {
              console.log(Err)
            }

          }
        })

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
          update (store, {data: res}) {

            try{
              var data = store.readQuery({
                query: REMISIONS,
                variables: {
                  Numero: Remision.Numero,
                }
              })


              for (let i=0; i<data.Remisions.length; i++) {
                if (data.Remisions[i].ProduccionId === Remision.ProduccionId) {
                  //console.log('Eliminado de cache')
                  data.Remisions.splice(i, 1)
                }
              }

              store.writeQuery({
                query: REMISIONS,
                variables: {
                  Numero: Remision.Numero,
                },
                data
              })

            } catch (Err) {
              console.log(Err)
            }

          }
        })

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
        loadingKey: 'loading',
        update (store, {data: res}) {
          //console.log(res)
        }
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
        loadingKey: 'loading',
        update (store, {data: res}) {
          //console.log(res)
        }
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
        loadingKey: 'loading',
        update (store, {data: res}) {
          //console.log(res)
        }
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
        loadingKey: 'loading',
        update (store, {data: res}) {
          //console.log(res)
        }
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
        update (store, {data: res}) {

          try{

            var data = store.readQuery({
              query: PRODUCCIONS,
              variables: {
                Orden: res.UpdateOneProduccion.Orden,
              }
            })


            for (let i=0; i<data.Produccions.length; i++) {
              if (data.Produccions[i].Id === res.UpdateOneProduccion.Id) {
                data.Produccions[i].Despachado = res.UpdateOneProduccion.Despachado
              }
            }

            store.writeQuery({
              query: PRODUCCIONS,
              variables: {
                Orden: res.UpdateOneProduccion.Orden,
              },
              data: data
            })

          } catch (Err) {
            //console.log(Err)
          }

        }
      })

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

      tmp = item.Envase ? {
        Id: item.Envase.Id,
        Numero: item.Envase.Numero,
        Disponible: item.Envase.Disponible
      } : null;

      tmp ? this.ItemsEnvase.push(tmp) : null;

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
        update: (store, { data: res }) => {
          //console.log(res, 'linea 463');

          try {

            data = store.readQuery({
              query: ENVASES
            })

            for (let i=0; i<data.Envases.length; i++) {
              if (data.Envases[i].Id === res.UpdateEnvase.Id) {
                data.Envases[i] = res.UpdateEnvase
              }
            }

            store.writeQuery({
              query: ENVASES,
              data
            })

          } catch (Err) {

            console.log(Err)

          }

          /*for (let i=0; i<this.ItemsAllEnvase.length; i++){
            if(res.UpdateEnvase.Id === this.ItemsAllEnvase[i].Id){
              this.ItemsAllEnvase[i].Disponible = res.UpdateEnvase.Disponible;
            }
          }*/
          this.FiltrarEnvases()

        }
      })

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
