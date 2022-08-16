const lang = [
  {
    shop: "Магазин",
    in_the_basket: "В корзине",
    main: "Главное",
    go: "Перейти",
    empty: "пусто",
  },
  {
    shop: "Shop",
    in_the_basket: "In the basket",
    main: "Main",
    go: "Go",
    empty: "empty",
  },
];

export const translation = (n, text) => {
  return lang[n][`${text}`] ? lang[n][`${text}`] : "";
};
