import plural from "plural-ru";

export default {
    main: {
        title: 'Магазин',
    },
    item: {
        country: 'Страна производитель',
        category: 'Категория',
        edition: 'Год выпуска',
        price: 'Цена',
        piece: () => 'шт',
    },
    basket: {
        empty: 'пусто',
        simple: 'В корзине:',
        title: 'Корзина',
        total: 'Итого',
        piece: (value) => plural(value, 'товар', 'товара', 'товаров'),
    },
    actions: {
        add: 'Добавить',
        close: 'Закрыть',
        delete: 'Удалить',
        home: 'Главная',
        open: 'Перейти',
    },
    loading: 'Идёт загрузка...',
}