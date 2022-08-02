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
                <div className='List'>{items.map((item, i) =>
                    <div key={item.code} className='List__item'>
                        <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                             onClick={() => {
                                 //Если у счётчика выделений не было значения, устанавливаем его в ноль
                                 if (typeof (items[i].counterOfSelected) !== 'number') {
                                     items[i].counterOfSelected = 0;
                                 };

                                 store.selectItem(item.code);
                                 //Если selected элемента присвоен true, для остальных элементов присваиваем false
                                 if(items[i].selected === true) {
                                     for (let i of items) {
                                         i.selected = false;
                                     }
                                     items[i].selected = true
                                 }

                                 //На каждый selected равный true присваиваем счётчику одно выделение
                                 item.selected ? item.counterOfSelected += 1 : item.counterOfSelected += 0;
                             }}>
                            <div className='Item__number'>{item.code}</div>
                            <div className='Item__title'>{item.title}</div>
                            <div
                                className={item.counterOfSelected ? 'Item__counter' : ''}> {item.counterOfSelected ? `Количество выделений элемента: ${item.counterOfSelected}` : ''} </div>
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
