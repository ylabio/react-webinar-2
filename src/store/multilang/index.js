import StateModule from "../module";


class MultilangState extends StateModule {


    initState() {
        return {
            RU: {
                mainTitle: "Магазин", productTitle: "Название товара", productLink: "Главная",
                productCountry: "Страна производитель", category: "Категория", yearOfIssue: "Год выпуска",
                price: "Цена", add: "Добавить"
            },
            ENG: {
                mainTitle: "Shop", productTitle: "Product Name", productLink: "Home"
                , productCountry: "Producing country", category: "Category", yearOfIssue: "Year of Issue", price: "Price", add: "Add"
            },
            CurrentLang: {
                mainTitle: "Магазин", productTitle: "Название товара", productLink: "Главная",
                productCountry: "Страна производитель", category: "Категория", yearOfIssue: "Год выпуска", price: "Цена", add: "Добавить"
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