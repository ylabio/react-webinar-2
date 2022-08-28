const config = {
  store: {
    log: false,
    
    modules: {
      user: {
        tokenHeader: `X-Token`
      }
    }
  },
  
  api: {
    baseUrl: ''
  }
}

export default config