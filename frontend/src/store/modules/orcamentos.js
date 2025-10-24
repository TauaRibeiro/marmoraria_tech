import api from '@/service/api'

const state = {
    orcamentos: [],
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
}

const actions = {
    async cadastrarOrcamento({ commit }, orcamento){
        try{
            const response = await api.post('/orcamento', {...orcamento})

            if(response.status === 400){
                return { success: false}
            }

            commit('ADD_ORCAMENTO', orcamento)

            return { success: true}
        }catch(error){
            console.error(error)
            return {success: false, message: error.response?.data?.message || "Erro ao fazer o cadastro do orcamento"}
        }
    },
    async fetchOrcamentos({ commit }){
        try{
            if(state.orcamentos.length > 0){
                return {success: true}
            }

            const response = await api.get('/orcamento', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if(response.status === 401 || response.status === 403){
                return {success: false, status: response.status, message: response.data.message}
            }
            if(response.status !== 200){
                return {success: true, status: response.status, message: response.data.message}
            }

            commit('SET_ORCAMENTOS', response.data.result)

            return {success: true}
        }catch(error){
            console.error(error)
            return {success: false, status: error.response?.status || 500, message: error.response?.data?.message || "Erro ao get dos orcamentos"}
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
}

export default {
    namedSpaced: true,
    state,
    mutations,
    actions,
    getters,
}