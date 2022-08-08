import './style.css';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import List from '../list';
import Item from '../item';

const CatalogModalContent = ({ basket, onBasketDelete }) => {
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
          <Item
            item={item}
            key={item.code}
            count={item.count}
            actionBtn={<button onClick={() => onBasketDelete(item.code)}>Удалить</button>}
          />
        ))}
      </List>
      <div>
        <strong className={cn('summ')}>
          Итого <span>{basket.summ} &#8381;</span>
        </strong>
      </div>
    </div>
  );
};

CatalogModalContent.propTypes = {
  basket: propTypes.object.isRequired,
  onBasketDelete: propTypes.func.isRequired,
};

export default React.memo(CatalogModalContent);
