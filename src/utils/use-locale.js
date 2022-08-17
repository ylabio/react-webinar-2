import { useMemo } from "react"
import plural from 'plural-ru'
import numberFormat from "./numberFormat"
import useSelector from "./use-selector"

const locale = {
  ru: {
    main: {
      title: 'Магазин',
    },
    basket: {
      title: 'Корзина',
      btn: 'Закрыть',
    },
    nav: {
      toMain: 'Главная',
    },
    basketSimple: {
      text: 'В корзине:',
      goods: (amount, sum) => amount ? `${amount} ${plural(amount, 'товар', 'товара', 'товаров')} / ${numberFormat(sum)} ₽` : `пусто`,
      btn: 'Перейти',
    },
    basketTotal: {
      text: 'Итого',
    },
    item: {
      btn: 'Добавить',
    },
    itemBasket: {
      btn: 'Удалить',
      num: 'шт'
    },
    itemPage: {
      country: 'Страна производитель: ',
      category: 'Категория: ',
      edition: 'Год выпуска: ',
      price: 'Цена: ',
      add: 'Добавить'
    },
    loader: {
      text: 'Идёт загрузка. Пожалуйста, подождите'
    }
  },
  en: {
    main: {
      title: 'Shop',
    },
    basket: {
      title: 'Basket',
      btn: 'Close',
    },
    nav: {
      toMain: 'Home',
    },
    basketSimple: {
      text: 'In the basket',
      goods: (amount, sum) => amount ? `${amount} item${amount !== 1 ? 's' : ''} / ${numberFormat(sum)} ₽` : `empty`,
      btn: 'Go to basket',
    },
    basketTotal: {
      text: 'Total',
    },
    item: {
      btn: 'Add',
    },
    itemBasket: {
      btn: 'Delete',
      num: 'PCS'
    },
    itemPage: {
      country: 'Made in: ',
      category: 'Category: ',
      edition: 'Released: ',
      price: 'Price: ',
      add: 'Add'
    },
    loader: {
      text: 'Loading. Please, wait'
    }
  }
}

const useLocale = () => {
  const lang = useSelector(state => state.lang.lang)

  const translate = useMemo(() => query => query(locale[lang]), [lang, locale])

  return translate
}

export default useLocale