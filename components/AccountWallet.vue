<template>
  <b-card class="custom-card">
    <div class="custom-carder-header">
      <h1>Porte-monnaie</h1>
    </div>
    <div class="custom-card-content">
      <p v-for="currency in wallet" :key="currency.id">
        <span :id="`currency-${currency.id}`">
          <img class="icon" :src="currency.icon" height="20" />
          {{ currency.name }} :
          <span v-if="currency.id !== 1"> {{ currency.value }}</span>
          <span v-else>
            {{ Math.floor(currency.value / 10000) }}
            <img class="money" src="~/static/gold.png" />
            {{ Math.floor((currency.value % 10000) / 100) }}
            <img class="money" src="~/static/silver.png" />
            {{ currency.value % 100 }}
            <img class="money" src="~/static/copper.png" />
          </span>
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
      wallet: [],
    }
  },
  async fetch() {
    const [currencies, myCurrencies] = await Promise.all([
      this.$axios.$get('/gw2-api/currencies?ids=all&lang=fr'),
      this.$axios.$get('/gw2-api/account/wallet'),
    ])

    this.wallet = currencies.map((currency) => {
      const foundCur = myCurrencies.find((el) => el.id === currency.id)
      return { ...currency, value: foundCur ? foundCur.value : 0 }
    })
  },
  fetchKey: 'account-wallet',
}
</script>

<style scoped>
.icon {
  vertical-align: text-bottom;
}

.money {
  vertical-align: middle;
}

p {
  margin-bottom: 0.15em;
}
</style>
