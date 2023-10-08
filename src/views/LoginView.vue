<template>
  <div class="login-container">
    <div class="welcome">
      <h1>{{ title }}</h1>
      <h3>{{ slogan }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name:'LoginScreen',
  data: () => ({
    title: 'PennyWise',
    slogan: 'O jeito inteligente de controlar o seu dinheiro'
  })
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-image: url("../assets/loginBackground.svg");
  display: flex;
  flex-direction: row;
  align-items: center;
}

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>