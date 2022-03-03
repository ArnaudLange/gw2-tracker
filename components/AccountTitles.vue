<template>
  <b-card class="custom-card">
    <div class="custom-carder-header">
      <h1>Titres</h1>
    </div>
    <div class="custom-card-content">
      <p v-for="title in titlesToDisplay" :key="title.id">
        <span :id="`title-${title.id}`"
          ><img src="~/static/succes.png" height="20" /> {{ title.name }}</span
        >
        <b-tooltip
          :title="title.achievement"
          :target="`title-${title.id}`"
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
  name: 'AccountTitles',
  data() {
    return {
      titles: [],
      myTitles: [],
      titlesToDisplay: [],
      achievementList: [],
    }
  },
  async fetch() {
    const titlePromises = await Promise.all([
      this.$axios.$get('/gw2-api/titles?ids=all&lang=fr'),
      this.$axios.$get('/gw2-api/account/titles')
    ])
    this.titles = titlePromises[0]
    const myTitlesIds = titlePromises[1]

    this.myTitles = this.titles.filter((title) =>
      myTitlesIds.includes(title.id)
    )

    const achievementIds = this.myTitles.map((el) => el.achievement)
    this.achievementList = await this.$axios.$get(
      `/gw2-api/achievements?ids=${achievementIds.join(',')}&lang=fr`
    )

    this.titlesToDisplay = this.myTitles.map((title) => {
      const foundAchievement =
        this.achievementList.find((el) => el.id === title.achievement) || {}
      return {
        ...title,
        achievement: foundAchievement.requirement
          ? foundAchievement.requirement
          : foundAchievement.description,
      }
    })
  },
  fetchKey: 'account-titles',
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
