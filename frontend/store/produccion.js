export const state = {
  Orden: null,
  EnvaseId: null,
  ProductoId: null,
  Despachado: null
}

export const mutations = {
  changeOrden (state, Orden) {
    state.Orden = Orden
  },

  changeEnvaseId (state, EnvaseId) {
    state.EnvaseId = EnvaseId
  },

  changeProductoId (state, ProductoId) {
    state.ProductoId = ProductoId
  },

  changeDespachado (state, Despachado) {
    state.Despachado = Despachado
  }
}
