import api from '@/service/api'

const state = {
    status: [],
}

const mutations = {
    SET_STATUS(state, status){
        state.status = status
    },
    CLEAR_STATUS(state){
        state.status = []
    },
}

const actions = {
    async fetchStatus({ commit }){
        if(state.status.length > 0){
            return {success: true}
        }

        try{
            const response = await api.get('/status', {
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

            commit('SET_STATUS', response.result)
            return {success: true}
        }catch(error){
            console.error(error)
            return {success: false, status: error.response?.status || 500, message: error.response?.data?.message || "Erro ao buscar status"}
        }
    }
}

const getters = {
    status: (state) => {return state.status},
}

export default {
    namedSpaced: true,
    state,
    mutations,
    actions,
    getters,
}