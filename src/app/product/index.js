import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import BasketSimple from '../../components/basket-simple';
import Description from "../../components/description";
import Menu from "../../components/menu";

function Product (props){
  console.log('Product');
  const store = useStore();
  const {id} = useParams();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    _id: state.product._id,
    title: state.product.title,
    description: state.product.description,
    country: state.product.maidIn.country,
    countryCode: state.product.maidIn.code,
    edition: state.product.edition,
    price: state.product.price,
    category: state.product.category
  }));

  const item = select.items.filter((item)=> item._id === id)[0];

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    onAdd: useCallback((e) => props.onAdd(item._id), [props.onAdd, item]),
  };

  useEffect(()=>{
    if (select.items.length > 0) {
      store.get('product').load(id);
    }
    else {
      store.get('catalog').loadId(id);
      store.get('product').load(id);
    }
    
  },[]);

  return (
    <Description onAdd={callbacks.onAdd}
      select={select}>
      <BasketSimple onOpen={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum}>
          <Menu onButtonClick={()=>store.get('catalog').setActive(0)}/>
        </BasketSimple>
    </Description>
  )
}

export default React.memo(Product);