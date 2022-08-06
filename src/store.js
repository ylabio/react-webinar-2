import {getTotalAmount, getTotalPrice} from "utils";

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
        };
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
     * Добавление записи в корзину
     * @param item
     */
    addCartItem(item) {
        const isExist = this.state.cart.items.some(el => el.code === item.code);
        if (isExist) {
            this.setState({
                ...this.state,
                cart: {
                    ...this.state.cart,
                    items: this.state.cart.items.map(el => {
                        if (el.code === item.code) {
                            return {...el, quantity: el.quantity + 1};
                        } else {
                            return el;
                        }
                    }),
                }
            });

            this.getCartTotals();
        } else {
            this.setState({
                ...this.state,
                cart: {
                    items: [...this.state.cart.items, {...item, quantity: 1}],
                }
            });
            this.getCartTotals();
        }

        console.log(this.state.cart);
    }

    /**
     * Удаление записи из корзины по её коду
     * @param code
     */
    deleteCartItem(code) {
        this.setState({
            ...this.state,
            cartItems: this.state.items.filter(item => item.code !== code)
        });
    }

    /**
     * Подсчет корзины
     *
     */
    getCartTotals() {
        this.setState({
            ...this.state,
            cart: {
                ...this.state.cart,
                amount: getTotalAmount(this.state.cart.items),
                price: getTotalPrice(this.state.cart.items),
            }
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
                    };
                }
                return item.selected ? {...item, selected: false} : item;
            })
        });
    }
}

export default Store;
