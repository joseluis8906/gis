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
  
  v-flex( xs12 md8 lg6 )
    v-card
      v-card-text
        v-layout( row wrap )
          v-flex( xs12 mt-3 )
            h5(class="grey--text text--lighten-4") Producción
            
          v-flex( xs12 )
            
            v-text-field( label="Orden Nº" v-model="Orden" dark )
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu5"
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
                           dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar
            
            v-text-field( label="Turno" v-model="Turno" dark )
            
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
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar
            
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
                             dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark warning @click.native="Fecha=null" ) Limpiar
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu3"
                    transition="scale-transition"
                    offset-y
                    :nudge-left="40" )
                    
              v-text-field( slot="activator"
                            label="Hora Inicial"
                            v-model="HoraInicial"
                            readonly )
          
              v-time-picker(v-model="HoraInicial" autosave)
              
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu4"
                    transition="scale-transition"
                    offset-y
                    :nudge-left="40" )
                    
              v-text-field( slot="activator"
                            label="Hora Final"
                            v-model="HoraFinal"
                            readonly )
          
              v-time-picker(v-model="HoraFinal" autosave)
            
            
            v-text-field( label="Lote" v-model="Lote" dark readonly )
            
            v-select( v-bind:items="ItemsProducto"
                      v-model="Producto"
                      label="Producto"
                      item-text="Nombre"
                      item-value="Id"
                      return-object
                      autocomplete
                      :disabled="!ChangeProducto"
                      dark )
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu6"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Fabricacion"
                            v-model="FechaFabricacion"
                            readonly )
              
              v-date-picker( :months="months"
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
            
            v-menu( lazy
                    :close-on-content-click="true"
                    v-model="menu7"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Vencimiento"
                            v-model="FechaVencimiento"
                            readonly )
              
              v-date-picker( :months="months"
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
            
            v-text-field( label="Pureza Final (%)" v-model="PurezaFinal" dark )
            
            v-text-field( label="Presion Final (psi)" v-model="PresionFinal" dark )
            
            v-text-field( label="Observacion" v-model="Observacion" multi-line dark )
            
            h6(class="grey--text text--lighten-4") Descripción
            
            v-select( v-bind:items="ItemsEnvase"
                      v-model="EnvaseActual"
                      label="Envase"
                      item-text="Numero"
                      item-value="Id"
                      return-object
                      autocomplete
                      :hint="`Capacidad: ${EnvaseActual.Capacidad || ''} ${EnvaseActual.UnidadDeMedida || ''}`"
                      persistent-hint
                      dark )
            
            v-text-field( :label="`Cantidad ${EnvaseActual.UnidadDeMedida || ''}`" v-model="EnvaseActual.Cantidad" dark )
            
            v-btn(fab dark class="indigo mb-5" @click.native="agregar")
              v-icon(dark) add
            
            v-data-table( v-bind:headers="headers"
                          v-bind:items="items"
                          class="elevation-5 grey lighten-1 grey--text text--darken-4" )
              
              template(slot="items" scope="props")
                td( class="text-xs-center " ) {{ props.item.UnidadDeMedida }}
                td( class="text-xs-center" 
                    style="border-left: 1px solid #999999" ) {{ props.item.Capacidad }}
                td( style="border-left: 1px solid #999999" ) {{ props.item.Numero}}
                td( class="text-xs-right " 
                    style="border-left: 1px solid #999999"
                    ) {{ props.item.Cantidad }}
                td( style="border-left: 1px solid #999999" class="pt-0 pb-0")
                  v-select( v-bind:items="ItemsCliente"
                      v-model="Cliente"
                      item-value="Id"
                      item-text="Nombre"
                      autocomplete
                      return-object
                      @click.native="ResetCliente()"
                      light
                      class="input-tab mb-0 mt-0 pb-0"
                      style="width: 148px" )
                td(style="width:24px; border-left: 1px solid #999999")
                  v-btn( fab
                         dark
                         small
                         error
                         style="width: 24px; height:24px"
                         @click.native="eliminar(props.item)")
                    v-icon(dark) remove
      v-card-actions
        v-spacer
        v-btn( dark warning @click.native="hardReset" ) Limpiar
</template>

<script>

import ENVASES from '~/queries/Envases.gql'
import PRODUCCIONS from '~/queries/Produccions.gql'
import CREATE_PRODUCCION from '~/queries/CreateProduccion.gql'
import UPDATE_ONE_PRODUCCION from '~/queries/UpdateOneProduccion.gql'
import DELETE_PRODUCCION from '~/queries/DeleteProduccion.gql'
import PRODUCTOS from '~/queries/Productos.gql'
import ENTES from '~/queries/Entes.gql'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    Orden: null,
    Turno: null,
    Fecha: null,
    Lote: '01',
    FechaInicial: null,
    FechaFinal: null,
    HoraInicial: null,
    HoraFinal: null,
    FechaFabricacion: null,
    FechaVencimiento: null,
    Producto: {Id: null, Nombre: null},
    PurezaFinal: null,
    PresionFinal: null,
    Observacion: null,
    
    ChangeProducto: true,
    ChangeProductoCounter: 0,
    headers: [
      { text: 'U. de Medida', align: 'center', sortable: false,  value: 'U. de Medida' },
      { text: 'Capacidad', align: 'center', sortable: false,  value: 'Capacidad' },
      { text: 'Envase', align: 'left', sortable: true,  value: 'Numero' },
      { text: 'Cantidad', align: 'center', sortable: false,  value: 'Cantidad' },
      { text: 'Cliente', align: 'center', sortable: false,  value: 'Cliente' },
      { text: 'Eliminar', align: 'center', sortable: false,  value: 'Eliminar' }
    ],
    items: [],
    pagination: {
      sortBy: 'Numero'
    },
    ItemsProducto: [], 
    ItemsAllEnvase: [],
    ItemsEnvase: [],
    ItemsCliente: [],
    EnvaseActual: {
      Numero: null, 
      Cantidad: null, 
      Capacidad: null, 
      UnidadDeMedida: null, 
      Cliente: {Nombre: '', NumeroDocumento: '', Id: -1}  
    },
    Conjunto: new Set(),
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
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,
    menu7: false,
    loading: 0
  }),
  apollo: {
    Envases: {
      query: ENVASES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        if (data.Envases) {
          this.ItemsAllEnvase = []
          for (let i=0; i<data.Envases.length; i++) {
            var tmp = {}
            tmp.Id = data.Envases[i].Id
            tmp.Numero = data.Envases[i].Numero
            tmp.Capacidad = data.Envases[i].Capacidad
            tmp.UnidadDeMedida = data.Envases[i].Producto.UnidadDeMedida
            tmp.ProductoId = data.Envases[i].Producto.Id
            tmp.Cantidad = null
            this.ItemsAllEnvase.push(tmp)
          }
        }
      }
    },
    Produccions: {
      query: PRODUCCIONS,
      variables () {
        return {
          Orden: this.Orden !== null ? this.Orden : '',
        }
      },
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        if (data.Produccions.length > 0) {
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
          this.items = []
          for (let i=0; i<data.Produccions.length; i++) {
            var tmp = {}
            tmp.Id = data.Produccions[i].EnvaseId
            tmp.Numero = data.Produccions[i].Envase.Numero
            tmp.Capacidad = data.Produccions[i].Envase.Capacidad
            tmp.Cantidad = data.Produccions[i].Cantidad
            tmp.UnidadDeMedida = data.Produccions[i].Producto.UnidadDeMedida
            for (let j=0; j<this.ItemsAllEnvase.length; j++) {
              if ( data.Produccions[i].Envase.Id === this.ItemsAllEnvase[j].Id ) {
                this.ItemsAllEnvase[j].Cantidad = data.Produccions[i].Cantidad
                this.Conjunto.add(this.ItemsAllEnvase[j])
                this.items = Array.from(this.Conjunto)
              }
            }
            for (let k=0; k<this.ItemsCliente.length; k++) {
              if ( data.Produccions[i].Cliente.Id == this.ItemsCliente )
            }
          }
          
        } else {
          this.reset ()
        }
      }
    },
    Productos: {
      query: PRODUCTOS,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsProducto = data.Productos
      }
    },
    Entes: {
      query: ENTES,
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.ItemsCliente = data.Entes
      }
    }
  },
  watch: {
    EnvaseActual: {
      handler: function () {
        this.controlCantidad ()
      },
      deep: true
    },
    Producto: {
      handler: function () {
        this.filtrarEnvases ()
      },
      deep: true
    }
  },
  methods: {
    agregar () {
      if (this.EnvaseActual.Cantidad !== '' && this.EnvaseActual.Capacidad !== '') {
        if (this.EnvaseActual.Capacidad >= Number(this.EnvaseActual.Cantidad)) {
          if (!this.Conjunto.has(this.EnvaseActual)) {
            this.Conjunto.add(this.EnvaseActual)
            this.items = Array.from(this.Conjunto)
            
            const Produccion = {
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
              Cantidad: this.EnvaseActual.Cantidad,
              ProductoId: this.Producto.Id,
              EnvaseId: this.EnvaseActual.Id,
              ClienteId: this.Cliente.Id,
              PurezaFinal: this.PurezaFinal,
              PresionFinal: this.PresionFinal,
              Observacion: this.Observacion
            }
            
            this.$apollo.mutate ({
              mutation: CREATE_PRODUCCION,
              variables: {
                Orden: Produccion.Orden,
                Turno: Produccion.Turno,
                Fecha: Produccion.Fecha,
                Lote: Produccion.Lote,
                FechaInicial: Produccion.FechaInicial,
                FechaFinal: Produccion.FechaFinal,
                HoraInicial: Produccion.HoraInicial,
                HoraFinal: Produccion.HoraFinal,
                FechaFabricacion: Produccion.FechaFabricacion,
                FechaVencimiento: Produccion.FechaVencimiento,
                Cantidad: Produccion.Cantidad,
                ProductoId: Produccion.ProductoId,
                EnvaseId: Produccion.EnvaseId,
                ClienteId: Produccion.ClienteId,
                PurezaFinal: Produccion.PurezaFinal,
                PresionFinal: Produccion.PresionFinal,
                Observacion: Produccion.Observacion
              },
              loadingKey: 'loading',
              update (store, {data: res}) {
                //console.log ('guardar')
                //console.log ({store: store, res: res})
                
                try{
                  const data = store.readQuery({
                    query: PRODUCCIONS,
                    variables: {
                      Orden: Produccion.Orden,
                    }
                  })
                  
                  data.Produccions.push(res.CreateProduccion)
                  
                  store.writeQuery({
                    query: PRODUCCIONS,
                    variables: {
                      Orden: Produccion.Orden,
                    },
                    data
                  })
                  
                } catch (Err) {
                  
                  data.Produccions = []
                  
                  data.Produccions.push(res.CreateProduccion)
                  
                  store.writeQuery({
                    query: PRODUCCIONS,
                    data: data
                  })
                  
                }
                
              }
            })
            
          } else {
          
            const Produccion = {
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
              Cantidad: this.EnvaseActual.Cantidad,
              ProductoId: this.Producto.Id,
              EnvaseId: this.EnvaseActual.Id,
              ClienteId: this.Cliente.Id,
              PurezaFinal: this.PurezaFinal,
              PresionFinal: this.PresionFinal,
              Observacion: this.Observacion
            }
            
            this.$apollo.mutate ({
              mutation: UPDATE_ONE_PRODUCCION,
              variables: {
                Orden: Produccion.Orden,
                Turno: Produccion.Turno,
                Fecha: Produccion.Fecha,
                Lote: Produccion.Lote,
                FechaInicial: Produccion.FechaInicial,
                FechaFinal: Produccion.FechaFinal,
                HoraInicial: Produccion.HoraInicial,
                HoraFinal: Produccion.HoraFinal,
                FechaFabricacion: Produccion.FechaFabricacion,
                FechaVencimiento: Produccion.FechaVencimiento,
                Cantidad: Produccion.Cantidad,
                ProductoId: Produccion.ProductoId,
                EnvaseId: Produccion.EnvaseId,
                ClienteId: Produccion.ClienteId,
                PurezaFinal: Produccion.PurezaFinal,
                PresionFinal: Produccion.PresionFinal,
                Observacion: Produccion.Observacion
              },
              loadingKey: 'loading',
              update (store, {data: res}) {
                //console.log('actualizar')
                //console.log ({store: store, res: res})
                
                try{
                  const data = store.readQuery({
                    query: PRODUCCIONS,
                    variables: {
                      Orden: Produccion.Orden,
                    }
                  })
                  
                  for (let i=0; i<data.Produccions.length; i++) {
                    if (data.Produccions[i].EnvaseId === res.UpdateOneProduccion.EnvaseId) {
                      data.Produccions[i] = res.UpdateOneProduccion
                    }
                  }
                  
                  store.writeQuery({
                    query: PRODUCCIONS,
                    variables: {
                      Orden: Produccion.Orden,
                    },
                    data
                  })
                  
                } catch (Err) {
                  
                  data.Produccions = []
                  
                  data.Produccions.push(res.UpdateProduccion)
                  
                  store.writeQuery({
                    query: PRODUCCIONS,
                    data: data
                  })
                  
                }
                
              }
              
            })
            
          }
          
          this.EnvaseActual = {Cantidad: '', Capacidad: ''}
        }
      }
    },
    controlCantidad () {
      if (Number(this.EnvaseActual.Cantidad) >= this.EnvaseActual.Capacidad) {
        this.EnvaseActual.Cantidad = this.EnvaseActual.Capacidad
      }
    },
    eliminar (item) {
      this.Conjunto.delete(item)
      this.items = Array.from(this.Conjunto)
      
      const Produccion = {
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
        Cantidad: item.Cantidad,
        ProductoId: this.Producto.Id,
        EnvaseId: item.Id,
        ClienteId: item.
        PurezaFinal: this.PurezaFinal,
        PresionFinal: this.PresionFinal,
        Observacion: this.Observacion
      }
      
      this.$apollo.mutate ({
        mutation: DELETE_PRODUCCION,
        variables: {
          Orden: Produccion.Orden,
          Turno: Produccion.Turno,
          Fecha: Produccion.Fecha,
          Lote: Produccion.Lote,
          FechaInicial: Produccion.FechaInicial,
          FechaFinal: Produccion.FechaFinal,
          HoraInicial: Produccion.HoraInicial,
          HoraFinal: Produccion.HoraFinal,
          FechaFabricacion: Produccion.FechaFabricacion,
          FechaVencimiento: Produccion.FechaVencimiento,
          Cantidad: Produccion.Cantidad,
          ProductoId: Produccion.ProductoId,
          EnvaseId: Produccion.EnvaseId,
          PurezaFinal: Produccion.PurezaFinal,
          PresionFinal: Produccion.PresionFinal,
          Observacion: Produccion.Observacion
        },
        loadingKey: 'loading',
        update (store, {data: res}) {
          //console.log ({store: store, res: res})
          
          try{
            const data = store.readQuery({
              query: PRODUCCIONS,
              variables: {
                Orden: Produccion.Orden
              }
            })
            
            for (let i=0; i<data.Produccions.length; i++) {
              if (data.Produccions[i].EnvaseId === res.DeleteProduccion.EnvaseId) {
                data.Produccions.splice(i, 1)
              }
            }
            
            store.writeQuery({
              query: PRODUCCIONS,
              variables: {
                Orden: Produccion.Orden
              },
              data
            })
            
          } catch (Err) {
            //console.log("`Error controlado: ${Err}`")
          }
          
        }
      })
      
      for (let j=0; j<this.ItemsEnvase.length; j++) {
        if ( this.ItemsEnvase[j].Id === item.Id ) {
          this.ItemsEnvase[j].Cantidad = null
        }
      }
      
      this.EnvaseActual = {Id: null, Numero: null, Cantidad: null, Capacidad: null, UnidadDeMedida: null}
    },
    reset () {
      this.ChangeProducto=true
      this.Fecha = null,
      this.Turno = null,
      this.Lote = '01',
      this.FechaInicial = null,
      this.FechaFinal = null,
      this.HoraInicial = null,
      this.HoraFinal = null,
      this.FechaFabricacion = null,
      this.FechaVencimiento = null,
      this.Producto = {Id: null, Nombre: null},
      this.PurezaFinal = null,
      this.PresionFinal = null,
      this.Observacion = null,
      this.EnvaseActual = {Cantidad: null, Capacidad: null, UnidadDeMedida: null}
      for (let j=0; j<this.ItemsEnvase.length; j++) {
        this.ItemsEnvase[j].Cantidad = null
      }
      this.ItemsEnvase = []
      this.Conjunto.clear ()
      this.items = Array.from(this.Conjunto)
      this.ChangeProductoCounter=0
    },
    hardReset () {
      this.Orden = null
      this.reset ()
    },
    filtrarEnvases () {
      this.ChangeProductoCounter++
      if( this.ChangeProductoCounter === 2 ) {
        this.ChangeProducto=false
        this.ItemsEnvase = []
        for (let i=0; i<this.ItemsAllEnvase.length; i++) {
          if ( this.Producto.Id === this.ItemsAllEnvase[i].ProductoId ) {
            this.ItemsEnvase.push(this.ItemsAllEnvase[i])
          }
        }
      }
    },
    ResetCliente () {
      this.Cliente = {Nombre: null, NumeroDocumento: null, Id: null}
    }
  }
};

</script>

<style lang="stylus" scoped>

.alert-especial
  position absolute
  
.input-group--select
  height: 31px
  
</style>
