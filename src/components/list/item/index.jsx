import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import css from "../../../utils/css";

function Item({ item, actionBtn, className = '' }) {
  const cn = bem('Item');

  return (
    <div className={css(className, cn())}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>
        {item.price.toLocaleString('ru-RU')} &#8381;
      </div>
      {item.count && <div className={cn('count')}>{item.count} шт</div>}
      <div className={cn('actions')}>{actionBtn}</div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.shape({
    title: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    code: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    count: propTypes.number,
  }).isRequired,
  actionBtn: propTypes.element,
  className: propTypes.string,
};

Item.defaultProps = {
  actionBtn: <button>Кнопка</button>
}

export default React.memo(Item);
