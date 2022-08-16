import StateModule from "../module";


class MultilangState extends StateModule {


    initState() {
        return {
            RU: {
                mainTitle: "Магазин", productTitle: "Название товара", productLink: "Главная",
                productCountry: "Страна производитель", category: "Категория", yearOfIssue: "Год выпуска",
                price: "Цена", add: "Добавить", inTheBasket: "В корзине", commodityDeclensions: ["товар", "товара", "товаров"], empty: "пусто", go: "Перейти",
                basket: "Корзина", total: "Итого", remove: "Удалить", close: "Закрыть", pc: "шт"
            },
            ENG: {
                mainTitle: "Shop", productTitle: "Product Name", productLink: "Home"
                , productCountry: "Producing country", category: "Category", yearOfIssue: "Year of Issue", price: "Price", add: "Add", inTheBasket: "In the basket",
                commodityDeclensions: ["product", "goods", "goods"], empty: "empty", go: 'Go', basket: "Basket", total: "Total", remove: "Remove", close: "Close", pc: "pc"
            },
            CurrentLang: {
                mainTitle: "Магазин", productTitle: "Название товара", productLink: "Главная",
                productCountry: "Страна производитель", category: "Категория", yearOfIssue: "Год выпуска", price: "Цена", add: "Добавить", inTheBasket: "В корзине",
                commodityDeclensions: ["товар", "товара", "товаров"], empty: "пусто", go: "Перейти", basket: "Корзина", total: "Итого", remove: "Удалить", close: "Закрыть",
                pc: "шт"
            }
        }
    }

    // смена языка
    switchLang(name) {
        this.setState({ ...this.store.state.multilang, CurrentLang: this.store.state.multilang[name] })
        // console.log(this.store.state.multilang[name]);
    }


}

export default MultilangState;