import React, {useEffect, useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import useStore from '../../utils/use-store';
import { useParams } from 'react-router-dom';
import ProductItem from '../product_item'
import useSelector from "../../utils/use-selector";
import BasketSimple from "../../components/basket-simple";
import Layout from '../layout';
import Menu from '../menu';



function ProductPage() {
  const cn = bem('product_page');

  const {id} = useParams()
  const store = useStore();
  console.log('Product_Page');
  
  // const item = props.item

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    _id: state.item_page._id,
    item: state.item_page.item,
    count: state.catalog.count,
    load: state.item_page.load,
    num: state.pagination.num
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Добавление id элемента для запроса
    addIdForRequest: useCallback(_id => store.get('item_page').getId(_id), []),
     // Добавление id элемента для запроса
    toLoadItem: useCallback(_id => store.get('item_page').loadItem(_id), []),
    // обнуление состояния
    toNullForItemState: useCallback(() => store.get('item_page').toNull(), []),
    // загрузка всего списка
    toPaginate: useCallback((skip) => store.get('catalog').paginate(skip), []),
    // получение номера страницы
    paginNum: useCallback((num) => store.get('pagination').paginationNumber(num), []), 
  };
  console.log(select.num)

  useEffect(() => {
    store.get('item_page').loadItem(id)
  }, [id])

  return (
    <Layout head={<h1>{select.item?.title}</h1>}>
      <Menu/>
      <BasketSimple 
        onOpen={callbacks.openModalBasket} 
        toNull={callbacks.toNullForItemState} 
        amount={select.amount} 
        sum={select.sum} 
      />
      <ProductItem
        item={select.item}
        onAdd={callbacks.addToBasket}
        id={id}
        loader={select.load}
      /> 
    </Layout>
  )

}

ProductPage.propTypes = {
  onAdd: propTypes.func,
  items: propTypes.arrayOf(propTypes.object).isRequired,
}

ProductPage.defaultProps = {
  items: [],
  onAdd: () => {}
}

export default React.memo(ProductPage);
