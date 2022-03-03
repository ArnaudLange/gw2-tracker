<template>
  <span>
    <img
      v-if="region === 'Maguuma'"
      src="~/static/mp_hot.png"
      :height="height"
    />
    <img
      v-if="region === 'Tyria'"
      src="~/static/mp_tyria.png"
      :height="height"
    />
    <img
      v-if="region === 'Desert'"
      src="~/static/mp_pof.png"
      :height="height"
    />
    <img v-if="region === 'Tundra'" src="~/static/mp_is.png" :height="height" />
  </span>
</template>

<script>
export default {
  name: 'MasteryIcon',
  props: {
    region: {
      type: String,
      default: 'Tyria',
    },
    height: {
      type: Number,
      default: 20,
    },
  },
}
</script>

<style scoped>
img {
  vertical-align: text-bottom;
}
</style>
