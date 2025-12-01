<template>
    <div class="layout">
        <Sidebar
            :fields="[
                { name: 'Dashboard', destiny: 'home' }, 
                { name: 'Orçamentos', destiny: 'orcamentos'}, 
                { name: 'Clientes', destiny: 'clientes' }, 
                { name: 'Materiais', destiny: 'materiais'}, 
                { name: 'Status', destiny: 'status'}, 
                { name: 'Funcionarios', destiny: 'funcionarios'}
            ]"
            current="Orçamentos"
        
        >
        </Sidebar>

        <div class="content w-100 m-3">
            <header class="d-flex flex-row justify-content-between mb-5">
                <h1>Novo Orçamento</h1>
                <button class="btn btn-secondary" @click="voltar()">Voltar</button>
            </header>
            <form @submit.prevent= "" class="p-4">
                <h2>Informações Orçamento</h2>
    
                <div id="clientes">
                    <Dropdown id="cliente-value" label="Cliente" placeholder="Selecione um cliente">
                        <option value="">Teste</option>
                    </Dropdown>
                </div>
    
                <div id="materiais">
                    <p class="mb-2 mt-2">Materiais</p>
                    <div class="materiais-content d-flex flex-row justify-content-between">
                        <p v-if="materiaisList.length === 0" id="sem-material">Nenhum material selecionado. Clique em "+ Adicionar Material" para começar.</p>
                        <div v-else v-for="i in materiaisList.length" :key="i" class="d-flex flex-row">
                            <label for="material">
                                {{ console.log(i-1) }}
                                <Dropdown id="material" label="Material" placeholder="Selecione um material">
                                    <option :value="materiaisList[i-1].id">{{ materiaisList[i-1].nome }}</option>
                                </Dropdown>
                            </label>
                        </div>

                        <button class="btn btn-primary">+ Adicionar Material</button>
                        
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Dropdown from '@/components/Dropdown.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import store from '@/store';
    export default{
        components: {
            Dropdown,
            Sidebar,
        },
        data() {
            return {
                materiaisList: [{id: "12344", nome: "Teste"}, {id: "12344", nome: "Teste 2"}],
                loading: false
            }
        }, 
        async mounted(){
            this.loading = true

            const resultMateriais = await store.dispatch('materiais/fetchMateriai')

            if(!resultMateriais.success){
                if(resultMateriais.status === 401 || resultMateriais.status === 403){
                    store.dispatch('auth/logout')
                    this.$router.push('login')
                }
            }

            const resultStatus = await store.dispatch('fetchStatus')

            if(!resultStatus.success){
                if(resultStatus.status === 401 || resultStatus.status === 403){
                    alert(resultStatus.message)
                    store.dispatch('auth/logout')
                    this.$router.push('login')
                }
            }

            const resultOrcamento = await store.dispatch('fetchOrcamentos')

            if(!resultOrcamento.success){
                if(resultOrcamento.status === 401 || resultOrcamento.status === 403){
                    alert(resultOrcamento.message)
                    store.dispatch('auth/logout')
                    this.$router.push('login')
                }
            }

            this.loading = false
        },
        methods: {
            voltar(){
                this.$router.push('/orcamentos')
            },
            adicionarMaterial(){
                this.materiaisList.push({
                    id: "",
                    nome: "",
                    quantidade: 1,
                    largura: 0,
                    altura: 0,
                })
            },
            removerMaterial(id){
                this.materiaisList = this.materiaisList.filter((materialId) => id !== materialId)
            }
        },
    }

</script>

<style scoped>
    .layout { 
        display: flex; 
        min-height: 100vh;
        min-width: 100vh;
        background: #f6f6f6; 
        justify-content: space-between;
        width: 100cqmax;
    }

    form{
        background-color: #ffffff;
        border-radius: 10px;
        border-style: solid;
        border-width: 1px;
        border-color: rgba(128, 128, 128, 0.397);
    }

    #sem-material {
        color: gray;
    }

</style>