import React, { useCallback, useEffect } from "react";
import {cn as bem} from "@bem-react/classname";
import useStore from "../../../utils/use-store";
import useSelector from "../../../utils/use-selector";
import './style.css';
import { useParams } from 'react-router-dom';
import numberFormat from "../../../utils/number-format";

function Product() {
  const cn = bem('Product');

  const { id } = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    _id: state.catalog.productInfo._id,
    description: state.catalog.productInfo.description,
    edition: state.catalog.productInfo.edition,
    category: state.catalog.productInfo.category.title,
    maidIn: {
      title: state.catalog.productInfo.maidIn.title,
      code: state.catalog.productInfo.maidIn.code,
    },
    price: state.catalog.productInfo.price,
  }));

  useEffect(() => {
    store.get('catalog').getInfo(id);
  }, [])

  return (
    <section className={cn()}>
      <p>{select.description}</p>
      <div className={cn('container')}>
        <div className={cn('subtitle')}>
          <span>Страна производитель: </span>
          <span>{`${select.maidIn.title} (${select.maidIn.code})`}</span>
        </div>
        <div className={cn('subtitle')}>
          <span>Категория: </span>
          <span>{select.category}</span>
        </div>
        <div className={cn('subtitle')}>
          <span>Год выпуска: </span>
          <span>{select.edition}</span>
        </div>
      </div>
      <div className={cn('price')}>
        <span>Цена: </span>
        <span>{numberFormat(select.price)} ₽</span>
      </div>
      <button>Добавить</button>
    </section>
  )
}

export default React.memo(Product);
