import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Translate from '../../app/translate';
import propTypes from 'prop-types';
import LayoutSpinner from '../../components/layout-spinner';

function CardContent ({ 
  item,
  language,
  onAdd,
  isFetching, 
}) { 
  const cn = bem('CardContent');

  return (
    <section className={cn()}>
      <LayoutSpinner
        isFetching={isFetching}
        color={'red'}
      >
        <main className={cn('main')}>
          <div>{item?.description}</div>
          <div className={cn('block')}>
            <Translate text={'Страна производитель'} />: 
            <span className={cn('value')}>{item?.maidIn?.title} ({item?.maidIn?.code})</span>
          </div>
          <div className={cn('block')}>
            <Translate text={'Категория'} />:
            <span className={cn('value')}>{item?.category?.title}</span>
          </div>
          <div className={cn('block')}>
            <Translate text={'Год выпуска'} />:
            <span className={cn('value')}>{item?.edition}</span>
          </div>
          <div className={cn('price')}>
            <Translate text={'Цена'} />:
            <span>{(item?.price)?.toLocaleString(language)} ₽</span>
          </div>
        </main>
      </LayoutSpinner>

      <button 
          className={cn('button')}
          onClick={() => onAdd(item?._id)}
        >
          <Translate text={'Добавить'} />
      </button>
    </section>
  );
}

CardContent.propTypes = {
  item: propTypes.object.isRequired,
  language: propTypes.string.isRequired,
  onAdd: propTypes.func.isRequired,
  isFetching: propTypes.bool.isRequired,  
};

export default React.memo(CardContent);