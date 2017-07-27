<template>
  <v-layout align-center justify-center>
    <v-flex xs12 md8 lg6>
      <v-card>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <span>Scheme</span>
                <v-switch primary label="Dark"></v-switch>
            </v-flex>
            <v-flex xs12 md6>
              <span>Drawer</span>
                <v-radio primary label="Radio" value="radio"></v-radio>
                <v-switch label="Clipped" primary></v-switch>
                <v-switch label="Floating" primary></v-switch>
                <v-switch label="Mini" primary></v-switch>
            </v-flex>
            <v-flex xs12 md6>
              <span>Footer</span>
              <v-switch label="Fixed" primary></v-switch>
            </v-flex>
          </v-layout>
        </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn flat>Cancel</v-btn>
              <v-btn flat primary>Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
</template>
