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
            <form @submit.prevent= "" class="p-5 bg-primary">
                <h2>Informações Orçamento</h2>
    
                <div id="clientes">
                    <Dropdown id="cliente-value" label="Cliente" placeholder="Selecione um cliente">
                        <option value="">Teste</option>
                    </Dropdown>
                </div>
    
                <div id="">
    
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Dropdown from '@/components/Dropdown.vue';
    import Sidebar from '@/components/Sidebar.vue';

    export default{
        components: {
            Dropdown,
            Sidebar,
        },
        methods: {
            voltar(){
                this.$router.push('/orcamentos')
            }
        }
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

    }


</style>