<template>
  <b-card class="custom-card">
    <div class="custom-carder-header">
      <h1>Porte-monnaie</h1>
    </div>
    <div class="custom-card-content">
      <p v-for="currency in wallet" :key="currency.id">
        <span :id="`currency-${currency.id}`">
          <img :src="currency.icon" height="20" /> {{ currency.name }} :
          {{ currency.value }}
        </span>
        <b-tooltip
          :title="currency.description"
          :target="`currency-${currency.id}`"
          boundary="document"
          placement="right"
        >
        </b-tooltip>
      </p>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'AccountWallet',
  data() {
    return {
      currencies: [],
      myCurrencies: [],
      wallet: [],
    }
  },
  async fetch() {
    this.currencies = await this.$axios.$get(
      'https://api.guildwars2.com/v2/currencies?ids=all&lang=fr'
    )
    this.myCurrencies = await this.$axios.$get(
      'https://api.guildwars2.com/v2/account/wallet'
    )
  },
  fetchKey: 'account-wallet',
  mounted() {
    this.wallet = this.currencies.map((currency) => {
      const foundCur = this.myCurrencies.find((el) => el.id === currency.id)
      return { ...currency, value: foundCur ? foundCur.value : 0 }
    })
  },
}
</script>

<style scoped>
img {
  vertical-align: text-bottom;
}

p {
  margin-bottom: 0.15em;
}
</style>
