export const state = {
  Tipo: null,
  EnteId: null,
  ProductoId: null
}

export const mutations = {
  changeTipo (state, Tipo) {
    state.Tipo = Tipo;
  },
  changeEnteId (state, EnteId) {
    state.EnteId = EnteId;
  },
  changeProductoId (state, ProductoId) {
    state.ProductoId = ProductoId;
  }
}
