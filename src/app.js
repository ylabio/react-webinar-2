import React from 'react';
import {counter} from './utils.js';
import './style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
    // Выбор состояния из store
    const {items} = store.getState();

    // Множественная форма для отображения количества выделений записи
    const pluralize = (n, forms) => {
        return [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)
            ? n + forms[0]
            : n + forms[1];
    }

    return (
        <div className='App'>
            <div className='App__head'>
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className='Controls'>
                <button onClick={() => {
                    const code = counter();
                    store.createItem({code, title: `Новая запись ${code}`})
                }}> Добавить
                </button>
            </div>
            <div className='App__center'>
                <div className='List'>{items.map(item =>
                    <div key={item.code} className='List__item'>
                        <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                             onClick={() => store.selectItem(item.code)}>
                            <div className='Item__number'>{item.code}</div>
                            <div className='Item__title'>
                                {`${item.title} ${item.clickCount && item.selected
                                    ? '| Выделялось ' + pluralize(item.clickCount, [' раза', ' раз'])
                                    : ''}`}
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
