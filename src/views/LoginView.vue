<template>
  <div class="login-container">
    <div class="welcome">
      <h1 class="welcome-title">PennyWise</h1>
      <h3 class="welcome-slogan">O jeito inteligente de <br/>controlar o seu dinheiro</h3>
    </div>
    <div v-if="this.selectedLogin == true" class="login-wrapper">
      <h1 :style="{color: '#00B894', textAlign: 'center'}">Faça login para continuar</h1>
      <input type="email" placeholder="E-mail" v-model="email">
      <input type="password" placeholder="Senha" v-model="senha">
      <button @click="handleLogin">LOGIN</button>
      <h2 :style="{color: '#00B894', textAlign: 'center'}">OU CADASTRE-SE</h2>
      <button @click="changeLogin">CADASTRE-SE</button>
      <p :style="{fontSize: '12px', color: '#fff'}">Made with ❤️ by Bernardo Matuchewski</p>
    </div>
    <div v-else class="login-wrapper">
      <h1 :style="{color: '#00B894', textAlign: 'center'}">Cadastre sua conta</h1>
      <input type="text" placeholder="Your name" v-model="name">
      <input type="email" placeholder="E-mail" v-model="email">
      <input type="password" placeholder="Senha" v-model="senha">
      <input type="tel" placeholder="Telefone" v-model="telefone">
      <button @click="handleRegister">CADASTRAR</button>
      <h2 :style="{color: '#00B894', textAlign: 'center'}">OU LOGUE SUA CONTA</h2>
      <button @click="changeLogin">LOGAR</button>
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
    name: '',
    email: '',
    senha: '',
    telefone: '',
    user: {},
    userRef: null,
    allUsers: []
  }),
  mounted() {
    this.fetchUserData()
  },
  methods: {
    handleRegister() {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      firebase.auth().createUserWithEmailAndPassword(this.email, this.senha)
      .then((userCredentials) => {
        const user = userCredentials.user
        this.user = user
      })
      .then(() => {
        const data = {
          userName: this.name,
          userEmail: this.email,
          userNumber: this.telefone,
          userTotal: 0,
          createdAt: timestamp
        }
        this.userRef
        .add(data)
        .then(() => {
          this.name = ''
          this.email = ''
          this.senha = ''
          this.telefone = ''
        })
      })
      .catch(error => alert(error.message))
      this.selectedLogin = !this.selectedLogin
    },

    handleLogin() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.senha)
      .then(() => {
        let data = {}
        for (let user of this.allUsers) {
          if (user.email == this.email) {
            data = user
          }
        }

        this.router.push({name: '/', params: { user: data }})
      })
    },

    changeLogin() {
      this.selectedLogin = !this.selectedLogin

    },

    fetchUserData() {
      this.userRef = firebase.firestore().collection('users')

      this.userRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapchot => {
        const usuarios = []
        querySnapchot.forEach(doc => {
          const user = doc.data()
          usuarios.push({
            id: doc.id,
            user
          })  
        })
        this.allUsers = usuarios
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
  color: #fff;
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