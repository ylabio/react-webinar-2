import React from 'react';
import {counter, declOfNum, textFormatter} from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
    // Выбор состояния из store
    const {items} = store.getState();

    return (
        <div className='App'>
            <div className='App__head'>
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className='Controls'>
                <button onClick={() => {
                    const code = counter();
                    store.createItem({code, title: `Новая запись ${code}`, count: 0})
                }}> Добавить
                </button>
            </div>
            <div className='App__center'>
                <div className='List'>{items.map(item =>
                    <div key={item.code} className='List__item'>
                        {/* изменил проверку на более читаемый для себя вариант  */}
                        <div className={item.selected ? 'Item Item_selected' : 'Item'}
                             onClick={() => store.selectItem(item.code)}>
                            <div className='Item__number'>{item.code}</div>
                            <div className='Item__title'>{item.title}
                                {
                                    item.count > 0
                                    &&
                                    <span
                                        className='Item__count'>| Выделялось {item.count} {textFormatter(item.count, ['раз', 'раза', 'раз'])}</span>
                                }
                            </div>
                            <div className='Item__actions'>
                                <button onClick={() => store.deleteItem(item.code)}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default App;