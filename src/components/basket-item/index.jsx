import './style.css';
import { cn as bem } from '@bem-react/classname';
import css from '../../utils/css';
import propTypes from 'prop-types';

const BasketItem = ({ className, item, actionBtn }) => {
  const cn = bem('Basket-item');

  return (
    <div className={css(className, cn())}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{item.price.toLocaleString('ru-RU')} &#8381;</div>
      <div className={cn('count')}>{item.count} шт</div>
      <div className={cn('actions')}>{actionBtn}</div>
    </div>
  );
};

BasketItem.propTypes = {
  item: propTypes.shape({
    title: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    count: propTypes.number.isRequired,
    code: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  }).isRequired,
  actionBtn: propTypes.element,
  className: propTypes.string,
};

BasketItem.defaultProps = {
  actionBtn: <button>Кнопка</button>,
};

export default React.memo(BasketItem);
