<template>
  <div>
    <h1>Porte-monnaie</h1>
    <ul>
      <li v-for="currency in wallet" :key="currency.id">
        <span v-b-tooltip.hover.right :title="currency.description"
          ><img :src="currency.icon" height="20" /> {{ currency.name }} :
          {{ currency.value }}</span
        >
      </li>
    </ul>
  </div>
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
</style>
