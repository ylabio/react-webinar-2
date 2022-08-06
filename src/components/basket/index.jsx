import './style.css';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import { pluralize } from '../../utils/pluralizator';
import css from '../../utils/css';

const Basket = ({ className, basketAction, quantity, summ }) => {
  const cn = bem('Basket');

  return (
    <div className={css(className, cn())}>
      <span>В корзине: </span>
      {quantity ? (
        <strong>
          {quantity} {pluralize(quantity, 'товар', 'товара', 'товаров')} /{' '}{summ} &#8381;
        </strong>
      ) : (
        <strong>пусто</strong>
      )}

      <button onClick={basketAction}>Перейти</button>
    </div>
  );
};

Basket.propTypes = {
  className: propTypes.string,
  basketAction: propTypes.func,
  quantity: propTypes.number,
  summ: propTypes.number,
};

Basket.defaultProps = {
  basketAction: () => {},
};

export default React.memo(Basket);
