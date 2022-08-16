import React, { useMemo } from 'react';
import Navbar from '../navbar';
import propTypes from 'prop-types';
import './styles.css';
import BasketSimple from '../basket-simple';

function Header({ openModalBasket, amount, sum }) {
  const links = useMemo(() => {
    return [
      {
        title: 'Главная',
        link: '/',
      },
    ];
  }, []);

  return (
    <header className="Header">
      <Navbar links={links} />
      <BasketSimple onOpen={openModalBasket} amount={amount} sum={sum} />
    </header>
  );
}

Header.propTypes = {
  openModalBasket: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
};

Header.defaultProps = {
  openModalBasket: () => {},
  sum: 0,
  amount: 0,
};

export default React.memo(Header);
