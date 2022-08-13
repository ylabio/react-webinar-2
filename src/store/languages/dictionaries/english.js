export const englishDict = {
  store: "Store",
  mainPage: "Main page",
  empty: "Empty",
  inCart: "Cart",
  goCart: "Check out",
  summary: "Summary",
  remove: "Remove",
  add: "Add",
  manufacturer: "Manufacturer",
  productionYear: "Year of production",
  category: "Category",
  price: "Price",
  cart: "Cart",
  close: "Close",
  loading: "Loading...",
  goods: (amount) => {
    if(amount === 1){
      return 'good'
    } else {
      return 'goods'
    }
  },
  pcs: "pcs",
  thisLanguage: "English"
}
