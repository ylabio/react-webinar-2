export default {
    main: {
        title: 'Shop',
    },
    basket: {
        empty: 'empty',
        simple: 'Cart:',
        title: 'Cart',
        total: 'Total',
        piece: (value) => value > 1 ? 'pcs' : 'pc',
    },
    item: {
        country: 'Origin',
        category: 'Category',
        edition: 'Edition',
        price: 'Price',
        piece: (value) => value > 1 ? 'pcs' : 'pc',
    },
    actions: {
        add: 'Add',
        close: 'Close',
        delete: 'Delete',
        home: 'Home',
        open: 'Open',
    },
    loading: 'Loading...',
}