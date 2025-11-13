import api from '@/service/api'

const state = {
  token: localStorage.getItem('token') || null,
  user: null,
  isAuthenticated: (localStorage.getItem('token')) ? true : false,
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    state.isAuthenticated = !!token
    localStorage.setItem('token', token)
  },
  CLEAR_TOKEN(state) {
    (state.token = null), (state.isAuthenticated = false)
    localStorage.removeItem('token')
  },
  SET_USER(state, user) {
    state.user = user
  },
}

const actions = {
  async login({ commit }, credencials) {
    try {
      const response = await api.post('/auth', {
        email: credencials.login,
        senha: credencials.senha,
      })

      const status = response.status

      if (status !== 200) {
        console.log(response)
        return { success: false, message: 'Login ou senha inválidos' }
      }

      const token = response.data.token

      commit('SET_TOKEN', token)
      commit('SET_USER', credencials.login)

      return { success: true }
    } catch (error) {
      console.error('Erro no login: ', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao fazer login',
      }
    }
  },
  logout({ commit }) {
    commit('CLEAR_TOKEN')
    commit('SET_USER', null)
  },
}

const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  user: (state) => state.user,
  token: (state) => state.token,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
