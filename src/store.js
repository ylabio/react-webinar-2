
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
            cart: this.state.cart.filter(item => item.code !== code)
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

    addItem(code) {
        const [item] = this.state.items.filter((item) => item.code === code);

        for (let index in this.state.cart){
            const itemInCart = this.state.cart[index];
            if (itemInCart.code === code) {
                itemInCart.counter++;
                this.setState({
                    ...this.state,
                    cart: [...this.state.cart]
                });
                return
            }
        }

        this.setState({
            ...this.state,
            cart: [...this.state.cart, {...item, counter: 1}]
        });
    }
}

export default Store;
