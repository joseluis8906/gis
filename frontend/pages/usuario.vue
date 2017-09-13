USERS<template lang="pug">
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

  v-flex( xs12 mt-3 md8 lg6 )
    v-card
      v-layout(row wrap pt-3 light-blue)
        v-flex( xs12 )
          h5(class="grey--text text--lighten-4 text-xs-center bold")
            v-icon(ma) person
            |  Usuario
      v-card-text
        v-layout( row wrap)
          v-flex( xs12 )
            v-text-field( label="Nombre De Usuario" v-model="UserName" dark )

            v-text-field( label="Contraseña" v-model="UiPassword" type="Password" maxlength="4" dark )

            v-select( v-bind:items="ItemsActive"
                      v-model="Active"
                      label="Activo"
                      item-value="text"
                      dark )

      v-card-actions
        v-spacer
        v-btn( dark @click.native="Reset" ) Cancelar
        v-btn( dark primary @click.native="CryptPassword" ) Guardar
</template>

<script>

import USERS from '~/queries/Users.gql'
import CREATE_USER from '~/queries/CreateUser.gql'
import UPDATE_USER from '~/queries/UpdateUser.gql'

import axios from 'axios'

export default {
  data: () => ({
    snackbar: {
      context: 'secondary',
      mode: '',
      timeout: 6000,
      text: 'Cargando'
    },
    Id: null,
    UserName: null,
    Password: null,
    Active: null,
    UiPassword: null,
    ItemsActive: [
      {text: 'Si'},
      {text: 'No'}
    ],
    loading: 0
  }),
  beforeMount () {
    if (sessionStorage.getItem('x-access-token') === null || sessionStorage.getItem('x-access-token') === null) {
      this.$router.push('/')
    }
  },
  apollo: {
    Users: {
      query: USERS,
      variables () {
        return {
          UserName: this.UserName
        }
      },
      loadingKey: 'loading',
      update (data) {
        //console.log(data)
        this.LoadUi(data.Users)
      }
    },
  },
  methods: {
    CryptPassword (){
      if (this.UiPassword !== null && this.UiPassword !== '') {
        axios.get(`/backend/generatepassword/${this.UiPassword}`).then(res => {
          this.Password = res.data.Password
          this.CreateOrUpdate()
        }).catch(err => {
          console.log(err)
        });
      } else {
        this.CreateOrUpdate()
      }
    },
    CreateOrUpdate () {
      if (this.Id === null) {
        this.Create();
      }else{
        this.Update();
      }
    },
    Create () {
      const User = {
        UserName: this.UserName,
        Password: this.Password,
        Active: this.Active,
      };
      
      this.Reset ();

      this.$apollo.mutate ({
        mutation: CREATE_USER,
        variables: {
          UserName: User.UserName,
          Password: User.Password,
          Active: User.Active
      },
      loadingKey: 'loading',
      update: (store, { data: res }) => {
        //console.log(Ente);
        try{
          var data = store.readQuery({
            query: USERS,
            variables: {
              UserName: res.CreateUser.UserName,
            }
          })

          data.Users.push(res.CreateUser)

          store.writeQuery({
            query: USERS,
            variables: {
              UserName: res.CreateUser.UserName
            },
            data: data
          })

        } catch (Err) {

          var data = {Users: []}

          data.Users.push(res.CreateUser)

          store.writeQuery({
            query: USERS,
            variables: {
              UserName: res.CreateUser.UserName
            },
            data: data
          })

        }

      },
      }).then( data => {
        //console.log(data)
      }).catch( Err => {
        //console.log(Err)
      })
    },
    Update () {
      //console.log(this.Password)
      const User = {
        Id: this.Id,
        UserName: this.UserName,
        Password: this.Password,
        Active: this.Active
      };

      this.Reset ();

      this.$apollo.mutate ({
        mutation: UPDATE_USER,
        variables: {
          Id: User.Id,
          UserName: User.UserName,
          Password: User.Password,
          Active: User.Active
        },
        loadingKey: 'loading',
        update: (store, { data: res }) => {
          //console.log(Ente);
          try {
            var data = store.readQuery({
              query: USERS,
              variables: {
                UserName: res.UpdateUser.UserName
              }
            })

            for (let i=0; i<data.Users.length; i++) {
              if (data.Users[i].Id === res.UpdateUser.Id) {
                data.Users[i].UserName = res.UpdateUser.UserName
                data.Users[i].Password = res.UpdateUser.Password
                data.Users[i].Active = res.UpdateUser.Active
              }
            }

            store.writeQuery({
              query: USERS,
              variables: {
                UserName: res.UpdateUser.UserName
              },
              data: data
            })

          } catch (Err) {

            var data = {Users: []}

            data.Users.push(res.UpdateUser)

            store.writeQuery({
              query: USERS,
              variables: {
                UserName: res.UpdateUser.UserName
              },
              data: data
            })

          }

        },
      }).then( data => {
        //console.log(data)
      }).catch( Err => {
        //console.log(Err)
      })
    },
    Reset () {
      this.Id = null
      this.UserName = null
      this.Password = null
      this.UiPassword = null
      this.Active = null
    },
    LoadUi (Users) {
      if( Users.length === 0 ) {
        this.Id = null
        this.Password = null
        this.UiPassword = null
        this.Active = null
      }

      for (let i=0; i<Users.length; i++) {
        if ( this.UserName === Users[i].UserName ) {
          this.Id = Users[i].Id
          this.UserName = Users[i].UserName
          this.Password = Users[i].Password
          this.Active = Users[i].Active
          break
        }else{
          this.Id = null
          this.Password = null
          this.UiPassword = null
          this.Active = null
        }
      }

    }
  }
};


</script>

<style lang="stylus" scoped>
h5.bold
  font-weight bold

.alert-especial
  position absolute

</style>
