import StateModule from "../module";

class ProductState extends StateModule {
  initState() {
    return {
      fetchState: 'pending', // 'error' || 'ok'
      details: {},
      name: undefined,
    };
  }

  async fetchDetails (id) {
    await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`)
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error(res.status + ' ' + res.statusText);
      })
      .then(json => {
        this.setState({
          fetchState: 'ok',
          details: json.result,
          name: json.result.title,
        })
      })
      .catch(err => {
        console.error('store.catalog.fetchProduct', err);
        this.setState({
          ...this.initState(),
          fetchState: 'error',
        })
      });
  }

  clear () {
    this.setState(this.initState())
  }
}

export default ProductState;