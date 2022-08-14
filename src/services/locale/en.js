export default {
  main: {
    title: 'Shop',
  },
  basket: {
    title: 'Cart',
    total: 'Total',
    piece: (value) => value > 1 ? 'pcs' : 'pc',
    empty: 'empty',
    simple: 'Cart:',
  },
  item: {
    country: 'Origin',
    category: 'Category',
    edition: 'Edition',
    price: 'Price',
    piece: (value) => value > 1 ? 'pcs' : 'pc',
  },
  actions: {
    home: 'Home',
    open: 'Open',
    close: 'Close',
    delete: 'Delete',
    add: 'Add',
  },
  loading: 'Loading...',
}
