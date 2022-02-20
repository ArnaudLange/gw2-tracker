<template>
  <div>
    <h1>Maîtrises</h1>
    <p>
      Rang : {{ masteryRank }}
      <img src="~/static/mp_rank.png" height="20" />
    </p>
    <p>
      <span>Disponibles : </span>
      <span
        v-for="region in lightMasteryPoints"
        :key="region.region"
        v-b-tooltip.hover.top
        :title="region.region"
      >
        {{ region.available }}
        <img
          v-if="region.region === 'Maguuma'"
          src="~/static/mp_hot.png"
          height="20"
        />
        <img
          v-if="region.region === 'Tyria'"
          src="~/static/mp_tyria.png"
          height="20"
        />
        <img
          v-if="region.region === 'Desert'"
          src="~/static/mp_pof.png"
          height="20"
        />
        <img
          v-if="region.region === 'Tundra'"
          src="~/static/mp_is.png"
          height="20"
        />
      </span>
    </p>
    <ul>
      <li v-for="mastery in masteriesToDisplay" :key="mastery.id">
        <span>{{ mastery.name }}</span>
        <ul>
          <li
            v-for="(level, index) in mastery.levels"
            :key="level.name"
            v-b-tooltip.hover.left
            :title="level.instruction"
          >
            <span><img :src="level.icon" height="20" /> {{ level.name }} </span>
            <span
              v-if="mastery.level >= index && mastery.level > 0"
              class="bi bi-check"
              style="color: green"
            ></span>
            <span v-else>
              : {{ level.point_cost }}
              <img
                v-if="mastery.region === 'Maguuma'"
                src="~/static/mp_hot.png"
                height="20"
              />
              <img
                v-if="mastery.region === 'Tyria'"
                src="~/static/mp_tyria.png"
                height="20"
              />
              <img
                v-if="mastery.region === 'Desert'"
                src="~/static/mp_pof.png"
                height="20"
              />
              <img
                v-if="mastery.region === 'Tundra'"
                src="~/static/mp_is.png"
                height="20"
              />
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AccountMasteries',
  data() {
    return {
      masteries: [],
      myMasteries: [],
      myMasteryPoints: [],
      masteriesToDisplay: [],
      lightMasteryPoints: [],
      masteryRank: undefined,
    }
  },
  async fetch() {
    this.masteries = await this.$axios.$get(
      'https://api.guildwars2.com/v2/masteries?ids=all&lang=fr'
    )
    this.myMasteries = await this.$axios.$get(
      'https://api.guildwars2.com/v2/account/masteries'
    )
    this.myMasteryPoints = await this.$axios.$get(
      'https://api.guildwars2.com/v2/account/mastery/points'
    )

    this.titles = await this.$axios.$get(
      'https://api.guildwars2.com/v2/titles?ids=all&lang=fr'
    )
    this.myTitles = await this.$axios.$get(
      'https://api.guildwars2.com/v2/account/titles'
    )
  },
  fetchKey: 'account-masteries',
  mounted() {
    this.masteriesToDisplay = this.masteries.map((mastery) => {
      const foundMas = this.myMasteries.find((el) => el.id === mastery.id)
      return { ...mastery, level: foundMas ? foundMas.level : 0 }
    })
    this.lightMasteryPoints = this.myMasteryPoints.totals.map((el) => ({
      region: el.region,
      available: el.earned - el.spent,
    }))
    this.masteryRank = this.myMasteryPoints.totals.reduce(
      (acc, cur) => acc + cur.spent,
      0
    )
  },
}
</script>

<style scoped>
@import url('bootstrap-icons');

img {
  vertical-align: text-bottom;
}
</style>
