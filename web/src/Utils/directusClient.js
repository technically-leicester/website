import DirectusSDK from '@directus/sdk-js'

export default new DirectusSDK({
  url: process.env.REACT_APP_DIRECTUS_URL,
  project: process.env.REACT_APP_DIRECTUS_PROJECT
})
