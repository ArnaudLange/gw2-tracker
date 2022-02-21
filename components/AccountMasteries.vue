<template>
  <b-card class="custom-card">
    <div class="custom-carder-header pb-1">
      <h1>Maîtrises</h1>
      <p>
        Rang : {{ masteryRank }}
        <img src="~/static/mp_rank.png" height="20" />
      </p>
      <div>
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
      </div>
    </div>
    <div class="custom-card-content">
      <div v-for="mastery in masteriesToDisplay" :key="mastery.id">
        <span
          :id="`mastery-${mastery.id}`"
          v-b-toggle="`collapse-mastery-${mastery.id}`"
          href="#"
          style="vertical-align: middle"
        >
          <span
            ><img src="~/static/mp.png" height="20" /> {{ mastery.name }}</span
          >
          <span class="when-opened">
            <span class="bi bi-chevron-down" />
          </span>
          <span class="when-closed">
            <span class="bi bi-chevron-right" />
          </span>
        </span>
        <b-tooltip
          :title="mastery.requirement"
          :target="`mastery-${mastery.id}`"
          boundary="document"
          placement="left"
          triggers="hover"
        >
        </b-tooltip>
        <b-collapse :id="`collapse-mastery-${mastery.id}`">
          <div
            v-for="(level, index) in mastery.levels"
            :key="level.name"
            class="levels"
          >
            <span :id="`level-${level.name}`">
              <span
                ><img :src="level.icon" height="20" /> {{ level.name }}
              </span>
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
            </span>
            <b-tooltip
              :title="level.instruction"
              :target="`level-${level.name}`"
              boundary="document"
              placement="left"
            >
            </b-tooltip>
          </div>
        </b-collapse>
      </div>
    </div>
  </b-card>
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
      '/gw2-api/masteries?ids=all&lang=fr'
    )
    this.myMasteries = await this.$axios.$get('/gw2-api/account/masteries')
    this.myMasteryPoints = await this.$axios.$get(
      '/gw2-api/account/mastery/points'
    )

    this.titles = await this.$axios.$get('/gw2-api/titles?ids=all&lang=fr')
    this.myTitles = await this.$axios.$get('/gw2-api/account/titles')

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
  fetchKey: 'account-masteries',
}
</script>

<style scoped>
@import url('bootstrap-icons');

img {
  vertical-align: text-bottom;
}

p {
  margin-bottom: 0.15em;
}

.levels {
  padding-left: 1em;
}

.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>
