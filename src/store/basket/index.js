import StateModule from "../module";

/**
 * Состояние корзины
 */
class BasketState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      cartItems: [],
      sum: 0,
      amount: 0
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id) {
    let cartSum = this.getState().sum;
    let itemExists = false;
    let cartItemsExists = this.getState().cartItems.length !== 0;
    const cartItems = this.getState().cartItems;

    const loadNewCartItem = async (_id) => {
      const response = await fetch('/api/v1/articles/' + _id + '?fields=*,maidIn(title,code),category(title)');
      const json = await response.json();
      return json.result;
    }

    const addNewCartItem = async (_id) => {
      /**
       * Получение данных о товаре для добавления в корзину из общего каталога через запрос к API
       */
      const newCartItem = await loadNewCartItem(_id);

      const newCartItems = [...cartItems].concat(Object.assign(newCartItem, {amount: 1}));
      // Пересчитываем общую сумму корзины
      cartSum = cartSum + newCartItem.price;
      // Новое состояние корзины
      this.setState({
        cartItems: newCartItems,
        sum: cartSum,
        amount: cartItems.length + 1
      }, 'Добавление в корзину нового товара');
    }

    // Ищем товар в корзине, чтобы увеличить его количество. Сразу получаем новый массив cartItems
    if (!cartItemsExists) {
      addNewCartItem(_id);
    } else {
      let cartSum = 0;
      console.log('addToBasket existing cartItems', cartItems)

      cartItems.map(item => {
        // Если товар был добавлен в корзину: увеличиваем его количество на 1 шт
        if (item._id === _id) {
          itemExists = true;
          item = Object.assign(item, {amount: (item.amount + 1)})
        }
        // Пересчитываем общую сумму корзины
        cartSum += item.price * item.amount;
        console.log('addToBasket cartItems', cartItems)
      });
      this.setState({
        cartItems,
        sum: cartSum,
        amount: cartItems.length
      }, 'Добавление в корзину еще одного ранее выбранного товара');
    }

    // Если товар не был раньше добавлен в корзину: получаем данные о нем из общего каталога через API
    // Добавляем в корзину
    if (!itemExists && cartItemsExists) {
      addNewCartItem(_id)
    }
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let cartSum = 0;
    const cartItems = this.getState().cartItems.filter(item => {
      // Удаляемый товар
      if (item._id === _id) return false
      // Общая суммы корзины, которая подсчитывается исходя из оставшихся товаров
      cartSum += item.price * item.amount;
      return true;
    });
    this.setState({
      cartItems,
      sum: cartSum,
      amount: cartItems.length
    }, 'Удаление из корзины')
  }
}


export default BasketState;
