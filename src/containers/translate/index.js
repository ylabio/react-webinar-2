import React from 'react'
import {Link} from "react-router-dom";
import propTypes from 'prop-types';
import jsxToString from 'jsx-to-string';
import JsxParser from 'react-jsx-parser'

function Translate(props) {
  // если ключ перевода не передан, ничего не делаем
  if (!props.tkey) {
    return children
  }
  // переводим jsx в строку
  const jsxString = jsxToString(props.children)
  // достаем открывающиеся и закрывающиеся теги кроме спанов (выступают как обертка) 
  const openTags = jsxString.match(/<\b(?!span)[^>]*>/g);
  const closedTags = jsxString.match(/((<\/)(?!span)\w+(>))/g);
  // достаем шаблон перевода
  let translated = props.t(props.tkey)
  // форматируем шаблонную строку, вставляем теги
  for (let i = 1; i <= props.count; i++) {
    translated = translated.replace(`<${i}>`, openTags[i - 1]).replace(`</${i}>`, closedTags[i - 1]);
  }

  return <JsxParser components={{Link}} jsx={translated}/>
}

export default React.memo(Translate)

JsxParser.defaultProps = {
  renderInWrapper: false
}

Translate.propTypes = {
  children: propTypes.node,
  count: propTypes.number,
  tkey: propTypes.node,
  t: propTypes.func
}