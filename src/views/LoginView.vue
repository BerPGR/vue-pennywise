<template>
  <div class="login-container">
    <div class="welcome">
      <h1 class="welcome-title">PennyWise</h1>
      <h3 class="welcome-slogan">O jeito inteligente de <br/>controlar o seu dinheiro</h3>
    </div>
    <div v-if="selectedLogin == true" class="login-wrapper">
      <h1 :style="{color: '#00B894'}">Faça login para continuar</h1>
      <input type="email" placeholder="E-mail" v-model="email">
      <input type="password" placeholder="Senha" v-model="senha">
      <button @click="handleLogin">LOGIN</button>
      <h2 :style="{color: '#00B894'}">OU CADASTRE-SE</h2>
      <button @click="selectedLogin = !selectedLogin">CADASTRE-SE</button>
      <p :style="{fontSize: '12px', color: '#fff'}">Made with ❤️ by Bernardo Matuchewski</p>
    </div>
    <div v-else class="login-wrapper">
      <h1 :style="{color: '#00B894'}">Cadastre sua conta</h1>
      <input type="email" placeholder="E-mail" v-model="email">
      <input type="password" placeholder="Senha" v-model="senha">
      <input type="tel" placeholder="Telefone" v-model="telefone">
      <button @click="handleRegister">CADASTRAR</button>
      <h2 :style="{color: '#00B894'}">OU LOGUE SUA CONTA</h2>
      <button @click="selectedLogin = !selectedLogin">LOGAR</button>
      <p :style="{fontSize: '12px', color: '#fff'}">Made with ❤️ by Bernardo Matuchewski</p>
    </div>
  </div>
</template>

<script>
import firebase from '../../firebaseConfig'

export default {
  name:'LoginScreen',
  data: () => ({
    selectedLogin: true,
    email: '',
    senha: '',
    telefone: '',
    user: {}
  }),
  methods: {
    handleRegister() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.senha)
      .then((userCredentials) => {
        const user = userCredentials.user
        alert(user)
      })
      .catch(error => alert(error.message))

      this.email = ''
      this.senha = ''
      this.telefone = ''

      this.selectedLogin = !this.selectedLogin
    },
    handleLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.senha)
      .then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
button {
  margin: 20px 0;
  width: 50%;
  padding: 10px;
  border-radius: 20px;
  border: none;
  background-color: #00B894;
  color: #001F3F;
  font-weight: bold;
  cursor: pointer;
}

input {
  background-color: transparent;
  border-radius: 20px;
  border: 1px solid #00B894;
  color: #00B894;
  padding: 12px;
  width: 70%;
  margin-top: 20px;
  opacity: 1
}

::placeholder {
    color: #fff;
}
.login-container {
  min-height: 100vh;
  background-image: url("../assets/loginBackground.svg");
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.welcome-title {
  font-size: 50px;
  color: #00B894;
  padding-bottom: 30px;
}
.welcome-slogan {
  padding-top: 60px;
  font-size: 30px;
  color: #001F3F;
}

.login-wrapper {
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #001F3F;
  border-radius: 20px;
  opacity: 0.9;
  box-shadow: 4px 8px 10px #001F3F;
}
</style>