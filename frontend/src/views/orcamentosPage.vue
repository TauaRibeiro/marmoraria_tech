<template>
    <div class="layout">
        <div class="orcamento-container d-flex w-100">
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
            
        </div>
    </div>
</template>

<script>
export default {
  name: 'orcamentoPage',  
  data(){
  
  },
  components: {
  }
}
</script>

<style scoped>
  /* Configuração Layout */
  .layout { 
      display: flex; 
      min-height: 100vh;
      min-width: 100vh;
      background: #f6f6f6; 
      justify-content: space-between;
      width: 100cqmax;
  }
  /* Container*/
  .orcamentos-container {
      background-color: red;
  }

  /* Sidebar */
  .sidebar { 
      width: 280px; 
      background: #fff; 
      padding-top: 20px; 
      padding-bottom: 20px; 
      display: flex; 
      flex-direction: column; 
      border-right: 1px solid #eee;
      height: 100%;
  }
  .sidebar__title { margin-bottom: 20px; margin-left: 10px }
  .sidebar__menu { display: flex; flex-direction: column; gap: 10px; flex: 1; }

  .sidebar-btn-active {
    background-color: rgba(221, 221, 221, 0.466);
  }

  .sidebar-btn-active:active {
    background-color: rgba(221, 221, 221, 0.466);
  }

  /* Botões */
  .btn-logout {
    color: red;
    width: 100%;
    border-radius: 0;
    margin: 0px;
    align-self: flex-end;
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
  
</style>