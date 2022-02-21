export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.getters.token)
      config.headers.common.Authorization = `Bearer ${store.getters.token}`
  })
}
