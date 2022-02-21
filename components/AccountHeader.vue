<template>
  <div class="header-footer">
    <b-row>
      <b-col>
        <p>
          <b>{{ myAccount.name }}</b>
        </p>
        <p>
          <b>Monde : </b>
          {{ myWorld.name }}
        </p>
      </b-col>
      <b-col>
        <p>
          <b>Date de création du compte : </b>
          {{ convertToLocaleDateString(myAccount.created) }}
        </p>
        <p>
          <b>Temps de jeu : </b>
          {{ Math.floor(myAccount.age / 3600) }} heures,
          {{ Math.floor((myAccount.age % 3600) / 60) }} minutes
          <span v-if="Math.floor(myAccount.age % 60)">
            et {{ Math.floor(myAccount.age % 60) }} secondes</span
          >
        </p>
      </b-col>
      <b-col>
        <p>
          <b>Niveau fractal : </b>
          {{ myAccount.fractal_level }}
        </p>
        <p>
          <b>Rang WvW : </b>
          {{ myAccount.wvw_rank }}
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'AccountHeader',
  data() {
    return {
      myAccount: {},
      myWorld: {},
    }
  },
  async fetch() {
    this.myAccount = await this.$axios.$get(
      '/gw2-api/account'
    )
    this.myWorld = await this.$axios.$get(
      `/gw2-api/worlds?id=${this.myAccount.world}&lang=fr`
    )
  },
  fetchKey: 'account-header',
  methods: {
    convertToLocaleDateString(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
      })
    },
  },
}
</script>

<style scoped>
.header-footer {
  padding-top: 0.5em;
  padding-left: 0.5em;
}
</style>
