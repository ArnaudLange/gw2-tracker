<template>
  <div class="apiKey">
    <div class="header">
      <account-header
        title="Account Tracker - Log In"
        :connected="false"
      />
    </div>
    <div class="body">
      <div class="form-container">
        <img src="~/static/lost.png" />
        <b-form class="api-form" @submit="onSubmit">
          <b-form-input
            id="apiKey"
            v-model="form.key"
            placeholder="Entrez votre clé API"
            required
          ></b-form-input>
          <b-button type="submit" variant="primary">Valider</b-button>
        </b-form>
        <a href="https://account.arena.net/applications" target="_blank"
          >Pas de clé d'API ? Cliquez ici !</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert2'

export default {
  name: 'ApiKey',
  data() {
    return {
      form: {
        key: '',
      },
      validated: true,
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      try {
        await this.$axios.$get(`/gw2-api/account?access_token=${this.form.key}`)
        this.validated = true
      } catch (e) {
        this.validated = false
      }
      if (this.validated) {
        this.$store.commit('saveToken', this.form.key)
        this.$router.push('/')
      } else {
        swal.fire({
          title: `Oups !`,
          text: `Attention, la clé rentrée est invalide`,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-primary',
        })
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Oswald|Roboto:400,700');
@import url('bootstrap-icons');

.apiKey {
  font-family: 'Roboto';
}

.body {
  padding-top: 4em;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.api-form {
  display: flex;
  flex-direction: row;
}
</style>
