import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function Controls({ onOpenModal, counter, totalPrice }) {
  const cn = bem('Controls');

  const counterLastNumber = counter.toString().slice(-1);
  const counterLastNumbers = counter.toString().slice(-2);

  const counterFunc = () => {
    if (
      counterLastNumber > 1 &&
      counterLastNumber < 5 &&
      counterLastNumbers != 12 &&
      counterLastNumbers != 13 &&
      counterLastNumbers != 14
    ) {
      return `${counter} товара`;
    } else if (
      counterLastNumber == 0 ||
      counterLastNumber >= 5 ||
      (counterLastNumbers > 10 && counterLastNumbers < 15)
    ) {
      return `${counter} товаров`;
    } else {
      return `${counter} товар`;
    }
  };

  const texts = () => {
    if (counter === 0) {
      return 'пусто';
    } else {
      return `${counterFunc()} / ${totalPrice.toLocaleString('ru-RU')} ₽`;
    }
  };

  return (
    <div className={cn()}>
      <p className={cn('bin')}>В корзине:</p>
      <p className={cn('counter')}>{texts()}</p>

      <div className={cn('actions')}>
        <button className={cn('btn')} onClick={onOpenModal}>
          Перейти
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  onOpenModal: propTypes.func.isRequired,
  counter: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
};

Controls.defaultProps = {
  onOpenModal: () => {},
  counter: 0,
  totalPrice: 0,
};

export default React.memo(Controls);
