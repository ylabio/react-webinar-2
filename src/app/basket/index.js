import List from "../../components/list";
import React, {useCallback} from "react";
import { Link, useNavigate } from "react-router-dom";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { translate } from "../../utils/translate";

function Basket(){

  console.log('Basket');

  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    language: state.language.language,
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    baseUrlArticle: state.article.baseUrlArticle
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => navigate(-1), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), [])
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket 
        language={select.language} 
        translate={translate}
        item={item} 
        link={<Link to={`${select.baseUrlArticle}/${item._id}`}>{item.title}</Link>}
        onRemove={callbacks.removeFromBasket}
      />, []),
  }

  return (
    <LayoutModal title={translate(select.language, 'Basket')} language={select.language} onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal language={select.language} translate={translate} sum={select.sum}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
