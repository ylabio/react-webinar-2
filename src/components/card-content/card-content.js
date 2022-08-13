import React from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';
import LayoutSpinner from '../../components/layout-spinner';

function CardContent ({ 
  item,
  language,
  onAdd,
  isFetching,
  translationData, 
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
            {translationData.country}: 
            <span className={cn('value')}>{item?.maidIn?.title} ({item?.maidIn?.code})</span>
          </div>
          <div className={cn('block')}>
            {translationData.category}: 
            <span className={cn('value')}>{item?.category?.title}</span>
          </div>
          <div className={cn('block')}>
            {translationData.year}:
            <span className={cn('value')}>{item?.edition}</span>
          </div>
          <div className={cn('price')}>
            {translationData.price}
            <span>{(item?.price)?.toLocaleString(language)} ₽</span>
          </div>
        </main>
      </LayoutSpinner>

      <button 
          className={cn('button')}
          onClick={() => onAdd(item?._id)}
        >
          {translationData.add}
      </button>
    </section>
  );
}

CardContent.propTypes = {
  item: propTypes.object.isRequired,
  language: propTypes.string.isRequired,
  onAdd: propTypes.func.isRequired,
  isFetching: propTypes.bool.isRequired,  
  translationData: propTypes.object.isRequired  
};

export default React.memo(CardContent);