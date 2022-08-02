    import React, {useState} from 'react';
    import {counter} from './utils.js';
    import './style.css';

    /**
     * Приложение
     * @param store {Store} Состояние приложения
     * @return {React.ReactElement} Виртуальные элементы React
     */


    function App({store}) {

        const arr1 = [2, 3, 4] // раза - окончание на эти цифры
        const arr = [12, 13, 14] // раз - помимо этих

        const handleWord = (count) => {
            let lastDigit= count % 10 // считаем послденюю цифрц числа
            return arr.includes(count) ? 'раз' : arr1.includes(lastDigit) ? 'раза' : 'раз';
        }
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
                    <div className='List'>
                        {items.map(item =>
                            <div key={item.code} className='List__item'>
                                <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                                     onClick={() => store.selectItem(item.code)}>
                                    <div className='Item__number'>{item.code}</div>
                                    <div className='Item__title'>
                                        {item.title}
                                        {item.count !== 0 ? <span>| Выделялось {item.count} {handleWord(item.count)}</span> : ''}
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
