import StateModule from "../module";

class ProductState extends StateModule {
  initState() {
    return {
      fetchState: 'pending', // 'error' || 'ok'
      details: {}
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
        })
      })
      .catch(err => {
        console.error('store.catalog.fetchProduct', err);
        this.setState({
          fetchState: 'error',
          details: {}
        })
      });
  }
}

export default ProductState;