<template>
  <div>
    <h1>Titres</h1>
    <ul>
      <li v-for="title in titlesToDisplay" :key="title.id">
        <span>{{ title.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AccountTitles',
  data() {
    return {
      titles: [],
      myTitles: [],
      titlesToDisplay: [],
    }
  },
  async fetch() {
    this.titles = await this.$axios.$get(
      'https://api.guildwars2.com/v2/titles?ids=all&lang=fr'
    )
    this.myTitles = await this.$axios.$get(
      'https://api.guildwars2.com/v2/account/titles'
    )
  },
  fetchKey: 'account-titles',
  mounted() {
    this.titlesToDisplay = this.titles.filter((title) =>
      this.myTitles.includes(title.id)
    )
  },
}
</script>
