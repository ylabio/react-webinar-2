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
            this.listeners = this.listeners.filter((item) => item !== callback);
        };
    }

    /**
     * Добавалени товара в корзину
     * @param addedItem
     */

    addToCartItem(addedItem) {
        const existingCartItemIndex = this.state.cart.items.findIndex(
            (item) => item.code === addedItem.code
        );
        const existingCartItem = this.state.cart.items[existingCartItemIndex];
        let updatedItems;
        let updatedTotalQuantity = this.state.cart.totalQuantity;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };

            updatedItems = [...this.state.cart.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = this.state.cart.items.concat({
                ...addedItem,
                quantity: 1,
            });
            updatedTotalQuantity += 1;
        }

        const updatedTotalPrice = this.state.cart.totalPrice + addedItem.price;

        this.setState({
            ...this.state,
            cart: {
                items: updatedItems,
                totalPrice: updatedTotalPrice,
                totalQuantity: updatedTotalQuantity,
            },
        });
    }

    /**
     * Удаление товара из корзины
     * @param removeItemCode
     */

    deleteFromCartItem(removeItemCode) {
        const existingCartItemIndex = this.state.cart.items.findIndex(
            (item) => item.code === removeItemCode
        );
        if (existingCartItemIndex === -1) return;

        const existingCartItem = this.state.cart.items[existingCartItemIndex];
        let updatedItems;

        let updatedTotalQuantity = this.state.cart.totalQuantity;

        updatedItems = this.state.cart.items.filter(
            (item) => item.code !== removeItemCode
        );
        updatedTotalQuantity--;

        const updatedTotalPrice =
            this.state.cart.totalPrice -
            existingCartItem.price * existingCartItem.quantity;

        this.setState({
            ...this.state,
            cart: {
                items: updatedItems,
                totalPrice: updatedTotalPrice,
                totalQuantity: updatedTotalQuantity,
            },
        });
        console.log(this.state);
    }
}

export default Store;
