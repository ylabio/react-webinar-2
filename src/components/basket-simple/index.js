import React, {useContext} from 'react';
import propTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import {LocalisationContext} from "l10n";
import {l10n} from "l10n/strings";
import './styles.css';

function BasketSimple({sum, amount, onOpen}) {
  const cn = bem('BasketSimple');
  const {lang} = useContext(LocalisationContext);

  const heading = l10n.cart.heading[lang];
  const state = l10n.cart.state.empty[lang];
  const navigation = l10n.layout.navigation.home[lang];
  const button = l10n.buttons.checkout[lang];
  const pluralItems = l10n.cart.item.plural[lang];

  return (
    <div className={cn()}>
        <span className={cn('label')}>{heading}:</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, ...pluralItems)} / ${numberFormat(sum)} ₽`
            : state
          }
          </span>
        <button className="BasketSimple__button" onClick={onOpen}>{button}</button>
    </div>
  );
}

BasketSimple.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
};

BasketSimple.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0
};

export default React.memo(BasketSimple);
