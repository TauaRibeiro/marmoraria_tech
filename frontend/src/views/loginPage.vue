<template>
  <div class="login-page d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div class="login-container card shadow border-danger" style="max-width: 400px; width: 100%;">
      <div class="card-body text-center p-4">
        
        <header class="login-header mb-4">
          <h1 class="h4 mb-2 text-dark">Marmoraria Tech</h1>
          <p class="text-muted mb-0">Área restrita para colaboradores da empresa</p>
        </header>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="mb-3 text-start">
            <DefaultInput
              type="email"
              id="login"
              placeholder="seu@email.com"
              :required= true
              v-model="credentials.login"
              >Email</DefaultInput>
          </div>

          <div class="mb-3 text-start">
            <DefaultInput 
              type="password"
              id="senha"
              :required=true
              v-model="credentials.senha"
            >Senha</DefaultInput>
          </div>

          <SubmitButton :disabled=loading>Entrar</SubmitButton>
        </form>

        <footer class="login-footer mt-4">
          <p class="text-muted small mb-0">© 2025 Marmoraria Tech. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
    import DefaultInput from '@/components/Input.vue'
    import SubmitButton from '@/components/SubmitButton.vue'
    import store from '@/store';

    export default{
        components:{
            DefaultInput,
            SubmitButton,
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

                console.log(this.credentials)
                const result = await store.dispatch('auth/login', this.credentials)

                console.log("Resultado do store: ", result)
                if(result.success){
                  console.log('Chamei o redirecionamento')
                    this.$router.push('/home')
                }else{
                    alert(result.message)
                }

                this.loading = false
            }
        }
    }
</script>

<style scoped>
    .login-page { 
      display: flex; 
      min-height: 100vh;
      min-width: 100vh;
      background: #f6f6f6; 
      justify-content: space-between;
      width: 100cqmax;
    }
</style>
      