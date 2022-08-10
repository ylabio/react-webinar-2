import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import CustomButton from '../custom-button';
import './style.css';

function Controls({basketCount, totalSum, setModal}){
  const cn = bem('Controls');
  
  return (
    <div className={cn()}>
      <div className={cn('element')}>В корзине:</div>
      <div className={cn('element')}>
        {basketCount ? 
          <span>
            {basketCount} {''}
            {plural(basketCount, "товар", "товара", "товаров")} / {''}
            {totalSum.toLocaleString('ru-RU')} &#8381; 
          </span> :
          <span>пусто</span>
        }
      </div>
      <CustomButton onClick={() => setModal(true)}>Перейти</CustomButton>
    </div>
  )
}

Controls.propTypes = {
  basketCount: propTypes.number.isRequired,
  totalSum: propTypes.number.isRequired,
  setModal: propTypes.func.isRequired,
}

export default React.memo(Controls);
