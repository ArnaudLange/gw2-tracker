<template>
  <div class="home">
    <div class="header-title">
      <h1>
        <img src="~/static/gw2_white_logo.png" height="50" />
        Account Tracker
      </h1>
      <b-button
        pill
        class="btn bi bi-arrow-clockwise"
        variant="outline-light"
        @click="forceRerender"
      ></b-button>
    </div>
    <div class="header-content">
      <account-header :key="`header-${componentKey}`" />
    </div>
    <div class="body">
      <b-row>
        <b-col>
          <account-wallet :key="`wallet-${componentKey}`" />
        </b-col>
        <b-col>
          <account-titles :key="`titles-${componentKey}`" />
        </b-col>
        <b-col>
          <account-masteries :key="`masteries-${componentKey}`" />
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
  middleware: 'authenticated',
  data() {
    return {
      componentKey: 0,
    }
  },
  methods: {
    forceRerender(child) {
      this.componentKey += 1
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Oswald|Roboto:400,700');
@import url('bootstrap-icons');

.home {
  font-family: 'Roboto';
}

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
  padding-top: 0.5em;
  padding-left: 0.5em;
  background-color: #bd0f0f;
  color: white;
}

.body {
  background-color: #f7fafc;
}

body {
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
