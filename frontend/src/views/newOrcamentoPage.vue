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

                <div id="clientes" class="mb-5">
                    <Dropdown id="cliente-value" label="Cliente" placeholder="Selecione um cliente">
                        <option value="">Teste</option>
                    </Dropdown>
                </div>

                <div id="materiais" class="mb-5">
                    <p class="mb-2 mt-2"><b>Materiais</b></p>
                    <div class="materiais-content d-flex flex-row justify-content-between">
                      <div class="d-flex flex-column">
                          <p v-if="materiaisList.length === 0" id="sem-material">Nenhum material selecionado. Clique em "+ Adicionar Material" para começar.</p>
                          <div v-else v-for="i in materiaisList.length" :key="i" class="d-flex flex-row mb-3">
                              <Dropdown id="material" label="Material" placeholder="Selecione um material">
                                  <option :value="materiaisList[i-1].id">{{ materiaisList[i-1].nome }}</option>
                              </Dropdown>
                              <InputComponent
                                id="quantidade"
                                type="number"
                                min=1
                                label="Qtd"
                                value=1
                                containerClass="ms-3"
                              />
                              <InputComponent
                                id="largura"
                                type="number"
                                min=0.01
                                label="Largura (m)"
                                step=0.01
                                containerClass="ms-3"
                              />
                              <InputComponent
                                id="comprimento"
                                type="number"
                                min=0.01
                                label="Comprimento"
                                step=0.01
                                containerClass="ms-3"
                              />
                              <InputComponent
                                id="area"
                                type="text"
                                label="Àrea Total (m²)"
                                value="-"
                                disabled
                                containerClass="ms-3"
                              />
                              <InputComponent
                                id="subTotal"
                                type="text"
                                label="Subtotal"
                                value="-"
                                disabled
                                containerClass="ms-3"
                              />
                          </div>
                        </div>

                        <button class="btn btn-primary" id="addBtn">+ Adicionar Material</button>

                    </div>
                </div>

                <div id="outros-valores" class="d-flex flex-row gap-5">
                  <InputComponent
                    id="frete"
                    type="Number"
                    label="Valor do Frete (R$)"
                    step="0.01"
                    min="0"
                    containerClass="flex-fill"
                    cls="w-100 flex-grow-1"
                    />
                  <InputComponent
                    id="instalacao"
                    type="Number"
                    label="Valor da Instalação (R$)"
                    step="0.01"
                    min="0"
                    containerClass="flex-fill"
                    cls="w-100 flex-grow-1"
                    />
                  <InputComponent
                    id="desconto"
                    type="Number"
                    label="Desconto (R$)"
                    step="0.01"
                    min="0"
                    containerClass="flex-fill"
                    cls="w-100 flex-grow-1"
                    />
                </div>

                <div id="data" class="d-flex flex-row mt-5">
                  <InputComponent
                    id="total"
                    type="text"
                    disabled
                    label="Valor Total Estimado (R$)"
                    containerClass="flex-fill"
                    cls="w-75"
                  />

                  <InputComponent
                    id="data"
                    type="date"
                    label="Data de entrega"
                    containerClass="flex-fill"
                  />
                </div>

                <Dropdown id="status" label="Status" placeholder="Selecione um status" class="mt-5">

                </Dropdown>
            </form>
        </div>
    </div>
</template>

<script>
    import Dropdown from '@/components/Dropdown.vue';
    import Sidebar from '@/components/Sidebar.vue';
    import InputComponent from '@/components/Input.vue';
    import store from '@/store';

    export default{
        components: {
            Dropdown,
            Sidebar,
            InputComponent,
        },
        data() {
            return {
                materiaisList: [],
                loading: false
            }
        },
        async mounted(){
            this.loading = true

            const resultMateriais = await store.dispatch('fetchMateriais')

            if(!resultMateriais.success){
                if(resultMateriais.status === 401 || resultMateriais.status === 403){
                    store.dispatch('auth/logout')
                    this.$router.push('/login')
                }
            }

            const resultStatus = await store.dispatch('fetchStatus')

            if(!resultStatus.success){
                if(resultStatus.status === 401 || resultStatus.status === 403){
                    alert(resultStatus.message)
                    store.dispatch('auth/logout')
                    this.$router.push('/login')
                }
            }

            const resultOrcamento = await store.dispatch('fetchOrcamentos')

            if(!resultOrcamento.success){
                if(resultOrcamento.status === 401 || resultOrcamento.status === 403){
                    alert(resultOrcamento.message)
                    store.dispatch('auth/logout')
                    this.$router.push('/login')
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

    #addBtn {
      max-height: 50px;
    }
</style>
