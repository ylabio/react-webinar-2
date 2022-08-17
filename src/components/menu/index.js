import React, {useCallback} from 'react';
import {cn as bem} from '@bem-react/classname';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import NavMenu from '../nav-menu';
import BasketSimple from '../basket-simple';
import './style.css';

// function Menu(props) {
//   const cn = bem('Menu');
  // const store = useStore();

  // const callbacks = {
  //   // Открытие корзины
  //   openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  //   // Добавление в корзину
  //   addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  // };

  // const select = useSelector(state => ({
  //   amount: state.basket.amount,
  //   sum: state.basket.sum
  // }));

  // Список элементов меню. Пока оставил тут
  // const navMenu = [
  //   {
  //     title: 'Главная',
  //     link: '/',
  //   },
  // ];
  
//   return (
//     <div className={cn()}>
//       <NavMenu links={navMenu}/>
//       <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
//     </div>    
//   )
// }

// export default Menu;
