import StateModule from "../module";


class MultilangState extends StateModule {


    initState() {
        return {
            // FR: {
            //     mainTitle: "", productTitle: "", productLink: "", productCountry: "", category: "", yearOfIssue: "", price: "", add: "", inTheBasket: "", commodityDeclensions: ["", "", ""],
            //     empty: "", go: "", basket: "", total: "", remove: "", close: "", pc: ""
            // },
            // FR: {
            //     mainTitle: "", productTitle: "", productLink: "", productCountry: "", category: "", yearOfIssue: "", price: "", add: "", inTheBasket: "", commodityDeclensions: ["", "", ""],
            //     empty: "", go: "", basket: "", total: "", remove: "", close: "", pc: ""
            // },
            // FR: {
            //     mainTitle: "", productTitle: "", productLink: "", productCountry: "", category: "", yearOfIssue: "", price: "", add: "", inTheBasket: "", commodityDeclensions: ["", "", ""],
            //     empty: "", go: "", basket: "", total: "", remove: "", close: "", pc: ""
            // },
            // FR: {
            //     mainTitle: "", productTitle: "", productLink: "", productCountry: "", category: "", yearOfIssue: "", price: "", add: "", inTheBasket: "", commodityDeclensions: ["", "", ""],
            //     empty: "", go: "", basket: "", total: "", remove: "", close: "", pc: ""
            // },
            // FR: {
            //     mainTitle: "", productTitle: "", productLink: "", productCountry: "", category: "", yearOfIssue: "", price: "", add: "", inTheBasket: "", commodityDeclensions: ["", "", ""],
            //     empty: "", go: "", basket: "", total: "", remove: "", close: "", pc: ""
            // },
            // FR: {
            //     mainTitle: "", productTitle: "", productLink: "", productCountry: "", category: "", yearOfIssue: "", price: "", add: "", inTheBasket: "", commodityDeclensions: ["", "", ""],
            //     empty: "", go: "", basket: "", total: "", remove: "", close: "", pc: ""
            // },
            // FR: {
            //     mainTitle: "", productTitle: "", productLink: "", productCountry: "", category: "", yearOfIssue: "", price: "", add: "", inTheBasket: "", commodityDeclensions: ["", "", ""],
            //     empty: "", go: "", basket: "", total: "", remove: "", close: "", pc: ""
            // },
            DE: {
                mainTitle: "Punktzahl", productTitle: "Produktname", productLink: "Heimat", productCountry: "Herstellungsland", category: "Kategorie",
                yearOfIssue: "Baujahr", price: "Preis", add: "Hinzufügen", inTheBasket: "Im Korb", commodityDeclensions: ["produkt", "waren", "waren"],
                empty: "leer", go: "Gehen", basket: "Korb", total: "Gesamt", remove: "Löschen", close: "Nah dran", pc: "Stck"
            },
            JP: {
                mainTitle: "スコア", productTitle: "商品名", productLink: "家", productCountry: "生産国", category: "カテゴリー", yearOfIssue: "発行年", price: "価格", add: "追加",
                inTheBasket: "かごの中", commodityDeclensions: ["製品", "品", "品"],
                empty: "空の", go: "行け", basket: "バスケット", total: "合計", remove: "消去", close: "近い", pc: "pc"
            },
            FR: {
                mainTitle: "Score", productTitle: "Nom du produit", productLink: "Domicile", productCountry: "Pays producteur",
                category: "Catégorie", yearOfIssue: "Année d'émission", price: "Prix", add: "Ajouter", inTheBasket: "Dans le panier", commodityDeclensions: ["produit", "des biens", "des biens"],
                empty: "vide", go: "Aller", basket: "Corbeille", total: "Total", remove: "Effacer", close: "Proche", pc: "pc"
            },
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