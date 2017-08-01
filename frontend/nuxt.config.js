module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'vuetify',
      'isomorphic-fetch',
      'apollo-client',
      'graphql-tag',
      'vue-apollo',
      'vue-chartjs',
      'chart.js'
    ]
  },
  plugins: [
    '~plugins/vuetify.js',
    {src: '~plugins/apolloClient', injectAs: 'apolloProvider'},
    '~plugins/awesomeSwiper'
  ],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' },
    'swiper/dist/css/swiper.css'
    
  ]
}
