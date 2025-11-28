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
      />

      <main class="content w-100 m-3">
        <header class="d-flex flex-row justify-content-between mb-5">
          <h1>Orçamentos</h1>
          <button class="btn btn-primary" @click="criarOrcamento">Novo Orçamento +</button>
        </header>

        <div class="search-bar d-flex flex-row justify-content-between">
          <div class="search-filds d-flex flex-row">
            <label for="id" id="idLabel">
              <b>Id:</b><br>
              <input class="form-control p-1 " type="text" id="id" name="id" v-model="idOrcamento">
            </label>
            
            <label for="status">
              <b>Status:</b><br> 
              <input class="form-control p-1 " type="text" id="status" list="tipos-status" name="status" v-model="statusOrcamento">
              <datalist id="tipos-status">
                <option value="Em andamento"></option>
                <option value="Finalizado"></option>
                <option value="Cancelado"></option>
                <option value="Aguardando pagamento"></option>
              </datalist>
            </label>
            
            <label for="nome">
              <b>Nome do clinte:</b> <br>
              <input class="form-control p-1 " type="text" id="nome" name="nome" v-model="nomeCliente">
            </label>
  
            <label for="cpf">
              <b>CPF:</b> <br>
              <input class="form-control p-1 " type="text" id="cpf" name="cpf" v-model="cpfCliente">
            </label>

            <label for="email">
            <b>Email:</b><br>
            <input class="form-control p-1 " type="email" id="email" name="email" v-model="emailCliente">
          </label>
          
          <label for="telefone">
            <b>Telefone:</b><br>
            <input class="form-control p-1 " type="text" id="telefone" name="telefone" v-model="telefoneCliente">
          </label>
          </div>
          <button class="btn btn-primary" @click="recarregar()">Recarregar</button>
        </div>

        <div class="orcamentos-list">
          <div v-if="loading">
            <p>Carregando...</p>
          </div>
          <div v-else-if="orcamentos.length == 0">
            <p>Nenhum orçamento encontrado</p>
          </div>
          <div v-else class="orcamento"  v-for="orcamento in orcamentos" :key="orcamento.id">
            <div class="card">
              <div class="card-header">
                <h2>{{ orcamento.id }}</h2>
              </div>
            </div>
            <div class="card-body">
              {{ console.log(orcamentos) }}
              <p><b>Nome do cliente:</b> {{ orcamento.cliente }}</p>
              <p><b>CPF:</b> {{ orcamento.cpf }}</p>
              <p><b>Email:</b> {{ orcamento.email}}</p>
              <p><b>Telefone:</b> {{ orcamento.telefone }}</p>
              <p><b>Status:</b> {{ orcamento.status }}</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary">Ver</button>
              <button class="btn btn-primary">Editar</button>
              <button class="btn btn-danger">Deletar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>

<script>
import router from '@/router';
import store from '@/store';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'orcamentoPage',  
  components: {
    Sidebar,
  },
  data(){
    return {
      idOrcamento: "",
      statusOrcamento: "",
      nomeCliente: "",
      cpfCliente: "",
      emailCliente: "",
      telefoneCliente: "",
      loading: false,
      error: null,
    }
  },
  computed: {
    orcamentos(){
      let result = store.getters.orcamentos
      
      if(this.idOrcamento){
        result = result.filter((o) => o.id.includes(this.idOrcamento))
      }

      if(this.statusOrcamento){
        result = result.filter((o) => o.status.includes(this.statusOrcamento))
      }

      if(this.nomeCliente){
        result = result.filter((o) => o.cliente.includes(this.nomeCliente))
      }

      if(this.cpfCliente){
        result = result.filter((o) => o.cpf.includes(this.cpfCliente))
      }

      if(this.emailCliente){
        result = result.filter((o) => o.email.includes(this.emailCliente))
      }

      if(this.telefoneCliente){
        result = result.filter((o) => o.telefone.include(this.telefoneCliente))
      }

      return result
    },
    status(){
      return store.getters.status
    },
  },
  async mounted(){
    const resultStatus = await store.dispatch('fetchStatus')

    if(resultStatus.status === 401 || resultStatus.status === 403){
      alert(resultStatus.message)
      store.dispatch('auth/logout')
      router.push('login')
    }

    const resultOrcamento = await store.dispatch('fetchOrcamentos')

    if(resultOrcamento.status === 401 || resultOrcamento.status === 403){
      alert(resultOrcamento.message)
      store.dispatch('auth/logout')
      router.push('login')
    }
  },
  methods: {
    async recarregar(){
      this.loading = true
      const resultOrcamento = await store.dispatch('fetchOrcamentos', true)
      
      this.loading = false
      if(resultOrcamento.status === 401 || resultOrcamento.status === 403){
        alert(resultOrcamento.message)
        store.dispatch('auth/logout')
        router.push('login')
      }
    },
    criarOrcamento(){
      router.push('/orcamentos/novoOrcamento')
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

  /* SEARCH BAR */
  .search-bar {
    background-color: white;
    padding: 20px 10px 20px 10px;
    border-radius: 8px;
    border-style: solid;
    border-color: rgba(212, 211, 211);
    border-width: 1px;
    margin-bottom: 10px;
    row-gap: 10px;
  }

  .search-filds {
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
  }

  .orcamentos-list {
    position: relative;
    background-color: white;
    padding: 20px 10px 30px 10px;
    border-radius: 8px;
    border-style: solid;
    border-color: rgba(212, 211, 211);
    border-width: 1px;
    max-height: 52vh;
    overflow-y: auto;
  }

  .card-body {
    font-size: large;
  }

  .card-footer {
    display: flex;
    gap: 10px;
  }

  /* ORÇAMENTO */

  .orcamento{
    margin-bottom: 20px;
    padding: 10px;
    background-color: #eee;
    border-radius: 10px;
    border-color: grey;
    border-style: solid;
    border-width: 3px;
  }
</style>