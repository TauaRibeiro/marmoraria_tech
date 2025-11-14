<template>
    <aside class="sidebar">
        <h2 class="sidebar__title">Marmoraria Tech</h2>
        <hr>
        <nav class="sidebar__menu">
            <button 
                v-for="field in fields" :key="field" :class="(field.name.includes(current)) ? 'sidebar-btn-active btn':'sidebar-btn btn'"
                @click="redirecionar(field.destiny, current)"
            >
                {{ field.name }}
            </button>
        </nav>
        <hr>
        <button @click="logout" class="btn-logout btn">Sair</button>
    </aside>
</template>

<script>
    import store from '@/store';
    import router from '@/router';
    
    export default{
        name: 'Sidebar-component',
        props:{
            fields: {
                type: Array,
                required: true
            },
            current: {
                type: String,
            }
        },
        methods:{
            logout(){
                store.dispatch('auth/logout')
                store.dispatch('clear')
                router.push('login')
            },
            redirecionar(destino, atual){
                if(!atual.includes(destino)){
                    router.push(destino)
                }
            },
        },
    }
</script>

<style scoped>
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

    .btn-logout {
        color: red;
        width: 100%;
        border-radius: 0;
        margin: 0px;
    }

    .btn-logout:hover {
        background-color: lightcoral;
    }
</style>