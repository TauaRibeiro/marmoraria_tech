<template>
    <div class="layout">
        <div class="content">
            <header class="">
                <h2>Orçamentos</h2>
                <button>Voltar</button>
            </header>
            <form @submit.prevent= "">
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

    export default{
        components: {
            Dropdown
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


</style>