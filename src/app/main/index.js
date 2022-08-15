import { Outlet } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import useSelector from "../../utils/use-selector";
import useStore from '../../utils/use-store';
import Basket from '../basket';

function Main(){
	const store = useStore();
  const modal = useSelector(state => state.modals.name);

	const select = useSelector(state => ({
		product: state.product.product
	}));

	const callbacks = {
		closeModalBasket: useCallback(() => {store.get('modals').close('basket')}, []),
	};

	useEffect(() => {
		callbacks.closeModalBasket();
	}, [select.product]);

  return (
    <>
		  <Outlet />
		  {modal === 'basket' && <Basket/>}
	  </>
  )
}

export default React.memo(Main);
