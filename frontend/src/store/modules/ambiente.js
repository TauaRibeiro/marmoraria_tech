import api from '@/service/api'

const store = {
  ambientes: []
}

const mutations = {
  SET_AMBIENTES(ambientes){
    store.ambientes = ambientes
  },
  CLEAR_AMBIENTES(){
    store.ambientes = []
  }
}

const actions = {
  async fetchAmbientes({ commit }, clear= false){
    try{
      if(!clear && store.ambientes.length != 0){
        return {success: true}
      }

      const response = await api.get('/ambiente', {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      commit('CLEAR_AMBIENTES')
      commit('SET_AMBIENTES', response.response.data.result)

      return {success: true}
    }catch(error){
      console.error(error)
      return {success: false, status: error.response?.status, message: error.response?.data?.message}
    }
  }
}

const getters = {
  ambinetes: (state) => {return state.ambientes}
}

export default {
  namedSpaced: true,
  store,
  mutations,
  actions,
  getters
}