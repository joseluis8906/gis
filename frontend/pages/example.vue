<template>
  <v-layout align-center justify-center>
    <v-flex xs12 md8 lg6>
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <span>Scheme</span>
                <v-switch primary label="Dark" v-model="s1" value="true" true-value="true" false-value="false"></v-switch>
            </v-flex>
            <v-flex xs12 md6>
              <span>Drawer</span>
                <v-radio primary label="Radio" v-model="primaryDrawer.type" value="0">Permanent</v-radio>
                <v-radio primary label="Radio" v-model="primaryDrawer.type" value="1">Persistent</v-radio>
                <v-radio primary label="Radio" v-model="primaryDrawer.type" value="2">Temporary</v-radio>
                <v-switch label="Clipped" primary v-model="primaryDrawer.clipped"></v-switch>
                <v-switch label="Floating" primary v-model="primaryDrawer.floating"></v-switch>
                <v-switch label="Mini" primary v-model="primaryDrawer.mini"></v-switch>
            </v-flex>
            <v-flex xs12 md6>
              <span>Footer</span>
              <v-switch label="Fixed" primary v-model="s1" value="false" true-value="false" false-value="true"></v-switch>
            </v-flex>
          </v-layout>
        </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn dark>Cancel</v-btn>
              <v-btn dark primary>Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    data: () => ({
      s1: true,
      drawers: ['Permanent', 'Persistent', 'Temporary'],
      primaryDrawer: {
        model: true,
        type: 'persistent',
        clipped: false,
        floating: false,
        mini: false
      },
      footer: {
        fixed: false
      }
    }),
    methods: {
      prueba: function () {
        console.log('si');
      }
    }
  }
</script>
