<template>
  <div class="container mt-5">
    <div v-if="error.statusCode === 404" class="error">
      <img src="~/static/404.png" />
      <h1>Oh non, la page que tu cherches n'existe pas</h1>
    </div>
    <div v-else class="error">
      <img src="~/static/construction.png" />
      <h1>Oh non, on dirait que quelque chose est cassé, on va s'occuper de ça</h1>
    </div>
    <NuxtLink to="/">Retourner à l'accueil</NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'error',
  props: {
    error: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
}
</style>
