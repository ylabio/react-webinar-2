import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Layout from '../layout';
import BasketSimple from '../basket-simple';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';


function ItemPage({ onOpen, amount, sum, addToBasket }) {
  const cn = bem('ItemPage');

  const { id } = useParams();

  const store = useStore();

  useEffect(() => {
    store.get('catalog').loadItem(id);
  }, [id]);

  const select = useSelector((state) => ({
    item: state.catalog.item,
  }));

  return (
    <Layout head={<h1>Наименование товара</h1>}>
      <BasketSimple onOpen={onOpen} amount={amount} sum={sum} />
      <div className={cn()}>
        <div>{select.item?.description}</div>
        <div>
          <div>
            Страна производитель:{' '}
            <span>
              {select.item?.maidIn?.title} ({select.item?.maidIn?.code})
            </span>
          </div>
        </div>
        <div>
          Категория: <span>{select.item?.category?.title}</span>
        </div>
        <div>
          Год выпуска: <span>{select.item?.edition}</span>
        </div>
        <div className={cn('price')}>Цена: {numberFormat(select.item?.price)} ₽</div>
      </div>
      <button className={cn('button')} onClick={() => addToBasket(id)}>
        Добавить
      </button>
    </Layout>
  );
}

    ItemPage.propTypes = {
      addToBasket: propTypes.func,
      onOpen: propTypes.func,
      amount: propTypes.number,
      sum: propTypes.number,
    };

    ItemPage.defaultProps = {
      addToBasket: () => {},
      onOpen: () => {},
      amount: 0,
      sum: 0,
    };

export default React.memo(ItemPage);
