import api from '@/service/api'

const state = {
    orcamentos: [],
    error: null,
    loading: false,
}

const mutations = {
    SET_ORCAMENTOS(state, orcamentos){
        state.orcamentos = orcamentos
    },
    ADD_ORCAMENTO(state, orcamento){
        state.orcamentos.push(orcamento)
    },
    REMOVE_ORCAMENTO(state, orcamento){
        state.orcamentos = state.orcamentos.filter((o) => o.id !== orcamento.id)
    },
    UPDATE_ORCAMENTO(state, orcamento){
        state.orcamentos = state.orcamentos.map((o) => {
            if(o.id === orcamento.id){
                return orcamento
            }

            return o
        })

    },
    CLEAR_ORCAMENTOS(state){
        state.orcamentos = []
    },
    SET_ERROR(state, error){
        state.error = error
    },
    SET_LOADING(state, loading){
        state.loading = loading
    }
}

const actions = {
    async cadastrarOrcamento({ commit }, orcamento){
        commit("SET_ERROR", null)
        commit("SET_LOADING", false)

        try{
            const response = await api.post('/orcamento', {...orcamento})

            if(response.status === 400){
                commit('SET_ERROR', response.data.message)
                return { success: false}
            }

            commit('ADD_ORCAMENTO', orcamento)

            return { success: true}
        }catch(error){
            console.error(error)
            commit('SET_ERROR', error.response?.data?.message || "Erro ao fazer o cadastro do orcamento")
            return {success: false, message: error.response?.data?.message || "Erro ao fazer o cadastro do orcamento"}
        }finally{
            commit('SET_LOADING', false)
        }
    },
    async fetchOrcamentos({ commit }){
        try{
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            const response = await api.get('/orcamento', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if(response.status !== 200){
                return {success: true, message: response.data.message}
            }

            commit('SET_ORCAMENTOS', response.data.result)

            return {success: true}
        }catch(error){
            console.error(error)
            return {success: false, message: error.response?.data?.message || "Erro ao get dos orcamentos"}
        }finally{
            commit('SET_LOADING', false)
        }
    },
    async updateOrcamento({ commit }, orcamento){
        const response = await api.put( `/orcamento/${orcamento.id}`, {...orcamento})

        if(response.status !== 200){
            return {success: false, message: response.data.message}
        }

        commit('UPDATE_ORCAMENTO', orcamento)

        return {success: true}
    },
    async deleteOrcamento({ commit }, orcamento){
        const response = await api.delete(`/orcamento/${orcamento.id}`)

        if(response.status !== 200){
            return {success: false, message: response.data.message}
        }

        commit('DELETE_ORCAMENTO', orcamento)

        return {success: true}
    }
}

const getters = {
    orcamentos: (state) => {return state.orcamentos},
    error: (state) => {return state.error},
    loading: (state) => {return state.loading},
}

export default {
    namedSpaced: true,
    state,
    mutations,
    actions,
    getters,
}