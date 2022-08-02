import React from 'react';
import getNoun from 'plural-ru';
import { counter } from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App( { store } ) {
    // Выбор состояния из store
    const { items } = store.getState();

    return (
        <div className='App'>
            <div className='App__head'>
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className='Controls'>
                <button onClick={ () => {
                    const code = counter();
                    store.createItem({ code, title: `Новая запись ${ code }` })
                } }> Добавить
                </button>
            </div>
            <div className='App__center'>
                <div className='List'>{ items.map(item =>
                    <div key={ item.code } className='List__item'>
                        <div className={ 'Item' + ( item.selected ? ' Item_selected' : '' ) }
                             onClick={ () => store.selectItem(item.code) }>
                            <div className='Item__number'>{ item.code }</div>
                            <div
                                className='Item__title'>{ item.title }
                                { item.selectedCount
                                    ? ` | Выделялось ${ item.selectedCount } ${ getNoun(item.selectedCount, 'раз', 'раза', 'раз') }`
                                    : '' }
                            </div>
                            <div className='Item__actions'>
                                <button onClick={ ( e ) => store.deleteItem(item.code, e) }>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                ) }
                </div>
            </div>
        </div>
    );
}

export default App;