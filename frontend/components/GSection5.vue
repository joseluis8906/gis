<template lang="pug">
doctype html
v-container(fluid pt-0 pb-0 class="g-container text-xs-center")      
  v-layout(row wrap class="g-layout-slider")
    v-flex(xs12 style="background-color: black; background-image: url('/producto.1.png');" class="white--text g-slide" v-bind:class="{ 'g-zoom-in': slideIndex==0, 'g-zoom-out': slideIndex>0 }")
      h2(class="pt-5 pb-3 white--text g-section-title" style="background-image: url('/bottom-red.svg')") Producto 1
      v-container
        v-layout(row wrap pl-3 pr-3 justify-center)
          v-flex(xs12 md4 lg2)
            p Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
      
    v-flex(xs12 style="background: red" class="white--text g-slide" v-bind:class="{ 'g-slide-index-in': slideIndex==1, 'g-slide-index-out': slideIndex<1, 'g-zoom-in': slideIndex==1, 'g-zoom-out': slideIndex>1 }")
      h2(class="pt-5 pb-3 white--text g-section-title" style="background-image: url('/bottom-white.svg')") Producto 2
      v-container
        v-layout(row wrap pl-3 pr-3 justify-center)
          v-flex(xs12 md4 lg2)
            p Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
    
    v-flex(xs12 style="background: blue" class="white--text g-slide" v-bind:class="{ 'g-slide-index-in': slideIndex==2, 'g-slide-index-out': slideIndex<2 }")
      h2(class="pt-5 pb-3 white--text g-section-title" style="background-image: url('/bottom-red.svg')") Producto 3
      v-container
        v-layout(row wrap pl-3 pr-3 justify-center)
          v-flex(xs12 md4 lg2)
            p Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor Lorem ipsu dolor
      
    v-flex(xs12 lg4 offset-lg4 class="g-slider-control")
      v-container
        v-layout(row justify-space-around)
          v-icon(dark small class="g-control" v-on:click="anterior") chevron_left
          v-icon(dark small class="g-control" v-on:click="siguiente") chevron_right
      
</template>

<script>

export default {
  data () {
    return {
      slideIndex: 0
    }
  },
  methods: {
    siguiente: function () {
      if (this.slideIndex < 2) {
        this.slideIndex++
      }
    },
    anterior: function () {
      if (this.slideIndex > 0) {
        this.slideIndex--
      }
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>

deepOrange = #e64a19

.g-container
  background-color white
  border-bottom 2px solid #d2d2d5

.g-section-title
  font-family 'Roboto', sans
  font-weight bold
  padding-bottom 0.8em
  margin-bottom: 1em
  background-repeat no-repeat
  background-position bottom

.g-layout-slider
  position: relative
  height: 480px

.g-slide
  position absolute
  height 100%
  width: 100%
  background-repeat no-repeat
  background-position left bottom
  background-size cover

.g-slide-index-in
  transform translateX(0%)
  transition transform 1s ease
  
.g-slide-index-out
  transform translateX(100%)
  transition transform 1s ease
  
.g-zoom-in
  transform scale(1)
  transform-origin 0 50%
  transition transform 1s
  
.g-zoom-out
  transform scale(0.9)
  transform-origin 0 50%
  transition transform 1s
  
.g-slider-control
  position absolute
  top 85%
  width 100%

.g-control
  cursor pointer
</style>
