import React, { createContext, useReducer } from 'react';
import * as ItemActions from "./constants"

const startArray = ['Название элемента', 'Некий объект','Заголовок', 'Короткое название', 'Запись', 'Пример выделенной записи', 'Седьмой']

const initialState = {
  items: startArray.map((el, idx) => {
    return {
      code: idx + 1,
      title: el,
      counted: 0
    }
  }),
  counter: startArray.length + 1
}

export const Ctx = createContext(initialState)

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
            code: el.code,
            title: el.title, 
            selected: el.code === payload,
            counted: el.code === payload ? el.counted + 1 : el.counted
          }
        })
      }
    default:
      return state
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Ctx.Provider value={{state, dispatch}}>
      { children }
    </Ctx.Provider>
  )
}

export default Store;