import React, { useCallback } from 'react';
import LangControls from '../../components/lang-controls';
import Layout from '../../components/layout';
import useLang from '../../utils/hooks/use-lang';
import useSelector from '../../utils/hooks/use-selector';
import useStore from '../../utils/hooks/use-store';
import propTypes from 'prop-types';
import BasketSimple from '../../components/basket-simple';
import FlexBetweenWrapper from "../../components/flex-between-wrapper";
import Menu from "../../components/menu";

const CommonLayout = ({ children, head }) => {
  const store = useStore();
  const { main, basketSimple, menu } = useLang();
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
          <h1>{head || main.head}</h1>
          <LangControls
            language={language}
            onLangChange={callbacks.changeLang}
          />
        </>
      }
    >
      <div>
        <FlexBetweenWrapper>
          <Menu ln={menu} />
          <BasketSimple
            ln={basketSimple}
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
          />
        </FlexBetweenWrapper>
        {children}
      </div>
    </Layout>
  );
};

CommonLayout.propTypes = {
  children: propTypes.node.isRequired,
  head: propTypes.string,
};

export default CommonLayout;
