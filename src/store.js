import React, { createContext, useReducer } from 'react';
import { ItemActions } from "./constants"

// Моковые данные
const startArray = ['Название элемента', 'Некий объект','Заголовок', 'Короткое название', 'Запись', 'Пример выделенной записи', 'Седьмой']

// Вид стейта
const initialState = {
  items: startArray.map((el, idx) => {
    let isActiveByDefault = el === 'Пример выделенной записи'
    
    return {
      code: idx + 1,
      selected: isActiveByDefault,
      title: el,
      counted: +isActiveByDefault
    }
  }),
  counter: startArray.length
}

export const Ctx = createContext(initialState)

// IDE подсвечивает редюсер от этого диспатча как DispatcherWithoutAction :?
const reducer = (state, action) => {
  const {type, payload} = action

  switch (type) {
    case ItemActions.ADD_NEW_ITEM:
      return {
        ...state, 
        counter: state.counter + 1,
        items: [...state.items, { code: state.counter + 1, title: payload, counted: 0}]
      }
    case ItemActions.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(el => el.code !== payload)
      }
    case ItemActions.CHANGE_ITEM:
      return {
        ...state,
        items: state.items.map(el => {
          return {
            ...el,
            selected: el.code === payload,
            counted: el.code === payload ? el.counted + 1 : el.counted // Я не вспомнил, как написать красивее
          }
        })
      }
    default:
      return state
  }
}

// Обёртка для приложения, чтобы иметь доступ к стейту из любой точки приложения при помощи хука useContext
const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Ctx.Provider value={{state, dispatch}}>
      { children }
    </Ctx.Provider>
  )
}

export default Store;