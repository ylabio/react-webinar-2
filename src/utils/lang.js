
export const translateDB = {
    header: {
        'ru': 'Магазин',
        'en': 'Shop'
    },
    basket: {
        ru: 'В корзине',
        en: 'In the basket'
    },
    empty: {
        ru: 'пусто',
        en: 'empty'
    },
    main: {
        ru: 'Главная',
        en: 'Main'
    },
    add: {
        ru: 'Добавить',
        en: 'Add'
    },
    remove: {
        ru: 'Удалить',
        en: 'Delete'
    },
    open: {
        ru: 'Перейти',
        en: 'Open'
    },
    close: {
        ru: 'Закрыть',
        en: 'Close'
    },
    product: {
        ru: 'Товар',
        en: 'Product'
    }
}


export function translate(head, lang) {
    console.log(translate[head][lang]) 
}