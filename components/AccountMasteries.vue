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
          <mastery-icon :region="region.region" />
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
            ><mastery-icon :region="mastery.region" /> {{ mastery.name }}</span
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
                <mastery-icon :region="mastery.region" />
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
import masteryIcon from './masteryIcon.vue'
export default {
  name: 'AccountMasteries',
  components: { masteryIcon },
  data() {
    return {
      masteriesToDisplay: [],
      lightMasteryPoints: [],
      masteryRank: undefined,
    }
  },
  async fetch() {
    const [masteries, myMasteries, myMasteryPoints] = await Promise.all([
      this.$axios.$get('/gw2-api/masteries?ids=all&lang=fr'),
      this.$axios.$get('/gw2-api/account/masteries'),
      this.$axios.$get('/gw2-api/account/mastery/points'),
    ])

    this.masteriesToDisplay = masteries.map((mastery) => {
      const foundMas = myMasteries.find((el) => el.id === mastery.id)
      return { ...mastery, level: foundMas ? foundMas.level : 0 }
    })
    this.lightMasteryPoints = myMasteryPoints.totals.map((el) => ({
      region: el.region,
      available: el.earned - el.spent,
    }))
    this.masteryRank = myMasteryPoints.totals.reduce(
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
