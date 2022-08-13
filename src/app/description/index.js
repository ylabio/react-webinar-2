import React, { useCallback } from 'react';
import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import { useParams } from 'react-router-dom';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import numberFormat from '../../utils/numberFormat';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Description() {
  console.log('Description');

  const { id } = useParams();
  const cn = bem('Description');

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.description.item,
  }));

  const store = useStore();

  React.useEffect(() => {
    store.get('description').loadById(id);
  }, [id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавить товар в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <div className={cn()}>
        <div>{select.item.description}</div>
        <div>
          Страна производитель:{' '}
          <span>
            {{ ...select.item.maidIn }.title}{' '}
            {`(${{ ...select.item.maidIn }.code})`}
          </span>
        </div>
        <div>
          Категория: <span>{{ ...select.item.category }.title} </span>
        </div>
        <div>
          Год выпуска: <span>{select.item.edition}</span>
        </div>
        <div className={cn('price')}>
          Цена: {numberFormat(select.item.price)} ₽
        </div>
        <button onClick={() => callbacks.addToBasket(id)}>Добавить</button>
      </div>
    </Layout>
  );
}

export default React.memo(Description);
