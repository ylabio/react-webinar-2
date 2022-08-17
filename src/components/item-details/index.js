import React, { useCallback } from "react";
import numberFormat from "../../utils/numberFormat";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";

function ItemDetails(props) {
  const cn = bem("ItemDetails");
  const { onAdd, item } = props;

  const callbacks = {
    onAdd: useCallback(() => onAdd(item._id), [onAdd, item]),
  };

  return (
    <div className={cn()}>
      <div>{item.description}</div>
      <div>
        Страна производитель:{" "}
        <strong>
          {item.maidIn.title} ({item.maidIn.code})
        </strong>
      </div>
      <div>
        Категория: <strong>{item.category.title}</strong>
      </div>
      <div>
        Год выпуска: <strong>{item.edition}</strong>
      </div>
      <div>Цена: {numberFormat(item.price)} ₽</div>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
}

ItemDetails.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
};

ItemDetails.defaultProps = {
  onAdd: () => {},
};

export default React.memo(ItemDetails);
