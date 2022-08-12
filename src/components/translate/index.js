import React from 'react'
import PropTypes from 'prop-types';
import useSelector from '../../utils/use-selector'

const languages = {
  en: {
    "Магазин": "Shop",
    "В корзине:": "Cart:",
    "пусто": "empty",
    "Перейти": "Open cart",
    "Добавить": "Add to cart",
    "Удалить": "Remove",
    "Корзина": "Cart",
    "Закрыть": "Close",
    "Итого": "Subtotal",
  }
}

function Translate(props) {
  const lang = useSelector(state => state.lang.name)

  function translate(text) {
     if (Object.keys(languages).includes(lang)) {
       return languages[lang][text] || text
     }
     return text
   }

  return (
    translate(props.children)
  )
}

export default Translate

Translate.propTypes = {
  children: PropTypes.node
};