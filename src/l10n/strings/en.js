export const en = {
  title: 'Shop',
  layout: {
    navigation: {
      home: 'Home',
    },
    languageSwitcher: {
      heading: 'Language',
    },
    buttons: {
      add: 'Add',
      checkout: 'Checkout',
      remove: 'Remove',
      close: 'Close',
    }
  },
  cart: {
    title: 'Cart',
    heading: 'In cart',
    empty: 'Empty',
    plural: ['item', 'items', 'items'],
    total: 'Total',
    get buttonCheckout() {
      return en.layout.buttons.checkout;
    },
    get buttonClose() {
      return en.layout.buttons.close;
    },
  },
  product: {
    card: {
      madeIn: 'Made in',
      category: 'Category',
      edition: 'Edition',
      price: 'Price',
      get button() {
        return en.layout.buttons.add;
      },
    }
  },

};

