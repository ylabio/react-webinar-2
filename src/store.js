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
     * Удаление записи из корзины
     * @param item
     */
    deleteItem(item) {
        this.setState({
            ...this.state,
            basket: item.quantity > 1
                ? this.state.basket.map(m => m.code === item.code ? {
                    ...m,
                    quantity: m.quantity - 1,
                    price: m.price - (m.price / m.quantity)
                } : m)
                : this.state.basket.filter(f => f.code !== item.code)
        })
    }

    /**
     * Добавление записи в корзину
     * @param item
     */

    addInBasket(item) {
        if (this.state.basket.some(s => s.code === item.code)) {
            this.setState({
                ...this.state,
                basket: this.state.basket.map(m => m.code === item.code ? {
                    ...m,
                    price: m.price + item.price,
                    quantity: m.quantity ? m.quantity + 1 : 1
                } : m)
            })
        } else {
            this.setState({
                ...this.state,
                basket: [...this.state.basket, {...item, quantity: 1}]
            })
        }
    }

}

export default Store;
