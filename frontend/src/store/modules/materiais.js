import api from "@/service/api"

const store = {
    materiais: []
}

const mutations = {
    SET_MATERIAIS: (dados) => {
        store.materiais = dados
    },
    CLEAR: () => {
        store.materiais = []
    },
}

const actions = {
    async fetchMateriais({ commit }, clear= false){
        try{
            if(!clear && store.materiais.length != 0){
                return {success: true}
            }

            const response = await api.get('/materiais', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            commit('CLEAR')
            commit('SET_MATERIAIS', response.response.data.result)

            return {success: true}
        }catch(error){
            console.error(error)
            return {success: false, status: error.response?.status, message: error.response?.data?.message}
        }
    }
}

const getters = {
    materiais: (state) => {return state.materiais}
}

export default {
    namedSpaced: true,
    store,
    mutations,
    actions,
    getters
}