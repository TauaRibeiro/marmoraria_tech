import { createStore } from 'vuex'
import auth from './modules/auth'
import orcamentos from './modules/orcamentos'
import status from './modules/status'
import materiais from './modules/materiais'
import clientes from './modules/clientes'

export default createStore({
  modules: {
    auth,
    orcamentos,
    status,
    materiais,
    clientes
  },
})
