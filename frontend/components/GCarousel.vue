<template lang="pug">
v-container(fluid pt-1 pb-0 pl-0 pr-0 id="inicio")
  v-layout(row wrap pt-0 mt-0)
    v-flex(xs12)
      v-carousel
        v-carousel-item(v-for="(item, i) in items" v-bind:key="i" v-bind:src="item.src")
</template>

<script>
export default {
data () {
  return {
    items: [
      {
        src: '/slide.one.jpg'
      },
      {
        src: '/slide.two.jpg'
      },
      {
        src: '/slide.tree.jpg'
      },
      {
        src: '/slide.four.jpg'
      },
      {
        src: '/slide.five.jpg'
      }
    ]
  }
}
}
</script>

<style lang="stylus" scoped>

</style>
