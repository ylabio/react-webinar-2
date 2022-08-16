import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Error from '../../components/error';
import Loading from '../../components/loading';
import ProductDetails from '../../components/product-details';

const Product = () => {
  const store = useStore();
  const productId = useParams().id;

  const select = useSelector(state => ({
    fetchState: state.product.fetchState,
    details: state.product.details,
  }));

  useEffect(() => {
    store.get('product').fetchDetails(productId);
    store.get('modals').close();
    return () => store.get('product').clear();
  }, [productId]);

  const callbacks = {
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    select.fetchState === 'pending' ? <Loading />
      : select.fetchState === 'error' ? <Error />
        : <ProductDetails details={select.details} onAdd={callbacks.addToBasket} />
  );
}

export default React.memo(Product);