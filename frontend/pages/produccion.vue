<template lang="pug">
v-layout( align-center justify-center )
  v-dialog( persistent v-model="loading" )
    v-card
      v-card-title( class="headline text-xs-center" ) Cargando
        v-icon autorenew
  
  v-flex( xs12 md8 lg6 )
    v-card
      v-card-text
        v-layout( row wrap )
          v-flex( xs12 mt-3 )
            p Información de Producción
            
          v-flex( xs12 )
            
            v-menu( lazy
                    :close-on-content-click="false"
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
              
              v-date-picker( v-model="Fecha" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-text-field( label="Lote" v-model="Lote" dark )
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu2"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Fabricacion"
                            v-model="FechaFabricacion"
                            readonly )
              
              v-date-picker( v-model="FechaFabricacion" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu3"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Vencimiento"
                            v-model="FechaVencimiento"
                            readonly )
              
              v-date-picker( v-model="FechaVencimiento" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-text-field( label="Cantidad (m³)" v-model="Cantidad" dark )
            
            v-text-field( label="Pureza Final (%)" v-model="PurezaFinal" dark )
            
            v-text-field( label="Presion Final (psi)" v-model="PresionFinal" dark )
            
            h5(class="grey--text text--lighten-4") Descripción
            
            v-text-field( label="Producto" v-model="Producto" dark )
            
            v-select( v-bind:items="ItemsEnvases"
                      v-model="EnvaseActual"
                      label="Envase"
                      item-text="NumeroInterno"
                      item-value="Id"
                      return-object
                      autocomplete
                      dark )
            
            v-btn(fab dark class="indigo mb-5" @click.native="agregar")
              v-icon(dark) add
            
            v-data-table( v-bind:headers="headers"
                          v-bind:items="items"
                          class="elevation-5" )
              
              template(slot="headers" scope="props")
                tr
                  th( v-for="header in props.headers"
                      :key="header.text"
                      :class="['column sortable',\
                                pagination.descending ? 'desc' : 'asc', \
                                header.value === pagination.sortBy ? 'active' : '', \
                                header.align === 'center' ? 'text-xs-center' : 'text-xs-left']" 
                      class="grey--text text--lighten-4"
                      @click="changeSort(header.value)") {{ header.text }}
              
              template(slot="items" scope="props" light)
                td {{ props.item.NumeroInterno }}
                td(class="text-xs-right " style="border-left: 1px solid #333333") {{ props.item.Capacidad }}
            
      v-card-actions
        v-spacer
        v-btn( dark ) Cancelar
        v-btn( dark primary @click.native="recargar" ) Guardar
        
</template>

<script>

import ENVASES from '~/queries/Envases.gql'

export default {
  data: () => ({
    Fecha: '',
    Lote: '',
    FechaFabricacion: '',
    FechaVencimiento: '',
    Cantidad: '',
    Producto: '',
    PurezaFinal: '',
    PresionFinal: '',
    headers: [
      { text: 'Envase', align: 'left', sortable: true,  value: 'NumeroInterno' },
      { text: 'Capacidad (m³)', align: 'center', sortable: false,  value: 'Capacidad' }
    ],
    items: [],
    pagination: {
      sortBy: 'NumeroInterno'
    },
    ItemsEnvases: [
    ],
    EnvaseActual: {},
    Conjunto: new Set(),
    ConjuntoTracer: 1,
    
    menu1: false,
    menu2: false,
    menu3: false,
    loading: 0,
    q: 0
  }),
  apollo: {
    Envases: {
      query: ENVASES,
      loadingKey: 'loading',
      update (data) {
        this.ItemsEnvases = data.Envases ? data.Envases : []
      }
    }
  },
  computed: {
    items () {
      return this.ConjuntoTracer && Array.from(this.Conjunto)
    }
  },
  methods: {
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    agregar () {
      this.Conjunto.add(this.EnvaseActual)
      this.ConjuntoTracer += 1
      console.log(this.Conjunto)
      
    }
  }
};

</script>

<style lang="stylus">
.alert-especial
  position absolute


table.table tbody tr:hover
  color black
    
</style>
