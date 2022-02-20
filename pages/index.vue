<template>
  <div>
    <account-header />
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
