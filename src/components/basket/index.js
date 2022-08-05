import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

/** Utils */
import {toSpacedNum} from "../../utils.js";

/** Components */
import Modal from '../modal';
import Product from './product.js';

/** Styles */
import './style.css';

function Basket(props) {
  const cn = bem('Basket');

  return (
    <Modal
      isOpened={props.isOpened}
      title={'Корзина'}
      onClose={props.onClose}
    >
      <div className={cn('list')}>
        {props.items.length
          ? <>
              {props.items.map(item => (
                <Product key={item.code} product={item} onDelete={props.onDropItem} />
              ))}
              <br />
              <h3 className={cn('total-summ')}>Итого: {toSpacedNum(props.totalSumm)} ₽</h3>
            </>
          : <h4>Нет товаров</h4>
        }
      </div>

    </Modal>
  );
}

Basket.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  isOpened: propTypes.bool,
  totalSumm: propTypes.number,
  onClose: propTypes.func,
  onDropItem: propTypes.func,
};

Basket.defaultProps = {
  isOpened: false,
  totalSumm: 0,
  onClose: () => {},
  onDropItem: () => {},
};

export default React.memo(Basket);
