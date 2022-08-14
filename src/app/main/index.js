import { Outlet } from 'react-router-dom';
import React from 'react';
import useSelector from "../../utils/use-selector";
import Basket from '../basket';

function Main(){
	const modal = useSelector(state => state.modals.name);

  return (
    <>
			<Outlet />
			{modal === 'basket' && <Basket/>}
	  </>
  )
}

export default React.memo(Main);
