class Store {

    constructor(initState) {
        // Состояние приложения (данные)
        this.state = initState;
        // Слушатели изменений state
        this.listeners = [];
    }

    /**
     * Выбор state
     * @return {Object}
     */
    getState() {
        return this.state;
    }

    /**
     * Установка state
     * @param newState {Object}
     */
    setState(newState) {
        this.state = newState;
        // Оповещаем всех подписчиков об изменении стейта
        for (const listener of this.listeners) {
            listener();
        }
    }

    /**
     * Подписка на изменение state
     * @param callback {Function}
     * @return {Function} Функция для отписки
     */
    subscribe(callback) {
        this.listeners.push(callback);
        // Возвращаем функцию для удаления слушателя
        return () => {
            this.listeners = this.listeners.filter(item => item !== callback);
        }
    }

    /**
     * Создание записи
     */
    createItem({code, title = 'Новый товар', price = 999, selected = false}) {
        this.setState({
            ...this.state,
            items: this.state.items.concat({code, title, price, selected})
        });
    }

    /**
     * Удаление записи по её коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            items: this.state.items.filter(item => item.code !== code)
        });
    }

    /**
     * Выделение записи по её коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            ...this.state,
            items: this.state.items.map(item => {
                if (item.code === code) {
                    return {
                        ...item,
                        selected: !item.selected,
                        count: item.selected ? item.count : item.count + 1 || 1
                    }
                }
                return item.selected ? {...item, selected: false} : item;
            })
        });
    }

    /**
     * Удаление записи c корзины
     */
    deleteBasketItem(code) {
        const findItem = this.state.basket.find(item => item.code === code)
        const findItemPrice = findItem.price * findItem.count
        this.setState({
            ...this.state,
            basket: this.state.basket.filter(item => item.code !== code),
            totalPrice: this.state.totalPrice -= findItemPrice,
            totalCount: --this.state.totalCount
        });
    }

    /**
     * Добавление записи в корзину
     */
    addBasketItem({code, title, price, count = 1}) {
        const findItem = this.state.basket.find(item => item.code === code)
        if (findItem) {
            this.setState({
                ...this.state,
                basket: this.state.basket.map(item => {
                    if (item.code === findItem.code) {
                        return {
                            ...item,
                            count: ++findItem.count
                        }
                    }
                    return item
                }),
                totalPrice: this.state.totalPrice += price,
            })
        } else {
            this.setState({
                ...this.state,
                totalCount: ++this.state.totalCount,
                basket: this.state.basket.concat({code, title, price, count, id: this.state.totalCount}),
                totalPrice: this.state.totalPrice += price,
            })
        }
    }

    /**
     * Вывод и скрытие модального окна
     */
    changeModelItem(id) {
        this.setState({
            ...this.state,
            modals: this.state.modals.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        active: !item.active
                    }
                }
            })
        })
    }

}


export default Store;


