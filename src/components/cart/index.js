import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import Modal from '../modal';

function Cart({ items, onItemDeleteFromCart }) {
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  React.useEffect(() => {
    setTotalPrice(
      items.reduce((acc, item) => {
        return acc + item.price * item.amount;
      }, 0)
    );
  }, [items]);

  return (
    // добавить пусто
    <div className="Controls">
      В корзине: {items.length}
      {plural(items.length, 'товар', 'товара', 'товаров')} /{totalPrice}
      <button onClick={handleModalClick}>Перейти</button>
      {isModalOpen && (
        <Modal
          closeModal={handleModalClick}
          items={items}
          onItemDeleteFromCart={onItemDeleteFromCart}
        />
      )}
    </div>
  );
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDeleteFromCart: propTypes.func,
};

Cart.defaultProps = {
  items: [],
  onItemDeleteFromCart: () => {},
};

export default React.memo(Cart);
