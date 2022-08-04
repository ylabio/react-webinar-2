import React from 'react';
import {counter} from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
    //функция для слонения "раз"
    const wordDeclension = (number, txt, cases = [2, 0, 1, 1, 1, 2]) =>
        txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

    // Выбор состояния из store
    const {items} = store.getState();
    const addCountOnClick = (code) => {
        store.setSelectCount(code)
        store.selectItem(code)
    }

    return (
        <div className='App'>
            <div className='App__head'>
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className='Controls'>
                <button onClick={() => {
                    const code = counter();
                    store.createItem({code, title: `Новая запись ${code}`, selectedCount: 0})
                }}> Добавить
                </button>
            </div>
            <div className='App__center'>
                <div className='List'>{items.map(item =>
                    <div key={item.code} className='List__item'>
                        <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                             onClick={() => addCountOnClick(item.code)}>
                            <div className='Item__number'>{item.code}</div>
                            <div className='Item__title'>{item.title}
                                {item.selectedCount >0 ?<span> | Выделялся <span>{item.selectedCount !== 0 && item.selectedCount}</span> {' '}
                                        {wordDeclension(item.selectedCount, ['раз', 'раза', 'раз'])}
                                    </span>:''}
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
