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
    createItem({code, title = 'Новая запись', selected = false, select_count = 0}) {
        this.setState({
            ...this.state,
            items: this.state.items.concat({code, title, selected, select_count})
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
                console.log(item.title.toString())
                if (item.code === code) {
                    item.selected = !item.selected;
                    item.select_count++
                    console.log(item.select_count)
                    if (!item.title.includes('| Выделялось')) {
                        item.first_title = item.title
                        item.title = `${item.title} | Выделялось ${item.select_count}`
                    }
                    else {
                        item.title = `${item.first_title} | Выделялось ${item.select_count}`
                    }
                }
                if (item.code !== code) {
                    item.selected = false;
                }
                return item;
            })
        });
    }
}

export default Store;
