import React from "react";

function Item({itemInfo: {selected, title, code, counter}, deleteItem, selectItem}) {

    const correctNumeral = () => {
        let remainder = counter % 100
        if (remainder !== 12 && remainder !== 13 && remainder !== 14) {
            remainder = remainder % 10
            return remainder === 2 || remainder === 3 || remainder === 4 ? 'раза' : 'раз'
        }
        return 'раз'
    }

    return <div key={code} className='List__item'>
        <div className={'Item' + (selected ? ' Item_selected' : '')}
             onClick={selectItem}>
            <div className='Item__number'>{code}</div>
            <div
                className='Item__title'>{title}{counter > 0 ? ` | Выделялось ${counter} ${correctNumeral()}` : ''}</div>
            <div className='Item__actions'>
                <button onClick={deleteItem}>
                    Удалить
                </button>
            </div>
        </div>
    </div>
}

export default Item