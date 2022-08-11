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
     * Добавление товара в корзину
     */
    addCartItem(code) {
        const findItem = this.state.items.find(item => item.code === code);
        const cartItem = this.state.cartItems.find(item => item.code === code);

        if (!!findItem) {
            if (!cartItem) {
                this.setState({
                    ...this.state,
                    cartItems: this.state.cartItems.concat(findItem),
                });
            }
            return this.setState({
                ...this.state,
                cartItems: this.state.cartItems.map(item => {
                    if (item.code === code) {
                        return {
                            ...item,
                            count: isNaN(item.count) ? 1 : item.count + 1,
                        }
                    }
                    return item;
                }),
            });
        }
    }

    /**
     * Расчет суммы товара в корзине
     */
    setTotalPrice() {
        this.setState({
            ...this.state,
            totalPrice: Intl.NumberFormat('ru-RU').format(this.state.cartItems.reduce((sum, item) => {
                    return item.price * item.count + sum;
                }, 0)),
        });
    }

    /**
     * Расчет количества товара в корзине
     */
    setTotalCount() {
        this.setState({
            ...this.state,
            totalCount: this.state.cartItems.length,
        });
    }

    /**
     * Удаление записи по её коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            cartItems: this.state.cartItems.filter(item => item.code !== code)
        });
    }
}

export default Store;
