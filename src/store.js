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
    addToCart(code) {
        this.setState({
            ...this.state,
            cart: this.state.cart.concat(this.state.items.filter(i => {
                if (i.code === code) {
                    const result = this.state.cart.find(item => item.code === code);
                    if (result) {
                        result.counter = result.counter + 1;
                    } else {
                        return Object.assign(i, {counter: 1}) //
                    }
                }
            }))
        })
        this.setFullPrice();
        this.setCount();
    }

    removeFromCart(code) {
        if (this.state.cart !== undefined) {
            this.setState({
                ...this.state,
                cart: this.state.cart.filter(i => {
                    if (i?.code !== code) {
                        return i;
                    }
                })
            });
        }
        this.setFullPrice();
        this.setCount();
    }

    setFullPrice() {
        this.setState({
            ...this.state,
            price: this.getPrice()
        })
    }

    getPrice() {
        if (this.state.cart.length >= 1) {
            let price = 0;
            this.state.cart.map((item) => {
                if (!isNaN(item?.price)) {
                    price += item?.price * item?.counter;
                }
            })
            return price;
        }
        return 0
    }

    setCount() {
        this.setState({
            ...this.state,
            count: this.state.cart.length
        })
    }

}

export default Store;
