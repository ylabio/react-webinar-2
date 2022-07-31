class Store {

    constructor() {
        // Состояние приложения (данные)
        this.state = {items: []};
        // Слушатели изменений state
        this.listners = [];
        this.selectedId = 0;
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
        };
    }

    /**
     * Создание записи
     */
    createItem({code, title = "Новая запись", selected = false, counted = 0}) {
        //элементы начинаются с 1 id, в переменную selectedId записываем id выделенного объекта
        //сейчас, по логике приложения, у нас может быть только 1 выделенный элемент, поэтому, логичнее хранить его id
        //и при рендере присваивать выделенный класс только тому, кто соответствует записанному id
        //если при инициализации было указано 2 элемента с выделением, будет снято выделение с предыдущего
        if (selected) {
            this.selectedId = code;
            counted++
        }
        this.setState({
            ...this.state,
            items: this.state.items.concat({code, title, selected, counted})
        });
    }

    /**
     * Получение записи по её коду
     * @param code
     */
    getItem(code) {
        return this.state.items.find(item => item.code === code ? item : false);
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
        if (!this.selectedId || this.selectedId !== code) {
            this.getItem(code).counted++;
        }
        this.selectedId === code ? this.selectedId = 0 : this.selectedId = code;
        this.setState({...this.state});
    }
}

export default Store;
