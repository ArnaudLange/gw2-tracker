<template>
  <div class="home">
    <div class="header">
      <account-header
        :key="`header-${componentKey}`"
        title="Account Summary"
        :connected="true"
        @forceRerender="forceRerender"
      />
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
@import url('bootstrap-icons');

.row {
  width: 100%;
}

.home {
  font-family: 'Roboto';
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
