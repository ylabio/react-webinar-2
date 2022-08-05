import { cn as bem } from '@bem-react/classname';
import './style.css';
import propTypes from 'prop-types';
import css from '../../utils/css';

const Basket = ({ className = '' }) => {
  const cn = bem('Basket');

  return (
    <div className={css(className, cn())}>
      <span>В корзине: </span>
      <strong>
        2 товара <span>/ 223 &#8381;</span>
      </strong>
      <button>Перейти</button>
    </div>
  );
};

Basket.propTypes = {
  className: propTypes.string,
};

export default Basket;
