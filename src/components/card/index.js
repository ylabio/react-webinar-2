import React from "react";
import propTypes from "prop-types";
import "./style.css";
import List from "../list";

function Card(props) {
  
  const items = Object.entries(props.cardList.reduce((acc, item) => {
    const key = item.title
    acc[key] = {...item, count: (acc[key]?.count || 0) + 1} 
    
    return acc
  }, {})).map(([, item]) => item)

  return (
    <div className="Card">
      <div className="Card__wrap">
        <div className="Card__control">
          <h2 className="Card__button">Корзина</h2>
          <button className="Card__button" onClick={props.сardClose}>
            Закрыть
          </button>
        </div>
        <div className="Card__list">
          <List
          items={items}
          cardActive={props.onDeleteCardItem}
          isCardShow={props.isCardShow}
        />
        <div className="Card__total-price">
          <b>
            Итого 
            <span>
              {props.cardList.reduce((acc, item) => acc + item.price, 0)} ₽
            </span>
          </b>
        </div>
        
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cardActive: propTypes.func,
  isCardShow: propTypes.bool
};

Card.defaultProps = {
  items: [],
  cardActive: () => {},
};

export default React.memo(Card);
