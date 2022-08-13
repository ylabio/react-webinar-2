import React, { useCallback } from 'react';
import LangControls from '../../components/lang-controls';
import Layout from '../../components/layout';
import useLang from '../../utils/hooks/use-lang';
import useSelector from '../../utils/hooks/use-selector';
import useStore from '../../utils/hooks/use-store';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BasketSimple from '../../components/basket-simple';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CommonLayout = ({ children }) => {
  const store = useStore();
  const cn = bem('Common-layout');
  const { main, basketSimple, commonLayout } = useLang();
  const { language } = useSelector((s) => s.systemPreference);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    changeLang: useCallback((str) => {
      store.get('systemPreference').setLanguage(str);
    }, []),
  };

  return (
    <Layout
      head={
        <>
          <h1>{main.head}</h1>
          <LangControls
            language={language}
            onLangChange={callbacks.changeLang}
          />
        </>
      }
    >
      <div className={cn()}>
        <div className={cn('head')}>
          <Link to={'/'}>{commonLayout.home}</Link>
          <BasketSimple
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
            ln={basketSimple}
          />
        </div>
        {children}
      </div>
    </Layout>
  );
};

CommonLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default CommonLayout;
