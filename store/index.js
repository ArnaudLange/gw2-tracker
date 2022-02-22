export const state = () => ({
  token: undefined,
})

export const mutations = {
  saveToken(state, newToken) {
    if (newToken) {
      state.token = newToken
    } else {
      state.token = ''
    }
  },
}

export const getters = {
  token(state) {
    return state.token
  },
}
