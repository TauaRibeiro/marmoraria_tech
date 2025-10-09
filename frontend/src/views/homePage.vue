<template>
    <div class="homePage">
        <div class="side-menu">
            <h1>Marmoraria Tech</h1>

            <div class="options">
                
                <button>Dashboard</button>
                <button>Clientes</button>
                <button>Funcionarios</button>
                <button>Materiais</button>
                <button>Status</button>
                <button>Orçamentos</button>
                
    
                <button>Sair</button>
            </div>
        </div>

        <main class="">
            <h1>Dashboard</h1>    
    
            <div class="cards">
                <div>
                    <p>Orçamentos Abertos</p>
                    <h1>1</h1>
                </div>
                <div>
                    <p>Em andamento</p>
                    <h1>1</h1>
                </div>
                <div>
                    <p>Finalizados</p>
                    <h1>0</h1>
                </div>
                <div>
                    <p>Total orçamentos</p>
                    <h1>1</h1>
                </div>
            </div>
            
            <div class="orcamento">
                <h1>Orçamentos Recentes</h1>

                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Cliente teste</td>
                            <td>08/10/2025</td>
                            <td>Aberto</td>
                            <td>R$ 2000,00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</template>

<script>
</script>

<style>

.homePage{
    display: flex;
    flex-direction: row;
    width: 100rem;
    height: 46.11rem;
    /*background-color: black;*/
    flex-grow: 1;
}

.options{
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
}
</style>