<template>
  <div class="home">
    <div class="header-title">
      <h1>
        <img src="~/static/gw2_white_logo.png" height="50" />
        Account Tracker
      </h1>
    </div>
    <div class="header-content">
      <account-header />
    </div>
    <div class="body">
      <b-row>
        <b-col>
          <account-wallet />
        </b-col>
        <b-col>
          <account-titles />
        </b-col>
        <b-col>
          <account-masteries />
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import AccountHeader from '~/components/AccountHeader.vue'
import AccountMasteries from '~/components/AccountMasteries.vue'
import AccountTitles from '~/components/AccountTitles.vue'
import AccountWallet from '~/components/AccountWallet.vue'
export default {
  name: 'IndexPage',
  components: { AccountHeader, AccountWallet, AccountTitles, AccountMasteries },
  async asyncData({ $axios }) {
    await $axios.setToken(process.env.TOKEN, 'Bearer')
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald|Roboto:400,700');

.home {
  font-family: 'Roboto';
}

.header-title {
  padding-top: 0.5em;
  padding-left: 0.5em;
  padding-bottom: 0.1em;
  background-color: #bd0f0f;
  color: white;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.04);
}

.header-content {
  padding-top: 0.5em;
  padding-left: 0.5em;
  background-color: #bd0f0f;
  color: white;
}

.body {
  background-color: #f7fafc;
}

html {
  background-color: #f7fafc;
}

img {
  vertical-align: text-bottom;
}

.card {
  margin: 1em;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
  border-radius: 0.8rem;
}

.custom-card {
  height: 35em;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.custom-card-content {
  overflow-y: scroll;
  flex: auto;
}

.custom-card .custom-card-header {
  flex-shrink: 0;
  padding-top: 0rem;
  padding-bottom: 0.5em;
}
</style>
