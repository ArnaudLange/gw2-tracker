export default function ({ store, redirect }) {
  const apiKey = store.getters.token
  if (!apiKey) return redirect('/apiKey')
}
