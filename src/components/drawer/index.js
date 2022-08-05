import React, { useCallback, useEffect } from 'react';
import List from '../list';
import Layout from '../layout';
import './styles.css';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import { getCartCost } from '../../utils';

function Drawer({ handleClose, cart, mainBtn, btnText }) {
  const cn = bem('Drawer');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function keydown(e) {
        if (e.key === 'Escape') handleClose();
      }
      window.addEventListener('keydown', keydown);
      return () => {
        window.removeEventListener('keydown', keydown);
      };
    }
  }, []);

  return (
    <div className={cn()} onClick={handleClose}>
      <Layout
        head={
          <>
            <h1>Корзина</h1>
            <button onClick={handleClose}>Закрыть</button>
          </>
        }
        onClick={(e) => e.stopPropagation()}>
        {cart.length ? (
          <>
            <List mainBtn={mainBtn} items={cart} btnText={btnText} />
            <div className={cn('sum')}>
              <div>Итого: </div>
              <div>{getCartCost(cart).toLocaleString('ru')} ₽</div>
            </div>
          </>
        ) : (
          <div className={cn('empty')}>
            <span className={cn('empty-bold')}>Корзина пуста!</span>
            <span className={cn('empty-text')}>Приходите, когда выберите товары</span>
          </div>
        )}
      </Layout>
    </div>
  );
}

Drawer.propTypes = {
  handleClose: propTypes.func.isRequired,
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  mainBtn: propTypes.func,
  btnText: propTypes.string,
};

Drawer.defaultProps = {
  mainBtn: () => {},
  btnText: 'Удалить',
};

export default React.memo(Drawer);
