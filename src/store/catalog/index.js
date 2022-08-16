import StateModule from "../module";

class CatalogState extends StateModule{
  initState() {
    return {
      fetchState: 'pending', // 'error' || 'ok'
      pageItems: [],
      pagesCount: 0,
    };
  }

  // вызывается в компоненте pages/catalog
  async fetchPageItems (page) {
    const errorState = {
      ...this.initState(),
      fetchState: 'error',
    };

    // отсеивает неправильные роуты
    if (Number.isNaN(+page) || page < 1) {
      console.error('store.catalog.fetchPageItems - неправильный url');
      setTimeout(() => this.setState(errorState), 1000); // без задержки не срабатывало
    }
    else {
      await fetch(`/api/v1/articles?limit=10&skip=${page * 10 - 10}&fields=items(*),count`)
        .then(res => {
          if (res.ok) return res.json()
          else throw new Error(res.status + ' ' + res.statusText);
        })
        .then(json => {
          if (json.result.items.length) {
            this.setState({
              fetchState: 'ok',
              pageItems: json.result.items,
              pagesCount: Math.ceil(json.result.count / 10),
            })
          } else {
            throw new Error('запрашиваемая страница больше последней');
          }
        })
        .catch(err => {
          console.error('store.catalog.fetchPageItems:', err);
          this.setState(errorState);
        })
    }
  }

  clear () {
    this.setState(this.initState());
  }
}

export default CatalogState;
