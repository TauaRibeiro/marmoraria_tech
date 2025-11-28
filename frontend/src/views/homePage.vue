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
        current="Dashboard"
      />

      <main class="content w-100 m-3">
        <header class="d-flex flex-row justify-content-between mb-5">
          <h1>Dashboard</h1>
        </header>
  
        <div class="cards">
          <div class="card">
            <span class="card__label">Orçamentos Abertos</span>
            <span v-if="loading">-</span>
            <span v-else class="card__value">{{ numOrcamentosAbertos }}</span>
          </div>
          <div class="card">
            <span class="card__label">Em Andamento</span>
            <span v-if="loading">-</span>
            <span v-else class="card__value">{{ numOrcamentosEmAndamento }}</span>
          </div>
          <div class="card">
            <span class="card__label">Finalizados</span>
            <span v-if="loading">-</span>
            <span v-else class="card__value">{{ numOrcamentosFinalizados }}</span>
          </div>
          <div class="card">
            <span class="card__label">Total de Orçamentos</span>
            <span v-if="loading">-</span>
            <span v-else class="card__value">{{ numOrcamentosTotal }}</span>
          </div>
        </div>

        <section class="table-section">
            <h2>Orçamentos Recentes</h2>
            <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading" class="loading"><td colspan="6">Carregando...</td></tr>
              <tr v-else-if="orcamentos.length === 0" class="empty"><td colspan="6">Nenhum Orcamento...</td></tr>
              <tr v-else v-for="(item, index) in orcamentos" :key="item.id">
                <td v-if="index < 5">{{ item.id }}</td>
                <td v-if="index < 5">{{ item.cliente }}</td>
                <td v-if="index < 5">{{ new Date(item.updatedAt).toLocaleDateString() }}</td>
                <td v-if="index < 5"><span>{{ item.status }}</span></td>
                <td v-if="index < 5">R$ {{ parseFloat(item.valorTotal).toFixed(2)}}</td>
                <td v-if="index < 5">
                    <div class="options">
                        <button class="btn btn-outline-light text-dark">Ver</button>
                        <button class="btn btn-outline-light text-dark">Editar</button>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  </template>
  
<script>
  import router from '@/router';
  import store from '@/store';
  import Sidebar from '@/components/Sidebar.vue';

  export default {
    data() {
      return {
        loading: false,
        error: "",
      }
    },
    components:{
      Sidebar,
    },
    computed: {
      orcamentos(){
        return store.getters.orcamentos
      },
      numOrcamentosAbertos(){
        let qtd = 0
        
        for(let i = 0; i < this.orcamentos.length; i++){
          if(this.orcamentos[i].status === 'Aberto'){
            qtd++
          }
        }
        return qtd
      },
      numOrcamentosFinalizados(){
        let qtd = 0

        for(let i = 0; i < this.orcamentos.length; i++){
          if(this.orcamentos[i].status === 'Finalizado'){
            qtd++
          }
        }
        return qtd
      },
      numOrcamentosEmAndamento(){
        let qtd = 0

        for(let i = 0; i < this.orcamentos.length; i++){
          if(this.orcamentos[i].status === 'Em andamento'){
            qtd++
          }
        }
        return qtd
      },
      numOrcamentosTotal(){
        return this.orcamentos.length
      },
    },
    async mounted(){
      this.loading = true
      const result = await store.dispatch('fetchOrcamentos')

      if(result.status === 401 || result.status === 403){
        this.error = result.message
        alert(this.error)
        store.dispatch('auth/logout')
        router.push('login')
      }

      this.loading = false
    },
    methods:{
      logout(){
        store.dispatch('auth/logout')
        store.dispatch('clear')
        router.push('login')
      },

    }
  };
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
  
  /* --- Cards Dashboard --- */
  .cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
  .card { background: white; padding: 15px; border-radius: 8px; display: flex; flex-direction: column; }
  .card__label { font-size: 14px; color: gray; }
  .card__value { font-size: 22px; margin-top: 8px; font-weight: bold; }
  
  /* --- Tabela --- */
  .table-section h2 { margin-bottom: 20px; }
  .table-section {
    background: white;
    padding: 20px;
    border-width: 1px;
    border-radius: 10px;
    border-color: rgba(212, 211, 211);
    border-style: solid;
  }
  
  .loading, .empty{
    margin: auto;
    text-align: center;
    padding: 2rem;
    color: #666;
  }
</style>
