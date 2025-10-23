import { createStore } from 'vuex'
import auth from './modules/auth'
import orcamentos from './modules/orcamentos'
import status from './modules/status'

export default createStore({
  modules: {
    auth,
    orcamentos,
    status,
  },
})
