import { createStore } from 'vuex'
import auth from './modules/auth'
import orcamentos from './modules/orcamentos'

export default createStore({
  modules: {
    auth,
    orcamentos,
  },
})
