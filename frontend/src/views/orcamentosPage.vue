<template>
    <div class="layout">
      <aside class="sidebar">
        <h2 class="sidebar__title">Marmoraria Tech</h2>
        <hr>
        <nav class="sidebar__menu">
            <button class="sidebar-btn btn">Dashboard</button>
            <button class="sidebar-btn-active btn">Orçamentos</button>
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
          <h1>Orçamentos</h1>
          <button class="btn btn-primary">Novo Orçamento +</button>
        </header>

        <div class="search-bar d-flex flex-row justify-content-between">
          <div class="search-filds">
            <label for="id">
              <b>Id:</b> 
              <input type="text" id="id" name="id">
            </label>
            
            <label for="status">
              <b>Status:</b> 
              <input type="text" id="status" list="tipos-status" name="status">
              <datalist id="tipos-status">
                <option value="Em andamento"></option>
                <option value="Finalizado"></option>
                <option value="Cancelado"></option>
                <option value="Aguardando pagamento"></option>
              </datalist>
            </label>
            
            <label for="cliente">
              <b>Cliente:</b> 
              <input type="text" id="cliente" name="cliente">
            </label>
  
            <label for="data">
              <b>Data:</b> 
              <input type="Date" id="data" name="data">
            </label>
          </div>

          <button class="btn btn-primary">Pesquisar</button>
        </div>

        <div class="orcamentos-list">
          <div class="card">
            <div class="card-header">
              <h2>9289328302923892</h2>
            </div>
            <div class="card-body">
              <p><b>Cliente:</b> João</p>
              <p><b>Status:</b> Em andamento</p>
              <p><b>Valor Total:</b> R$ 2.500,00</p>
              <p><b>Data orçamento:</b> 06/05/2020</p>
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
export default {
  name: 'orcamentoPage',  
  data(){
  
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
  .content__header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 20px; 
  }
  
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
    /* border-radius: 5px;
    padding: 10px; */
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

  /* SEARCH BAR */
  .search-bar {
    background-color: white;
    padding: 20px 10px 20px 10px;
    border-radius: 8px;
    border-style: solid;
    border-color: rgba(212, 211, 211);
    border-width: 1px;
    margin-bottom: 30px;
  }

  input {
    border-radius: 8px;
    border-style: solid;
    border-color: rgb(59, 59, 59);
    border-width: 1px;
    margin-right: 20px;
    margin-left: 10px;
    padding: 3px;
  }

  /* ORÇAMENTOS LIST */
  .orcamentos-list {
    position: relative;
    background-color: white;
    padding: 20px 10px 20px 10px;
    border-radius: 8px;
    border-style: solid;
    border-color: rgba(212, 211, 211);
    border-width: 1px;
    max-height: 500px;
    overflow-y: auto;
  }

  .card-body {
    font-size: large;
  }

  .card-footer {
    display: flex;
    gap: 10px;
  }

</style>