import getFetchState from "../utils/getFetchState";
import StateModule from "../module";

class CatalogState extends StateModule{
  initState() {
    return {
      pageItems: [],
      // limit: 10,
      currentPage: 1,
      currentRoute: '/',
      pagesCount: 1,
      filterParams: {
        query: '',
        sort: '',
        category: '',
      },
      fetchState: {
        pending: true,
        error: false,
        ok: false,
      },
    };
  }

  async fetchPageItems(location) {
    this.setState({
      ...this.getState(),
      fetchState: getFetchState('pending'),
    }, 'Загрузка товаров страницы каталога');

    const filterParams = { ...this.getState().filterParams };

    const routeSearch = new URLSearchParams(location.search);

    for (let key in filterParams) { filterParams[key] = routeSearch.get(key) || ''; }

    const currentPage = +routeSearch.get('page') || 1;

    let apiQuery = `/api/v1/articles?fields=items(*),count&limit=10&skip=${currentPage * 10 - 10}`

    if (filterParams.sort) apiQuery += '&sort=' + filterParams.sort;
    if (filterParams.query) apiQuery += '&search[query]=' + filterParams.query;
    if (filterParams.category) apiQuery += '&search[category]=' + filterParams.category;

    await fetch(apiQuery)
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error(res.status + ' ' + res.statusText);
      })
      .then(json => {
        if (!json.result.items.length) throw new Error('Ничего не найдено');
        this.setState({
          pageItems: json.result.items,
          currentPage,
          currentRoute: location.pathname + location.search,
          pagesCount: Math.ceil(json.result.count / 10),
          fetchState: getFetchState('ok'),
          filterParams,
        }, 'Загружены товары страницы каталога')
      })
      .catch(err => {
        console.error('store.catalog.fetchPageItems() ' + err);
        this.setState({
          ...this.getState(),
          fetchState: getFetchState('error'),
          filterParams,
        }, 'Ошибка при загрузке товаров каталога');
      })
  }



  // Вызывается при смене параметров фильтра
  // Возвращает новый роут, который обрабатывается fetchPageItems()
  //
  getFilterResultRoute (param, value) {
    const filterParams = { ...this.getState().filterParams };
    filterParams[param] = value;

    let route = '/catalog?';
    if (filterParams.sort) route += `sort=${filterParams.sort}&`;
    if (filterParams.query) route += `query=${filterParams.query}&`;
    if (filterParams.category) route += `category=${filterParams.category}`;

    return route.replace(/&$/, '');
  }
}

export default CatalogState;
