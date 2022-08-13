import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';
import BasketSimple from '../basket-simple';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function Layout({head, children}){
  const cn = bem('Layout');

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.localization.language,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    onLanguageRu: useCallback(
			() => store.get('localization').changeLanguage('ru'),
			[],
		),
    onLanguageEn: useCallback(
			() => store.get('localization').changeLanguage('en'),
			[],
		),
    onLanguageIt: useCallback(
			() => store.get('localization').changeLanguage('it'),
			[],
		),
  };

  const languages = [
    { code: 'ru', onClick: callbacks.onLanguageRu, title: 'Ru' },
    { code: 'en', onClick: callbacks.onLanguageEn, title: 'En' },
    { code: 'it', onClick: callbacks.onLanguageIt, title: 'It' },
  ]

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <div>{head}</div>
        <div className={cn('headLanguage')}>
          {languages.map((language) => (
						<button
							className={cn(
								'headLanguageBtn',
								select.language === language.code && { active: true },
							)}
							key={language.code}
							onClick={language.onClick}
						>
							{language.title}
						</button>
					))}
        </div>
      </div>
      <div className={cn('content')}>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

Layout.defaultProps = {
}

export default React.memo(Layout);
