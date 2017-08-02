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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Work+Sans:200'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Archivo+Black'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/1.9.33/css/materialdesignicons.min.css'}
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
      'apollo-client',
      'graphql-tag',
      'isomorphic-fetch',
      'vue-apollo',
      'vuetify'
    ]
  },
  plugins: [
    '~plugins/vuetify.js',
    {src: '~plugins/vue-chartjs.js', ssr: false},
    {src: '~plugins/apollo-client.js', injectAs: 'apolloProvider'}
  ],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ]
}
