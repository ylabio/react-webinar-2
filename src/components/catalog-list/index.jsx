import propTypes, { object } from 'prop-types';
import List from '../list';
import Item from '../item';

const CatalogList = ({ items, onAddToBasket }) => {
  return (
    <List>
      {items.map((item) => (
        <Item
          item={item}
          key={item.code}
          actionBtn={<button onClick={() => onAddToBasket(item.code)}>Добавить</button>}
        />
      ))}
    </List>
  );
};

CatalogList.propTypes = {
  items: propTypes.arrayOf(object).isRequired,
  onAddToBasket: propTypes.func.isRequired,
};

export default React.memo(CatalogList);
