export const state = () => ({
  token: undefined,
})

export const mutations = {
  saveToken(state, token) {
    state.token = token
  },
}

export const getters = {
  token(state) {
    return state.token
  },
}
