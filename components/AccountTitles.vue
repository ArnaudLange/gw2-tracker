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
    this.titles = await this.$axios.$get(
      'https://api.guildwars2.com/v2/titles?ids=all&lang=fr'
    )

    const myTitlesIds = await this.$axios.$get(
      'https://api.guildwars2.com/v2/account/titles'
    )
    this.myTitles = this.titles.filter((title) =>
      myTitlesIds.includes(title.id)
    )

    const achievementIds = this.myTitles.map((el) => el.achievement)
    this.achievementList = await this.$axios.$get(
      `https://api.guildwars2.com/v2/achievements?ids=${achievementIds.join(
        ','
      )}&lang=fr`
    )
  },
  fetchKey: 'account-titles',
  mounted() {
    this.titlesToDisplay = this.myTitles.map((title) => {
      const foundAchievement = this.achievementList.find(
        (el) => el.id === title.achievement
      )
      return {
        ...title,
        achievement: foundAchievement.requirement
          ? foundAchievement.requirement
          : foundAchievement.description,
      }
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
