import StoreModule from '../module';

class Language extends StoreModule {
    //Думаю над дополнительным заданием

    initState() {
        return {
            RU: {
                store: "Магазин",
                mainPage: "Главная",
                empty: "Пусто",
                inCart: "В корзине",
                openCart: "Перейти",
                sum: "Итого",
                remove: "Удалить",
                add: "Добавить",
                maidIn: "Страна производитель",
                edition: "Год выпуска",
                category: "Категория",
                price: "Цена",
                cart: "Корзина",
                close: "Закрыть",
            },
            EN: {
                store: "Store",
                mainPage: "Main",
                empty: "Empty",
                inCart: "In cart",
                openCart: "Open cart",
                sum: "Summary",
                remove: "Remove",
                add: "Add",
                maidIn: "Producer country",
                edition: "Year of release",
                category: "Category",
                price: "Price",
                cart: "Cart",
                close: "Close",
            }

        }
    }




}
export default Language