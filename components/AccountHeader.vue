<template>
  <div>
    <div class="header-title">
      <h1>
        <img src="~/static/gw2_white_logo.png" height="50" />
        {{ title }}
      </h1>
      <b-button
        pill
        class="btn bi bi-arrow-clockwise"
        variant="outline-light"
        @click="forceRerender"
      ></b-button>
    </div>
    <div class="header-content">
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
  </div>
</template>

<script>
export default {
  name: 'AccountHeader',
  props: {
    title: {
      type: String,
      default: 'Default Title'
    }
  },
  data() {
    return {
      myAccount: {},
      myWorld: {},
    }
  },
  async fetch() {
    this.myAccount = await this.$axios.$get('/gw2-api/account')
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
    forceRerender(child) {
      this.$emit('forceRerender');
    },
  },
}
</script>

<style scoped>
.header-title {
  padding-top: 0.5em;
  padding-left: 0.5em;
  padding-bottom: 0.1em;
  padding-right: 0.5em;
  background-color: #bd0f0f;
  color: white;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header-title .btn {
  font-size: 1.5em;
  align-self: center;
  border: none;
}

.header-content {
  padding-top: 1em;
  padding-left: 1em;
  background-color: #bd0f0f;
  color: white;
}

</style>
