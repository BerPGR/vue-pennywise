<template>
  <div class="login-container">
    <div class="welcome">
      <h1 class="welcome-title">PennyWise</h1>
      <h3 class="welcome-slogan">O jeito inteligente de <br/>controlar o seu dinheiro</h3>
    </div>
    <div v-if="selectedLogin == true" class="login-wrapper">
      <h1 :style="{color: '#001F3F'}">Faça login para continuar</h1>
      <input type="email" placeholder="E-mail" v-model="email">
      <input type="password" placeholder="Senha" v-model="senha">
      <button>LOGIN</button>
      <h2>OU CADASTRE-SE</h2>
      <button @click="selectedLogin = !selectedLogin">CADASTRE-SE</button>
      <p :style="{fontSize: '12px'}">Made with ❤️ by Bernardo Matuchewski</p>
    </div>
    <div v-else class="login-wrapper">
      <h1 :style="{color: '#001F3F'}">Cadastre sua conta</h1>
      <input type="email" placeholder="E-mail" v-model="email">
      <input type="password" placeholder="Senha" v-model="senha">
      <input type="tel" placeholder="Telefone" v-model="telefone">
      <button @click="handleRegister">CADASTRAR</button>
      <h2 :style="{color: '#001F3F'}">OU LOGUE SUA CONTA</h2>
      <button @click="selectedLogin = !selectedLogin">LOGAR</button>
      <p :style="{fontSize: '12px'}">Made with ❤️ by Bernardo Matuchewski</p>
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
        console.log(user);
        alert('Usuario registrado')
      })
      .catch(error => alert(error.message))

      this.email = ''
      this.senha = ''
      this.teledone = ''
    }
  }
}
</script>

<style scoped>
button {
  margin: 20px 0;
  width: 30%;
  padding: 10px;
  border-radius: 20px;
  border: none;
  background-color: #001F3F;
  color: #D3D3D3;
  font-weight: bold;
  cursor: pointer;
}

input {
  background-color: transparent;
  border-radius: 20px;
  border: 1px solid #001F3F;
  padding: 12px;
  width: 70%;
  margin-top: 20px;
  opacity: 1
}

::placeholder {
    color: #001F3F;
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
  background-color: #FFD700;
  border-radius: 20px;
  opacity: 0.8;
  box-shadow: 4px 8px 10px #D3D3D3;
}
</style>