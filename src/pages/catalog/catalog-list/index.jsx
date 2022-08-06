import propTypes, {object} from "prop-types";
import Item from '../../../components/list/item';
import List from '../../../components/list';

const CatalogList = ({ items, onAddToBasket }) => {
  return (
    <List>
      {items.map((item) => (
        <Item
          item={item}
          key={item.code}
          actionBtn={
            <button onClick={() => onAddToBasket(item)}>Добавить</button>
          }
        />
      ))}
    </List>
  );
};

CatalogList.propTypes = {
  items: propTypes.arrayOf(object).isRequired,
  onAddToBasket: propTypes.func.isRequired,
}

export default React.memo(CatalogList);
