

class Store {

    constructor(initState) {
        // Состояние приложения (данные)
        this.state = initState;
        // Слушатели изменений state
        this.listners = [];
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
        for (const lister of this.listners) {
            lister();
        }
    }

    /**
     * Подписка на изменение state
     * @param callback {Function}
     * @return {Function} Функция для отписки
     */
    subscribe(callback) {
        this.listners.push(callback);
        // Возвращаем функцию для удаления слушателя
        return () => {
            this.listners = this.listners.filter(item => item !== callback);
        }
    }

    /**
     * Создание записи
     */
    addItemToCart({item}) {
        let checkItem = true;
        this.setState({
            ...this.state,
            cartItems: this.state.cartItems.map(itemObj => {
                if (itemObj.code === item.code) {
                    checkItem = false;
                    return {
                        ...itemObj,
                        count: itemObj.count +1,
                    }
                }
                return itemObj;
            }),
        });


        if (checkItem) {
            this.setState({
                ...this.state,
                cartItems: this.state.cartItems.concat({...item, count: 1}),
                totalItemCount: this.state.totalItemCount +1,
            });

        }

        this.getTotalPrice()
    }

    deleteCartItem(item) {
        this.setState({
            ...this.state,
            cartItems: this.state.cartItems.filter((itemObj) => itemObj.code !== item.code),
            totalItemCount: this.state.totalItemCount -1,
        })
        this.getTotalPrice()
    }
    getTotalPrice(){
        this.setState({
            ...this.state,
            totalPrice: this.state.cartItems.reduce((prev, item) => item.price * item.count + prev, 0)
        })
    }
}


    // getTotalPrice() {
    //   let totalPriceItem = this.state.cartItems.map((item)=>
    //       item.total).reduce((sum,item)=>sum + item.price * item.count,0)
    //
    //   this.setState({
    //     ...this.state,
    //     totalCartItem: totalPriceItem
    //   })
    // }
    // getTotalPriceCart() {
    //     this.setState({
    //         ...this.state,
    //         orderCount: this.state.cartItems?.reduce((sum,item)=> {
    //             return sum + item.count*item.price
    //         }, 0)
    //     })
    //
    // }

    // getTotalCount(number) {
    //     const {cartItem} = this.state;
    //     this.setState({
    //         ...this.state,
    //         uniqueOrder: cartItem + number,
    //     })
    // }


export default Store;
