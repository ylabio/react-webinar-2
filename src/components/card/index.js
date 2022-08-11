import React from "react";
import propTypes from "prop-types";
import "./style.css";
import List from "../list";

function Card(props) {
  return (
    <div className="Card">
      <div className="Card__list">
        <List
          items={props.cardList}
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
              }).format(props.totalPrice)}
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
