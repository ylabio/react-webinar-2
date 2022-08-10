
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
            cart: this.state.cart.filter(item => item.id !== code),
        });
        this.setState({
            ...this.state,
            amount: this.state.cart.reduce((s, itemInCart) => s = s + itemInCart.result, 0),
            cartLength: this.state.cart.filter((val, ind, arr) => arr.indexOf(val) === ind).length
        });

    }

    /**
     * Выделение записи по её коду
     * @param code
     */
    selectItem(code){
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

    totalPrice(code){

    }
    addItem(code) {
        const [item] = this.state.items.filter((item) => item.code === code);
        for (let index in this.state.cart){
            const itemInCart = this.state.cart[index];
            if (itemInCart.id === code) {
                itemInCart.counter++;
                itemInCart.result=this.state.cart.reduce((s, itemInCart) => s = s + itemInCart.counter*item.price, 0),
                this.setState({
                    ...this.state,
                    cart: [...this.state.cart],
                    amount:this.state.amount + item.price,
                    cartLength: this.state.cart.filter((val, ind, arr) => arr.indexOf(val) === ind).length
                });
                return
            }
        }


        this.setState({
            ...this.state,
            // cart: [...this.state.cart, {...item, counter: 1, result:item.price}],
            cart: [...this.state.cart, {id:item.code, counter: 1, result:item.price}],
            amount: this.state.amount + item.price,
            cartLength: this.state.cartLength + 1
        });
    }

}

export default Store;
