<template lang="pug">
doctype html
v-container(fluid pt-0 pb-5 class="g-container text-xs-center")
  v-layout(row wrap)
    v-flex(xs12 md8 offset-md2)
      p(class="white--text pt-5 mt-5 g-text-small") CONOZCA NUESTROS 
        span(class="deep-orange--text text--darken-2") PRINCIPIOS 
      h2(class="white--text pt-0 g-section3-title") Identidad Empresarial
  v-layout(row wrap justify-space-around pt-3 pb-5 class="g-layout")
    v-flex(xs10 md3 mb-4 class="g-card-container" v-on:mouseover="over1 = true" v-on:mouseout="over1 = false")
      v-card(class="g-card"  v-bind:class="{ flipped: over1 }")
        div(class="front pt-5 pb-5 text-xs-center")
          img(src="~assets/group.svg" class="g-card-img")
          h2(class="text-xs-center display-1 grey--text text--darken-2 pt-2") Misión
          p(class="text-xs-justify pl-3 pr-3 pb-3") Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 
        div(class="back pt-3 pl-3 pr-3 pb-3 text-xs-justify")
          p Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 
   
    v-flex(xs10 md3 mb-4 class="g-card-container" v-on:mouseover="over2 = true" v-on:mouseout="over2 = false")
      v-card(class="g-card"  v-bind:class="{ flipped: over2 }")
        div(class="front pt-5 pb-5 text-xs-center")
          img(src="~assets/airplane.svg" class="g-card-img")
          h2(class="text-xs-center display-1 grey--text text--darken-2 pt-2") Visión 
          p(class="text-xs-justify pl-3 pr-3 pb-3") Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 
        div(class="back pt-3 pl-3 pr-3 pb-3 text-xs-justify")
          p Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 

    v-flex(xs10 md3 class="g-card-container" v-on:mouseover="over3 = true" v-on:mouseout="over3 = false")
      v-card(class="g-card"  v-bind:class="{ flipped: over3 }")
        div(class="front pt-5 pb-5 text-xs-center")
          img(src="~assets/law.svg" class="g-card-img")
          h2(class="text-xs-center display-1 grey--text text--darken-2 pt-2") Politicas
          p(class="text-xs-justify pl-3 pr-3 pb-3") Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 
        div(class="back pt-3 pl-3 pr-3 pb-3 text-xs-justify")
          p Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
            |Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor 


</template>

<script>
export default {
  data () {
    return {
      over1: false,
      over2: false,
      over3: false
    }
  },
  methods: {
    printOver: function () {
      console.log(this.over)
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
.g-section3-title
  font-family 'Roboto', sans
  font-weight bold
  padding-bottom 0.8em
  margin-bottom: 1em
  background url('~assets/bottom-red.svg') no-repeat bottom

.g-section3-title
  font-family 'Roboto', sans
  font-weight bold
  line-height 140%
  padding-top 0.8em
  padding-bottom 0.6em
  margin-bottom: 1em

.g-container
  background url('~assets/books_.jpg')
  background-size cover
  background-position center

.g-layout
  max-width 1140px
  margin auto

.g-card-container
  perspective 512px
  height 360px

.g-card
  transform-style preserve-3d
  transition transform 1s
  position relative
  height 360px

.front
  width 100%
  height 360px
  backface-visibility hidden
  position absolute

.back
  transform rotateY( 180deg )
  height 360px
  backface-visibility hidden

.flipped
  transform: rotateY( 180deg )

.g-card-img
  height 72px

.g-text-small
  font-family "Archivo Black", sans-serif 

</style>
