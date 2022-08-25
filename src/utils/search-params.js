import qs from 'qs';

const OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: 'comma',
    encode: false
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true
  }
}

export default {
  parse: (query) => {
    return qs.parse(query, OPTIONS.parse) || {}
  },

  stringify: (params) => {
    return qs.stringify(params, OPTIONS.stringify);
  }
}
