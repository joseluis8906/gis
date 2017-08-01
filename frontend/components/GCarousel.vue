<template lang="pug">
doctype html
v-container(fluid pt-1 pb-0)
  v-layout(row wrap pt-0 mt-0)
    v-flex(xs12 md12)
      swiper(:options="swiperOption")
        swiper-slide(v-for="(item, i) in items" v-bind:key="i")
          div(v-bind:style="item.styles" class="img-slide")
</template>

<script>
export default {
data () {
  return {
    items: [
      {
        classObject: {
          'orange': true,
          'darken-2': true,
          'white--text': true
        },
        isReverse: true,
        styles: {
          backgroundImage: 'url("/carousel/slide.one.jpg")'
        },
        card: {
          title: 'Pensamos En El Futuro',
          body: 'Nuestra tecnología nos lleva un paso adelante, sacamos del futuro lo que hacemos en el presente.',
          footer: 'Innovar es nuestra vida'
        }
      },
      {
        classObject: {
          'purple': true,
          'darken-2': true,
          'white--text': true
        },
        isReverse: false,
        styles: {
          backgroundImage: 'url("/carousel/slide.two.jpg")'
        },
        card: {
          title: 'Apoyamos El Desarrollo',
          body: 'Apoyamos el crecimiento industrial y económico de la región, crecemos para ser mejores.',
          footer: 'Por un nuevo mañana'
        }
      },
      {
        classObject: {
          'indigo': true,
          'darken-2': true,
          'white--text': true
        },
        isReverse: true,
        styles: {
          backgroundImage: 'url("/carousel/slide.tree.jpg")'
        },
        card: {
          title: 'Creamos Industria',
          body: 'Estamos descubriendo las capacidades que se necesitan para tener trabajo en las sociedades industriales.',
          footer: 'Por una sociedad avanzada'
        }
      },
      {
        classObject: {
          'green': true,
          'darken-3': true,
          'white--text': true
        },
        isReverse: false,
        styles: {
          backgroundImage: 'url("/carousel/slide.four.jpg")'
        },
        card: {
          title: 'Tenemos Visión',
          body: 'Tenemos una visión clara de trabajo, mantener los ojos abiertos y continuar avanzando en equipo.',
          footer: 'Competimos para ganar'
        }
      },
      {
        classObject: {
          'blue-grey': true,
          'darken-2': true,
          'white--text': true
        },
        isReverse: false,
        styles: {
          backgroundImage: 'url("/carousel/slide.five.jpg")'
        },
        card: {
          title: 'Trabajamos En Equipo',
          body: 'Creemos en trabajar juntos de la mano para llegar rápido, pero trabajamos en equipo para llegar mas lejos.',
          footer: 'No solo cumplimos, damos mas'
        }
      }
    ],
    swiperOption: {
      effect: 'fade',
      autoplay: 7500,
      autoplayDisableOnInteraction: false,
      speed: 3000
    }
  }
}
}
</script>

<style lang="stylus" scoped>
.img-slide 
  width 100%
  height 512px
  background-size cover
  background-position center
  background-repeat no-repeat
  
.g-title
  font-family 'Archivo Black', sans-serif
  color white
  text-align center
  text-shadow 2px 2px grey
  
.g-msg
  font-family 'Roboto', sans-serif
  color white
  text-align center
  font-size 120%
  font-weight bold
  text-shadow 2px 2px grey

</style>
