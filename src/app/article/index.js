import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import ArticleCard from "../../components/article-card"
import ChangeLang from "../../components/change-lang";
import lang from "../../utils/dictionary";

function Article() {

  console.log('Article');

  const store = useStore();

  const params = useParams();

  useEffect(() => {
    store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Изменение языка
    // Изменение слов согласно языку
    translate: useCallback((language, word) => lang(language, word), [params.lang])
  };
  //Пора декомпозировать)
  const options = {
    menuItems: [
      {key: 1, title: `${callbacks.translate(params.lang, 'Main')}`, link: `/${params.lang || 'ru' }/`},
    ]
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <ChangeLang />
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}
                    options={options.menuItems} lang={params.lang} tnslt={callbacks.translate}/>
      <ArticleCard article={select.article} onAdd={callbacks.addToBasket} tnslt={callbacks.translate} lang={params.lang}/>
    </Layout>
  )
}

export default React.memo(Article);