import React, { useEffect, useCallback } from 'react'
import useStore from '../../utils/use-store'
import {useParams} from 'react-router-dom'
import useSelector from '../../utils/use-selector'
import LayoutWithHeader from '../../components/layout-with-header'
import ItemInfo from '../../components/item-info'
import Loader from '../../components/loader'
import useLocale from '../../utils/use-locale'

function ItemPage() {
  const store = useStore()
  const { id } = useParams()
  const locale = useLocale()(loc => ({
    itemInfo: loc.itemPage,
    header: {
      basketSimple: loc.basketSimple,
      nav: loc.nav
    },
    loader: loc.loader
  }))

  useEffect(() => {
    store.get('item').load(id)
    return () => {
      store.get('item').unmount()
    }
  }, [id, locale.itemInfo])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(() => store.get('basket').addToBasket(id), [id]),
  };

  const {item, amount, sum} = useSelector(state => ({
    item: state.item.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }))

  return (
    <>
      {item ?
        <LayoutWithHeader head={<h1>{item.title}</h1>}
                basketControls={
                  {
                    onOpen: callbacks.openModalBasket,
                    amount: amount,
                    sum: sum
                  }
                }
                translate={locale.header}
        >
          <ItemInfo item={item} onAdd={callbacks.addToBasket} translate={locale.itemInfo} />
        </LayoutWithHeader>
        : <Loader translate={locale.loader}/>
      }
    </>
  )
}

export default React.memo(ItemPage)