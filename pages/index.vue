<template>
  <div>
    <b-row>
      <b-col>
        <p>
          <b>{{ myAccount.name }}</b>
        </p>
        <p>
          <b>Monde : </b>
          {{ myWorld.name }}
        </p>
      </b-col>
      <b-col>
        <p>
          <b>Date de création du compte : </b>
          {{ convertToLocaleDateString(myAccount.created) }}
        </p>
        <p>
          <b>Temps de jeu : </b>
          {{ Math.floor(myAccount.age / 3600) }} heures,
           {{ Math.floor(myAccount.age % 3600 / 60) }} minutes
          <span v-if="Math.floor(myAccount.age % 60)"> et {{ Math.floor(myAccount.age % 60) }} secondes</span>
        </p>
      </b-col>
      <b-col>
        <p>
          <b>Niveau fractal : </b>
          {{ myAccount.fractal_level }}
        </p>
        <p>
          <b>Rang WvW : </b>
          {{ myAccount.wvw_rank }}
        </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h1>Porte-monnaie</h1>
        <ul>
          <li v-for="currency in wallet" :key="currency.id">
            <span><img :src="currency.icon" height="20" /> {{ currency.name }} : {{ currency.value }}</span>
          </li>
        </ul>
      </b-col>
      <b-col>
        <h1>Titres</h1>
        <ul>
          <li v-for="title in titlesToDisplay" :key="title.id">
            <span><img :src="title.icon" height="20" /> {{ title.name }}</span>
          </li>
        </ul>
      </b-col>
      <b-col>
        <h1>Maîtrises</h1>
        <p>
          Rang : {{ masteryRank }}
          <img src="~/static/mp_rank.png" height="20"/>
        </p>
        <p>
          <span>Disponibles : </span>
          <span v-for="region in lightMasteryPoints" :key="region.region">
            {{ region.available }}
             <img v-if="region.region === 'Maguuma'" src="~/static/mp_hot.png" height="20"/>
             <img v-if="region.region === 'Tyria'" src="~/static/mp_tyria.png" height="20"/>
             <img v-if="region.region === 'Desert'" src="~/static/mp_pof.png" height="20"/>
             <img v-if="region.region === 'Tundra'" src="~/static/mp_is.png" height="20"/>
          </span>
        </p>
        <ul>
          <li v-for="mastery in masteriesToDisplay" :key="mastery.id">
            <span>{{ mastery.name }}</span>
            <ul>
              <li v-for="(level, index) in mastery.levels" :key="level.name">
                <span><img :src="level.icon" height="20" /> {{ level.name }} </span>
                <span v-if="mastery.level >= index && mastery.level > 0" class="bi bi-check" style="color:green;"></span>
                <span v-else>
                  : {{ level.point_cost }}
                  <img v-if="mastery.region === 'Maguuma'" src="~/static/mp_hot.png" height="20"/>
                  <img v-if="mastery.region === 'Tyria'" src="~/static/mp_tyria.png" height="20"/>
                  <img v-if="mastery.region === 'Desert'" src="~/static/mp_pof.png" height="20"/>
                  <img v-if="mastery.region === 'Tundra'" src="~/static/mp_is.png" height="20"/>
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </b-col>
    </b-row>

  </div>
</template>
<script>
  export default {
    name: 'IndexPage',
    async asyncData({ $axios }) {
      await $axios.setToken(process.env.TOKEN, 'Bearer');

      const currencies = await $axios.$get('https://api.guildwars2.com/v2/currencies?ids=all&lang=fr');
      const myCurrencies = await $axios.$get('https://api.guildwars2.com/v2/account/wallet');

      const titles = await $axios.$get('https://api.guildwars2.com/v2/titles?ids=all&lang=fr');
      const myTitles = await $axios.$get('https://api.guildwars2.com/v2/account/titles');

      const masteries = await $axios.$get('https://api.guildwars2.com/v2/masteries?ids=all&lang=fr');
      const myMasteries = await $axios.$get('https://api.guildwars2.com/v2/account/masteries');
      const myMasteryPoints = await $axios.$get('https://api.guildwars2.com/v2/account/mastery/points');

      const myAccount = await $axios.$get('https://api.guildwars2.com/v2/account');
      const myWorld = await $axios.$get(`https://api.guildwars2.com/v2/worlds?id=${myAccount.world}&lang=fr`);
      return {
        currencies,
        myCurrencies,
        titles,
        myTitles,
        masteries,
        myMasteries,
        myMasteryPoints,
        myAccount,
        myWorld
      }
    },
    data() {
      return {
        titlesToDisplay: [],
        wallet: [],
        masteriesToDisplay: [],
        lightMasteryPoints: [],
        masteryRank: undefined
      }
    },
    created() {
      this.titlesToDisplay = this.titles.filter(title => this.myTitles.includes(title.id));

      this.wallet = this.currencies.map(currency => {
        const foundCur = this.myCurrencies.find(el => el.id === currency.id);
        return {...currency, value: foundCur ? foundCur.value : 0};
      });

      this.masteriesToDisplay = this.masteries.map(mastery => {
        const foundMas = this.myMasteries.find(el => el.id === mastery.id);
        return {...mastery, level: foundMas ? foundMas.level : 0};
      });
      this.lightMasteryPoints = this.myMasteryPoints.totals.map(el => ({region: el.region, available: el.earned - el.spent}));
      this.masteryRank = this.myMasteryPoints.totals.reduce((acc, cur) => acc + cur.spent, 0);
    },
    methods: {
      convertToLocaleDateString(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', {dateStyle: "long", timeStyle: "short"});
      }

    }
  }
</script>
<style scoped>
@import url('bootstrap-icons');

img {
  vertical-align: text-bottom;
}
</style>
