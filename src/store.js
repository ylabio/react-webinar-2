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

    addToCart(code, title, price, counter = 1) {
        const obj = {
            code: code,
            title: title,
            price: price,
            counter: counter
        }
        let found = false;
        let index = 0;
        for (let i = 0; i < this.state.cart.length; i++) {
            let item = {...this.state.cart[i]};
            delete item.counter;
            let obj1 = {...obj}
            delete obj1.counter;
            if (JSON.stringify(item) === JSON.stringify(obj1)) {
                found = true;
                index = i;
                break;
            }
        }
        if (found) {
            this.state.cart[index].counter++;
            this.setState({
                ...this.state
            });
            return;
        }
        this.setState({
            ...this.state,
            cart: this.state.cart.concat({code, title, price, counter})
        });

    }

    removeFromCart(code) {
        console.log(this.state)
        if (this.state.cart !== undefined) {
            this.setState({
                ...this.state,
                cart: this.state.cart.map(i => {
                    if (i?.code === code) {
                        if (i.counter > 1) {
                            i.counter--;
                            return {...i}
                        }
                        return;
                    } else {
                        return i;
                    }
                })
            });
        }
    }

    getFullPrice() {
        if(this.state.cart.length > 1) {
            let price = 0;
            this.state.cart.map((item) => {
                if(!isNaN(item?.price)) {
                    price += item?.price * item?.counter;
                    console.log(price);
                }
            })
            console.log(price);
            return price;
        }
        return 0
    }

    getCount() {
        if(this.state.cart.length > 1 ) {
            let count = 0;
            this.state.cart.map((item) => {
                if(!isNaN(item?.counter)) {
                    count += item?.counter;
                    console.log(count);
                }
            })
            return count;
        }
        return 0;
    }

}

export default Store;
