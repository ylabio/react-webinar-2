import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import translate from "../../utils/translate";

function CardInfo ({item, onAdd, language}) {
  const cn = bem('CardInfo');

  return (
    <section className={cn()}>
      <main className={cn('main')}>
        <div>{item?.description}</div>
        <div className={cn('block')}>
          Страна производитель: <span className={cn('value')}>{item?.maidIn?.title} ({item?.maidIn?.code})</span>
        </div>
        <div className={cn('block')}>
          Категория: <span className={cn('value')}>{item?.category?.title}</span>
        </div>
        <div className={cn('block')}>
          Год выпуска: <span className={cn('value')}>{item?.edition}</span>
        </div>
        <div className={cn('price')}>
          Цена: <span>{numberFormat(item?.price)} ₽</span>
        </div>
      </main>

      <button className={cn('button')} onClick={() => onAdd(item?._id)}>
        {translate(language, "item-button")}
      </button>
    </section>
  );
}

CardInfo.propTypes = {
  item: propTypes.object.isRequired,
   onAdd: propTypes.func.isRequired,
  language: propTypes.string.isRequired
};

CardInfo.defaultProps = {
  item: {},
  onAdd: () => {},
  language: 'ru'
}

export default React.memo(CardInfo);