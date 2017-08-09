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
            
            v-text-field( label="Número Interno" v-model="NumeroInterno" dark )
            
            v-select( v-bind:items="ItemsEstado"
                      v-model="Estado"
                      label="Estado"
                      item-value="text"
                      autocomplete
                      dark )
                      
            v-select( v-bind:items="ItemsPropietario"
                      v-model="Propietario"
                      label="Propietario"
                      item-value="Id"
                      item-text="Nombre"
                      autocomplete
                      return-object
                      :hint="`Nit/C.C: ${Propietario.NumeroDocumento}`"
                      persistent-hint
                      @click.native="ResetPropietario()"
                      dark )
            
            v-text-field( label="Material" v-model="Material" dark )
            
            v-text-field( label="Capacidad (m^3)" v-model="Capacidad" dark )
            
            v-select( v-bind:items="ItemsClaseProducto"
                      v-model="ClaseProducto"
                      label="Clase de Producto"
                      item-value="text"
                      autocomplete
                      dark )
            
            v-text-field( label="Número" v-model="Numero" dark )
            
            v-text-field( label="Presión (psi)" v-model="Presion" dark )
            
            v-text-field( label="Altura con Valvula (mts)" v-model="AlturaConValvula" dark )
            
            v-text-field( label="Peso con Valvula (kgr)" v-model="PesoConValvula" dark )
            
            v-select( v-bind:items="ItemsValvula"
                      v-model="Valvula"
                      label="Válvula"
                      item-value="text"
                      autocomplete
                      dark )
            
            v-select( v-bind:items="ItemsTipoValvula"
                      v-model="TipoValvula"
                      label="Tipo de Válvula"
                      item-value="text"
                      autocomplete
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
                            readonly )
              
              v-date-picker( v-model="FechaCompra" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark @click.native="cancel()" ) Cancel
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
                            readonly )
              
              v-date-picker( v-model="Garantia" no-title scrollable actions dark )
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
                            label="Fecha de Fabricación"
                            v-model="FechaFabricacion"
                            readonly )
              
              v-date-picker( v-model="FechaFabricacion" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark @click.native="cancel()" ) Cancel
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
                            readonly )
              
              v-date-picker( v-model="PruebaHidrostatica" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-select( v-bind:items="ItemsEquipoAlquilado"
                      v-model="EquipoAlquilado"
                      label="Equipo Alquilado"
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
                            readonly )
              
              v-date-picker( v-model="FechaAlquiler" no-title scrollable actions dark )
                template( scope="{ save, cancel }" )
                  v-card-actions
                    v-btn( dark @click.native="cancel()" ) Cancel
                    v-btn( primary dark @click.native="save()" ) Save
            
            v-text-field( label="Observaciones" v-model="Observaciones" multi-line dark )
            
      v-card-actions
        v-spacer
        v-btn( dark @click.native="Reset" ) Cancelar
        v-btn( dark primary @click.native="CreateOrUpdate" ) Guardar
        
</template>

<script>

import ONE_ENVASE from '~/queries/OneEnvase.gql'
import CREATE_ENVASE from '~/queries/CreateEnvase.gql'
import UPDATE_ENVASE from '~/queries/UpdateEnvase.gql'
import ENTES from '~/queries/Entes.gql'

export default {
  data: () => ({
    Estado: '',
    Propietario: {Nombre: '', NumeroDocumento: '', Id: -1},
    EnteId: '',
    Material: '',
    Capacidad: '',
    ClaseProducto: '',
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
    ItemsPropietario: [
      {NitOCc: '123', Nombre: 'Pedro Perez', Id: 1}
    ],
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
    ItemsValvula: [
      {text: 'Si'},
      {text: 'No'}
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
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    
    loading: 0,
  }),
  apollo: {
    OneEnvase: {
      query: ONE_ENVASE,
      variables () {
        return {
          NumeroInterno: this.NumeroInterno
        }
      },
      loadingKey: 'loading',
      update (data) {
        console.log(data)
        this.Estado = data.OneEnvase ? data.OneEnvase.Estado : ''
        this.EnteId = data.OneEnvase ? data.OneEnvase.EnteId : ''
        this.Propietario = 
          data.OneEnvase ? data.OneEnvase.Propietario : {Nombre: '', NumeroDocumento: '', Id: -1}
        this.Material = data.OneEnvase ? data.OneEnvase.Material : ''
        this.Capacidad = data.OneEnvase ? data.OneEnvase.Capacidad : ''
        this.ClaseProducto = data.OneEnvase ? data.OneEnvase.ClaseProducto : ''
        this.Numero = data.OneEnvase ? data.OneEnvase.Numero : ''
        this.Presion = data.OneEnvase ? data.OneEnvase.Presion : ''
        this.AlturaConValvula = data.OneEnvase ? data.OneEnvase.AlturaConValvula : ''
        this.PesoConValvula = data.OneEnvase ? data.OneEnvase.PesoConValvula : ''
        this.Valvula = data.OneEnvase ? data.OneEnvase.Valvula : ''
        this.TipoValvula = data.OneEnvase ? data.OneEnvase.TipoValvula : ''
        this.AcabadoColor = data.OneEnvase ? data.OneEnvase.AcabadoColor : ''
        this.NormaTecnicaFabricacion = data.OneEnvase ? data.OneEnvase.NormaTecnicaFabricacion : ''
        this.Proveedor = data.OneEnvase ? data.OneEnvase.Proveedor : ''
        this.FechaCompra = data.OneEnvase ? data.OneEnvase.FechaCompra : ''
        this.Garantia = data.OneEnvase ? data.OneEnvase.Garantia : ''
        this.FechaFabricacion = data.OneEnvase ? data.OneEnvase.FechaFabricacion : ''
        this.PruebaHidrostatica = data.OneEnvase ? data.OneEnvase.PruebaHidrostatica : ''
        this.EquipoAlquilado = data.OneEnvase ? data.OneEnvase.EquipoAlquilado : ''
        this.FechaAlquiler = data.OneEnvase ? data.OneEnvase.FechaAlquiler : ''
        this.Observaciones = data.OneEnvase ? data.OneEnvase.Observaciones : ''
        
        this.update = data.OneEnvase ? true : false
      }
    },
    Entes: {
      query: ENTES,
      loadingKey: 'loading',
      update (data) {
        console.log(data)
        this.ItemsPropietario = data.Entes
      }
    }
  },
  methods: {
    CreateOrUpdate () {
      if (this.update) {
        this.Update();
      }else{
        this.Create();
      }
    },
    Create () {
    
      const Envase = {
        Estado: this.Estado,
        EnteId: this.Propietario.Id,
        Material: this.Material,
        Capacidad: this.Capacidad,
        ClaseProducto: this.ClaseProducto,
        Numero: this.Numero,
        NumeroInterno: this.NumeroInterno,
        Presion: this.Presion,
        AlturaConValvula: this.AlturaConValvula,
        PesoConValvula: this.PesoConValvula,
        Valvula: this.Valvula,
        TipoValvula: this.TipoValvula,
        AcabadoColor: this.AcabadoColor,
        NormaTecnicaFabricacion: this.NormaTecnicaFabricacion,
        Proveedor: this.Proveedor,
        FechaCompra: this.FechaCompra,
        Garantia: this.Garantia,
        FechaFabricacion: this.FechaFabricacion,
        PruebaHidrostatica: this.PruebaHidrostatica,
        EquipoAlquilado: this.EquipoAlquilado,
        FechaAlquiler: this.FechaAlquiler,
        Observaciones: this.Observaciones,
        Propietario: this.Propietario
      };
      
      this.Reset ();
      
      this.$apollo.mutate ({
        mutation: CREATE_ENVASE,
        variables: {
          Estado: Envase.Estado,
          EnteId: Envase.EnteId,
          Material: Envase.Material,
          Capacidad: Envase.Capacidad,
          ClaseProducto: Envase.ClaseProducto,
          Numero: Envase.Numero,
          NumeroInterno: Envase.NumeroInterno,
          Presion: Envase.Presion,
          AlturaConValvula: Envase.AlturaConValvula,
          PesoConValvula: Envase.PesoConValvula,
          Valvula: Envase.Valvula,
          TipoValvula: Envase.TipoValvula,
          AcabadoColor: Envase.AcabadoColor,
          NormaTecnicaFabricacion: Envase.NormaTecnicaFabricacion,
          Proveedor: Envase.Proveedor,
          FechaCompra: Envase.FechaCompra,
          Garantia: Envase.Garantia,
          FechaFabricacion: Envase.FechaFabricacion,
          PruebaHidrostatica: Envase.PruebaHidrostatica,
          EquipoAlquilado: Envase.EquipoAlquilado,
          FechaAlquiler: Envase.FechaAlquiler,
          Observaciones: Envase.Observaciones,
          Propietario: Envase.Propietario
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          console.log(Ente);
          var data = {OneEnvase: res.CreateEnvase}
          store.writeQuery({ 
            query: ONE_ENVASE, 
            variables: {
              NumeroInterno: Envase.NumeroInterno
            },
            data: data
          })
          console.log('actualizado')
        }
      }).then( data => {        
        console.log(data)
      }).catch( Err => {
        console.log(Err)
      })
    },
    Update () {
    
      const Envase = {
        Estado: this.Estado,
        EnteId: this.Propietario.Id,
        Material: this.Material,
        Capacidad: this.Capacidad,
        ClaseProducto: this.ClaseProducto,
        Numero: this.Numero,
        NumeroInterno: this.NumeroInterno,
        Presion: this.Presion,
        AlturaConValvula: this.AlturaConValvula,
        PesoConValvula: this.PesoConValvula,
        Valvula: this.Valvula,
        TipoValvula: this.TipoValvula,
        AcabadoColor: this.AcabadoColor,
        NormaTecnicaFabricacion: this.NormaTecnicaFabricacion,
        Proveedor: this.Proveedor,
        FechaCompra: this.FechaCompra,
        Garantia: this.Garantia,
        FechaFabricacion: this.FechaFabricacion,
        PruebaHidrostatica: this.PruebaHidrostatica,
        EquipoAlquilado: this.EquipoAlquilado,
        FechaAlquiler: this.FechaAlquiler,
        Observaciones: this.Observaciones,
        Propietario: this.Propietario
      };
      
      this.Reset ();
      
      this.$apollo.mutate ({
        mutation: UPDATE_ENVASE,
        variables: {
          Estado: Envase.Estado,
          EnteId: Envase.EnteId,
          Material: Envase.Material,
          Capacidad: Envase.Capacidad,
          ClaseProducto: Envase.ClaseProducto,
          Numero: Envase.Numero,
          NumeroInterno: Envase.NumeroInterno,
          Presion: Envase.Presion,
          AlturaConValvula: Envase.AlturaConValvula,
          PesoConValvula: Envase.PesoConValvula,
          Valvula: Envase.Valvula,
          TipoValvula: Envase.TipoValvula,
          AcabadoColor: Envase.AcabadoColor,
          NormaTecnicaFabricacion: Envase.NormaTecnicaFabricacion,
          Proveedor: Envase.Proveedor,
          FechaCompra: Envase.FechaCompra,
          Garantia: Envase.Garantia,
          FechaFabricacion: Envase.FechaFabricacion,
          PruebaHidrostatica: Envase.PruebaHidrostatica,
          EquipoAlquilado: Envase.EquipoAlquilado,
          FechaAlquiler: Envase.FechaAlquiler,
          Observaciones: Envase.Observaciones,
          Propietario: Envase.Propietario
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          console.log(Envase);
          var data = {OneEnvase: res.UpdateEnvase}
          store.writeQuery({ 
            query: ONE_ENVASE, 
            variables: {
              NumeroInterno: Envase.NumeroInterno
            },
            data: data
          })
          console.log('actualizado')
        }
      }).then( data => {        
        console.log(data)
      }).catch( Err => {
        console.log(Err)
      })
    },
    Reset () {
      this.Estado = '';
      this.Propietario = {Nombre: '', NumeroDocumento: '', Id: -1};
      this.EnteId = '';
      this.Material = '';
      this.Capacidad = '';
      this.ClaseProducto = '';
      this.Numero = '';
      this.NumeroInterno = '';
      this.Presion = '';
      this.AlturaConValvula = '';
      this.PesoConValvula = '';
      this.Valvula = '';
      this.TipoValvula = '';
      this.AcabadoColor = '';
      this.NormaTecnicaFabricacion = '';
      this.Proveedor = '';
      this.FechaCompra = '';
      this.Garantia = '';
      this.FechaFabricacion = '';
      this.PruebaHidrostatica = '';
      this.EquipoAlquilado = '';
      this.FechaAlquiler = '';
      this.Observaciones = '';
    },
    ResetPropietario () {
      this.Propietario = {Nombre: '', NumeroDocumento: '', Id: -1}
    }
  }
};

</script>

<style lang="stylus">
  .alert-especial
    position absolute
    
</style>
