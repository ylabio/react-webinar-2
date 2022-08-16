import plural from "plural-ru";

export const dMenu = {
    main: {
        ru: "Главная",
        eng: "Main"
    }
}

export const dBasketSimple = {
    inTheBasket: {
        ru: "В корзине:",
        eng: "In the cart:"
    },
    getItemsNumber: {
        ru: (amount) => plural(amount, 'товар', 'товара', 'товаров'),
        eng: (amount) => plural(amount, 'item', 'items', 'items')
    },
    empty: {
        ru: "пусто",
        eng: "empty"
    },
    goToBasket: {
        ru: "Перейти",
        eng: "View cart"
    }
}

export const dBasketTotal = {
    total: {
        ru: "Итого",
        eng: "Total"
    }
}

export const dControls = {
    add: {
        ru: "Добавить",
        eng: "Add"
    }
}

export const dItem = {
    add: {
        ru: "Добавить",
        eng: "Add"
    }
}

export const dItemBasket = {
    quantity: {
        ru: "шт",
        eng: "qty"
    },
    delete: {
        ru: "Удалить",
        eng: "Delete"
    }
}

export const dItemDescription = {
    maidIn: {
        ru: "Страна производитель: ",
        eng: "Made in: "
    },
    category: {
        ru: "Категория: ",
        eng: "Category: "
    },
    edition: {
        ru: "Год выпуска: ",
        eng: "Edition: "
    },
    price: {
        ru: "Цена: ",
        eng: "Price: "
    },
    add: {
        ru: "Добавить",
        eng: "Add"
    }
}

export const dLayoutModal = {
    title: {
        ru: "Корзина",
        eng: "Basket"
    },
    close: {
        ru: "Закрыть",
        eng: "Close"
    }
}

export const dLayout = {
    title: {
        ru: "Магазин",
        eng: "Store"
    }
}