import './style.css';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import BasketItem from "../basket-item";

const BasketModalContent = ({ basket, onBasketDelete }) => {
  const cn = bem('Catalog-modal-content');

  if (!basket.goods.length)
    return (
      <div className={cn({ bg: 'dark' })}>
        <div className={cn('empty')}>Пусто</div>
      </div>
    );

  return (
    <div className={cn()}>
      <List className={cn('list')}>
        {basket.goods.map((item) => (
          <BasketItem
            item={item}
            key={item.code}
            actionBtn={
                <button onClick={() => onBasketDelete(item.code)}>Удалить</button>
            }
          />
        ))}
      </List>
      <div>
        <strong className={cn('summ')}>
          Итого <span>{basket.summ.toLocaleString('ru-RU')} &#8381;</span>
        </strong>
      </div>
    </div>
  );
};

BasketModalContent.propTypes = {
  basket: propTypes.object.isRequired,
  onBasketDelete: propTypes.func.isRequired,
};

export default React.memo(BasketModalContent);
