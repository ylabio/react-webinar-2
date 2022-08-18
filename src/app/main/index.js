import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import { translate } from "../../utils/translate";
import LayoutFlex from "../../components/layout-flex";
import Menu from "../../components/menu";

function Main(){

  console.log('Main');
  const navigate = useNavigate();
  const location = useLocation();
  const {page} = useParams();
  const currentPage = parseInt(page) || 1

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(parseInt(page) || 1);
  }, [page])

  const select = useSelector(state => ({
    language: state.language.language,
    items: state.catalog.items,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    loading: state.catalog.loading,
    baseUrlArticle: state.article.baseUrlArticle
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => navigate("/basket", { state: { modal: location } }), [location]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переход на страницу каталог
    onPageChange: useCallback(page => navigate(`/page/${page}`), []),
    // Смена языка
    selectLanguage: useCallback(language => store.get('language').selectLanguage(language), [])
  };

  const renders = {
    item: useCallback(item => <Item 
        language={select.language} 
        translate={translate}
        item={item} 
        link={<Link to={`${select.baseUrlArticle}/${item._id}`}>{item.title}</Link>}
        onAdd={callbacks.addToBasket}         
      />, [select.language]),
  }

  return (
    <Layout head={<h1>{translate(select.language, 'Title')}</h1>} language={select.language} selectLanguage={callbacks.selectLanguage}>
      <LayoutFlex>
        <Menu language={select.language} translate={translate} links={[{title: 'Home', href: '/'}]}>
          {/* <Link to='/'>{translate(select.language, 'Home')}</Link> */}
        </Menu>
        <BasketSimple language={select.language} translate={translate} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </LayoutFlex>
      {select.loading ? 
        <Spinner /> : 
        <List items={select.items} renderItem={renders.item}/>}
      <Pagination currentPage={currentPage} totalPages={select.count} onPageChange={callbacks.onPageChange} />
    </Layout>
  )
}

export default React.memo(Main);
