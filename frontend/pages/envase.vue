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
            p Hoja de Vida del Envase
            
          v-flex( xs12 )
            
            v-text-field( label="Número" v-model="Numero" dark )
            
            v-text-field( label="Número Interno" v-model="NumeroInterno" dark )
            
            v-select( v-bind:items="ItemsEstado"
                      v-model="Estado"
                      label="Estado"
                      class="input-group--focused"
                      item-value="text"
                      dark )
                      
            v-select( v-bind:items="ItemsPropietario"
                      v-model="Propietario"
                      label="Propietario"
                      class="input-group--focused"
                      item-value="text"
                      dark )
            
            v-text-field( label="Material" v-model="Material" dark )
            
            v-text-field( label="Capacidad" v-model="Capacidad" dark )
            
            v-select( v-bind:items="ItemsClaseProducto"
                      v-model="ClaseProducto"
                      label="Clase de Producto"
                      class="input-group--focused"
                      item-value="text"
                      dark )
                      
            v-text-field( label="Presión" v-model="Presion" dark )
            
            v-text-field( label="Altura con Valvula" v-model="AlturaConValvula" dark )
            
            v-text-field( label="Peso con Valvula" v-model="PesoConValvula" dark )
            
            v-text-field( label="Válvula" v-model="Valvula" dark )
            
            v-select( v-bind:items="ItemsTipoValvula"
                      v-model="TipoValvula"
                      label="Clase de Producto"
                      class="input-group--focused"
                      item-value="text"
                      dark )
                      
            v-text-field( label="Acabado y Color" v-model="AcabadoColor" dark )
            
            v-text-field( label="Norma Técnica de Fabricación" v-model="NormaTecnicaFabricacion" dark )
            
            v-text-field( label="Proveedor" v-model="Proveedor" dark )
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu1"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Compra"
                            v-model="FechaCompra"
                            prepend-icon="event"
                            readonly )
              
              v-date-picker( v-model="FechaCompra" no-title scrollable actions )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
                    
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu2"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
            
              v-text-field( slot="activator"
                            label="Garantía"
                            v-model="Garantia"
                            prepend-icon="event"
                            readonly )
              
              v-date-picker( v-model="Garantia" no-title scrollable actions )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
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
                            label="Fecha de Fabricación"
                            v-model="FechaFabricacion"
                            prepend-icon="event"
                            readonly )
              
              v-date-picker( v-model="FechaFabricacion" no-title scrollable actions )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu4"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Prueba Hidrostática"
                            v-model="PruebaHidrostatica"
                            prepend-icon="event"
                            readonly )
              
              v-date-picker( v-model="PruebaHidrostatica" no-title scrollable actions )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-select( v-bind:items="ItemsEquipoAlquilado"
                      v-model="EquipoAlquilado"
                      label="Equipo Alquilado"
                      class="input-group--focused"
                      item-value="text"
                      dark )
            
            v-menu( lazy
                    :close-on-content-click="false"
                    v-model="menu5"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px" )
          
              v-text-field( slot="activator"
                            label="Fecha de Alquiler"
                            v-model="FechaAlquiler"
                            prepend-icon="event"
                            readonly )
              
              v-date-picker( v-model="FechaAlquiler" no-title scrollable actions )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( primary dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-text-field( label="Observaciones" v-model="Observaciones" multi-line dark )
            
      v-card-actions
        v-spacer
        v-btn( dark ) Cancelar
        v-btn( dark primary @click.native="recargar" ) Guardar
        
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => ({
    Estado: '',
    Propietario: '',
    Material: '',
    Capacidad: '',
    Numero: '',
    NumeroInterno: '',
    Presion: '',
    AlturaConValvula: '',
    PesoConValvula: '',
    Valvula: '',
    TipoValvula: '',
    AcabadoColor: '',
    NormaTecnicaFabricacion: '',
    Proveedor: '',
    FechaCompra: '',
    Garantia: '',
    FechaFabricacion: '',
    PruebaHidrostatica: '',
    EquipoAlquilado: '',
    FechaAlquiler: '',
    Observaciones: '',
    
    ItemsEstado: [
      {text: 'Nuevo'},
      {text: 'En Uso'},
    ],
    ItemsPropietario: [],
    ItemsClaseProducto: [
      {text: 'Oxígeno Medicinal'},
      {text: 'Oxígeno Industrial'},
      {text: 'Argón'},
      {text: 'Acetileno'},
      {text: 'Dióxido de Carbóno'},
      {text: 'Helio'},
      {text: 'Nitrógeno'},
      {text: 'Aire Seco'}
    ],
    ItemsTipoValvula: [
      {text: 'Tipo1'},
      {text: 'Tipo2'},
      {text: 'Tipo3'}
    ],
    ItemsEquipoAlquilado: [
      {text: 'Si'},
      {text: 'No'}
    ],
    loading: 0,
    q: 0
  }),
  apollo: {
    Posts: {
      query: gql`
      query OnePost($Id: Int!) {
        Posts(PersonId: $Id) {
          Title
          Content 
        }
      }`,
      variables() {
        return {
          Id: this.q==='' ? 0 : this.q,
        }
      },
      loadingKey: 'loading'
    }
  },
  methods: {
    recargar() {
      console.log("si");
      
    }
  }
};

</script>

<style lang="stylus">
  .alert-especial
    position absolute
    
</style>
