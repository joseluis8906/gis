<template lang="pug">
doctype html
v-layout(align-center justify-center)
  v-dialog(persistent v-model="loading")
    v-card
      v-card-title(class="headline text-xs-center") Cargando 
        v-icon autorenew 
      
  v-flex(xs12 md8 lg6)
    v-card
      v-card-text
        v-layout(row wrap)
          v-flex(xs12 md6)
            span Scheme
              v-text-field( label="Query" v-model="q" multi-line dark )
          
          v-flex(xs12 md6)
            span Drawer
            div(style="overflow: auto")
              pre {{ Posts }}
          
          v-flex(xs12 md6)
            span Footer
            v-switch( label="Fixed" 
                      primary v-model="s1" 
                      value="false" 
                      true-value="false" 
                      false-value="true" )
            
      v-card-actions
        v-spacer
        v-btn(dark) Cancel
        v-btn(dark primary @click.native="recargar") Submit
        
</template>

<script>
import gql from 'graphql-tag';

export default {
  data: () => ({
    s1: true,
    loading: 0,
    q: 1
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
