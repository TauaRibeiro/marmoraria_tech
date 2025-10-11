Poderia recriar essa página para utilizar bootstrap ao invés de CSS padrão?
<template>
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <h2 class="sidebar__title">Marmoraria Tech</h2>
        <hr>
        <nav class="sidebar__menu">
            <button class="sidebar-btn-active btn">Dashboard</button>
            <button class="sidebar-btn btn">Orçamentos</button>
            <button class="sidebar-btn btn">Clientes</button>
            <button class="sidebar-btn btn">Materiais</button>
            <button class="sidebar-btn btn">Status</button>
            <button class="sidebar-btn btn">Funcionarios</button>
        </nav>
        <hr>
        <button class="btn-logout btn">Sair</button>
      </aside>
  
      <!-- Main Content -->
      <main class="content">
        <header class="content__header">
          <h1>Dashboard</h1>
          <button class="btn primary-btn">Novo Orçamento</button>
        </header>
  
        <!-- Cards -->
        <div class="cards">
          <div class="card">
            <span class="card__label">Orçamentos Abertos</span>
            <span class="card__value">2</span>
          </div>
          <div class="card">
            <span class="card__label">Em Andamento</span>
            <span class="card__value">1</span>
          </div>
          <div class="card">
            <span class="card__label">Finalizados</span>
            <span class="card__value">1</span>
          </div>
          <div class="card">
            <span class="card__label">Total de Orçamentos</span>
            <span class="card__value">4</span>
          </div>
        </div>
  
        <!-- Tabela -->
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
              <tr v-for="item in data" :key="item.id">
                <td>#{{ item.id }}</td>
                <td>{{ item.cliente }}</td>
                <td>{{ item.data }}</td>
                <td><span>{{ item.status }}</span></td>
                <td>R$ {{ item.valor }}</td>
                <td>
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
    export default {
      data() {
        return {
          data: [
            { id: 1, cliente: 'João Silva', data: '2023-10-15', status: 'Aberto', statusClass: 'open', valor: '2.500,00' },
            { id: 2, cliente: 'Maria Oliveira', data: '2023-10-14', status: 'Em Andamento', statusClass: 'progress', valor: '3.200,00' },
            { id: 3, cliente: 'Carlos Santos', data: '2023-10-12', status: 'Finalizado', statusClass: 'done', valor: '1.800,00' },
            { id: 4, cliente: 'Ana Ferreira', data: '2023-10-10', status: 'Aberto', statusClass: 'open', valor: '4.100,00' },
          ],
        };
      },
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
    .table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; }
    .table th, .table td { padding: 10px; border-bottom: 1px solid #eee; text-align: left; }
    .status { padding: 3px 8px; border-radius: 12px; font-size: 12px; }
    .status--open { background: #fff3cd; color: #856404; }
    .status--progress { background: #cce5ff; color: #004085; }
    .status--done { background: #d4edda; color: #155724; }
  </style>
  