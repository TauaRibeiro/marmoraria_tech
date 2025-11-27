import api from "@/service/api"

const store = {
    clientes: [],
}

const mutations = {
    SET_CLIENTES: (dados) => {
        store.clientes = dados
    },
    CLEAR: () => {
        store.clientes = []
    },
}

const actions = {
    async fetchClientes({ commit }, clear= false){
        try {
            if(!clear && store.clientes.length != 0){
                return {succes: true}
            }
    
            const res = await api.get('/clientes', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            commit('CLEAR')
            commit('SET_CLIENTES', res.data.result)

            return {succes: true}
        } catch (error) {
            console.error(error)
            return {succes: false, status: error.response.status, message: error.response?.data?.message}
        }
    }
}

const getters = {
    clientes: (state) => { return state.clientes}
}

export default {
    namedSpaced: true,
    store,
    mutations,
    actions,
    getters,
}