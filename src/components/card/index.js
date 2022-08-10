import React from "react";
import propTypes from "prop-types";
import "./style.css";
import List from "../list";
import { getСonvertProps } from "../../utils";

function Card(props) {
  return (
    <div className="Card">
      {/* <div className="Card__wrap">
        <div className="Card__control">
          <h2 className="Card__button">Корзина</h2>
          <button className="Card__button" onClick={props.сardClose}>
            Закрыть
          </button>
        </div> */}
      <div className="Card__list">
        <List
          items={getСonvertProps(props.cardList)}
          cardActive={props.onDeleteCardItem}
          isCardShow={props.isCardShow}
        />
        <div className="Card__total-price">
          <b>
            Итого
            <span>
              {new Intl.NumberFormat("ru", {
                style: "currency",
                currency: "RUB",
              }).format(
                props.cardList.reduce((acc, item) => acc + item.price, 0)
              )}
            </span>
          </b>
        </div>
      </div>
</div>
  );
}

Card.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cardActive: propTypes.func,
  isCardShow: propTypes.bool,
};

Card.defaultProps = {
  items: [],
  cardActive: () => {},
};

export default React.memo(Card);
