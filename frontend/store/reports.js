export const state = {
  title: 'Default',
  Numero: '0000'
}

export const mutations = {
  changeTitle (state, title) {
    state.title = title
  },
  changeNumero (state, Numero) {
    state.Numero = Numero
    console.log(state)
  }
}

