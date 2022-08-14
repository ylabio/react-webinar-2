import StateModule from "../module";


class LangState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      language: "russian",
      dictionary:{
        russian:{head:'Магазин',addBtn:'Добавить',delBtn:'Удалить',
          main:'Главная',inBasket:'В корзине',empty:'пусто',basket:'Корзина',
          units:'шт.',go:'Перейти',cls:'Закрыть',total:'Итого',product1:'товар',
          product2:'товара',product5:'товаров',made:'Страна производитель'
          ,type:'Категория',date:'Год выпуска',price:'Цена'},
        english:{head:'Shop',addBtn:'Add',delBtn:'Delete',
          main:'Main',inBasket:'In cart',empty:'empty',basket:'Cart',
          units:'units',go:'Go to cart',cls:'Сlose',total:'Total',product1:'item',
          product2:'items',product5:'items',made:'Country of origin'
          ,type:'Category',date:'Year of manufacture',price:'Price'},
      }
    };
  }  
  /**
   * Изменение языка
   */
  changeLang(lang) {
    console.log(lang)
    this.setState({
      ...this.getState(),
      language: lang}, 'Смена языка');
  }

}

export default LangState;
