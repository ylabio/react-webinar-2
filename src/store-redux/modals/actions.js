export default {

  open: (name) => {
    return {type: 'modal/open', payload: {name}};
  },

  close: () => {
    return {type: 'modal/close'}
  }
}
