export default function ({ $axios, $config: {gw2ApiToken} }) {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = `Bearer ${gw2ApiToken}`;
  })
}
