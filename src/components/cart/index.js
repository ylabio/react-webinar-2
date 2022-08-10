import Layout from "../layout";
import React from "react";
import propTypes from "prop-types";
import CartItem from "../cart-item";
import "./style.css";

function Cart({ items, onItemDelete, onIsShow, countCartItems, sumCart }) {
  console.log("cart-items", onIsShow);
  return (
    <>
      <Layout head={<h1>Корзина</h1>}>
        <button onClick={onIsShow}>Закрыть</button>
        <div>
          {items.map((item) => (
            <div key={item.code}>
              <CartItem
                item={item}
                // onSelect={props.onItemSelect}
                onDelete={onItemDelete}
              />
            </div>
          ))}
        </div>
        <div>
          {countCartItems === 0 && <h4>Ваша корзина пуста</h4>}
          {countCartItems > 0 && (
            <p>
              Итого{" "}
              {sumCart.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
              })}
            </p>
          )}
        </div>
      </Layout>
    </>
  );
}

export default React.memo(Cart);
