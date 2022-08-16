import React, { useMemo } from 'react';
import Navbar from '../navbar';
import propTypes from 'prop-types';
import './styles.css';
import BasketSimple from '../basket-simple';
import translate from '../../utils/translate';

function Header({ openModalBasket, amount, sum, language }) {
  const links = useMemo(() => {
    return [
      {
        title: `${translate(language, 'main')}`,
        link: '/',
      },
    ];
  }, [language]);

  return (
    <header className="Header">
      <Navbar links={links} language={language} />
      <BasketSimple onOpen={openModalBasket} amount={amount} sum={sum} language={language} />
    </header>
  );
}

Header.propTypes = {
  openModalBasket: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  language: propTypes.string.isRequired,
};

Header.defaultProps = {
  openModalBasket: () => {},
  sum: 0,
  amount: 0,
};

export default React.memo(Header);
