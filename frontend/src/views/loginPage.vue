<template>
    <main class="min-vh-100 d-flex justify-content-center align-items-center">
      <div class="card p-4 shadow" style="max-width: 400px; width: 100%">
        <div class="card-body">
          <h3 class="fs-2 fw-bold mb-1 text-center">Marmoraria Tech</h3>
          <p class="text-muted text-center mb-4">Faça seu login abaixo</p>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <InputComponent 
                type="email" 
                placeholder="Digite seu email" 
                id="email" 
                :required= true>Email</InputComponent>
            </div>
            <div class="mb-3">
              <InputComponent 
                type="password" 
                placeholder="Digite sua senha" 
                id="senha" 
                :required= true>Senha</InputComponent>
            </div>
            <div class="d-grid">
              <ButtonComponent type="submit" cls="btn btn-primary" :disabled= "loading">Entrar</ButtonComponent>
            </div> 
          </form>
        </div>
      </div>
      </main>
</template>

<script>
    import InputComponent from '@/components/Input.vue'
    import ButtonComponent from '@/components/Button.vue'

    export default{
        components:{
            InputComponent,
            ButtonComponent,
        },
        data(){
            return {
                credentials: {
                    login: "",
                    senha: "",
                },
                loading: false,
                error: "",
            }
        },
        methods: {
            async handleLogin(){
                this.loading = true
                this.error = ""

                const result = await this.$store.dispatch('auth/login', this.credentials)

                console.log("Resultado do store: ", result)
                if(result.success){
                    this.$router.push('/home')
                }else{
                    this.error = result.message
                }

                this.loading = false
            }
        }
    }
</script>

<style>
</style>