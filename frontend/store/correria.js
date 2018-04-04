export const state = {
  Numero: null
  VendedorId: null
}

export const mutations = {
  changeNumero (state, Numero) {
    state.Numero = Numero
  },
  changeVendedorId (state, VendedorId) {
    state.VendedorId = VendedorId
  }
}
