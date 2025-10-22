<template>
    <div class="layout">
      <aside class="sidebar">
        <h2 class="sidebar__title">Marmoraria Tech</h2>
        <hr>
        <nav class="sidebar__menu">
            <button class="sidebar-btn btn">Dashboard</button>
            <button class="sidebar-btn btn">Orçamentos</button>
            <button class="sidebar-btn btn">Clientes</button>
            <button class="sidebar-btn btn">Materiais</button>
            <button class="sidebar-btn btn">Status</button>
            <button class="sidebar-btn btn">Funcionarios</button>
        </nav>
        <hr>
        <button @click="logout" class="btn-logout btn">Sair</button>
      </aside>
  
      <main class="content">
        <header class="content__header">
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
                        <button class="btn-options btn">Ver</button>
                        <button class="btn-options btn">Editar</button>
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

  export default {
    data() {
      return {
        
      }
    },
    computed: {
      loading(){
        return store.getters.loading
      },
      orcamentos(){
        return store.getters.orcamentos
      },
      error(){
        return store.getters.error
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
      console.log(this.loading)
      const result = await store.dispatch('fetchOrcamentos')

      if(result.status === 401 || result.status === 403){
        alert(result.message)
        store.dispatch('auth/logout')
        router.push('login')
      }

    },
    methods:{
      logout(){
        store.dispatch('auth/logout')
        router.push('login')
      },

    }
  };
</script>
    
<style scoped>
  /* --- Reset simples --- */
  /* * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; } */
  
  .layout { 
    display: flex; 
    min-height: 100vh;
    min-width: 100vh;
    background: #f6f6f6; 
    justify-content: space-between;
    width: 100cqmax;
  }
  
  /* --- Sidebar --- */
  .sidebar { width: 280px; background: #fff; padding-top: 20px; padding-bottom: 20px; display: flex; flex-direction: column; border-right: 1px solid #eee; }
  .sidebar__title { margin-bottom: 20px; margin-left: 10px }
  .sidebar__menu { display: flex; flex-direction: column; gap: 10px; flex: 1; }

  .sidebar-btn-active {
    background-color: rgba(221, 221, 221, 0.466);
  }

  .sidebar-btn-active:active {
    background-color: rgba(221, 221, 221, 0.466);
  }

  .sidebar__link.active, .sidebar__link:hover { background: #f0f0f0; }
  .sidebar__logout { margin-top: auto; padding: 8px; background: none; border: none; color: #d9534f; cursor: pointer; }
  
  /* --- Content --- */
  .content {
    flex: 1;
    padding: 20px 40px;
    width: 100vh;
    margin: 0 auto; /* Centraliza no espaço disponível */
    }
  .content__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
  
  /*----Options----- */
  .options {
    display: flex;
    gap: 15px;
  }
  
  .btn-logout {
    color: red;
    width: 100%;
    border-radius: 0;
    margin: 0px;
  }

  .btn-logout:hover {
    background-color: lightcoral;
  }
  
  .btn {
    border-radius: 5px;
    padding: 10px;
    text-align: left;
  }
  
  .sidebar-btn {
    border: none;
    background-color: #fff;
  }

  .sidebar-btn:hover{
    background-color: rgba(221, 221, 221, 0.466);
  }

  .btn-options {
    padding-top: 1px;
    padding-bottom: 1px;
    padding-left: 5px;
    padding-right: 5px;
    border-style: solid;
    border-color: rgba(221, 221, 221, 0.466);
  }

  .btn-options:hover {
    background-color: rgba(221, 221, 221, 0.466);
  }

  .primary-btn {
    background-color: rgb(2, 2, 87);
    color: white;
  }

  .primary-btn:hover {
    background-color: rgb(3, 3, 179);
  }

  .primary-btn:active {
    color: white;
    background-color: rgb(2, 2, 87);
  }

  .btn:active {
    border-color: transparent;
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
