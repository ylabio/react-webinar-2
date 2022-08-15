import React, { useState, useEffect } from 'react'
import useStore from './../../utils/use-store';
import propTypes from 'prop-types';
import { useCallback } from 'react';
import './style.css'
function Pagination({ lengthItems }) {
    const store = useStore();
    const [selectedNumber, setSelectedNumber] = useState(0)
    const [itemsSkipPages, setItemsSkipPages] = useState(10);
    
    const callbacks = {
        getItems: useCallback((nextList, selectedNum) => {
            store.get('catalog').getItems(nextList)
            setSelectedNumber(selectedNum)

        }, [])
        
    }
    const pageNumber = []
    for (let item = 1; item < Math.ceil(lengthItems / itemsSkipPages) - 1; item++) {
        pageNumber.push(item)
    }
    return (
        <div className={`Pagination`}>

            <div className={`Wrapper-Pagination`}>
                <p className={`Pagination-bth-first ${selectedNumber === 0 ? 'selected' : ''}`} onClick={() => callbacks.getItems((pageNumber[0] - 1) * itemsSkipPages, 0)}>{pageNumber[0]}</p>
                <p className={`ThreeDots ${selectedNumber >= 3 ? 'block' : ''}`}>...</p>
                {
                    pageNumber.map(number => (
                        <p key={number} className={`Pagination-bth 
                            ${((selectedNumber === 0 && number <=2)
                                || (selectedNumber === (pageNumber.length + 1)
                                    && number >= (pageNumber.length - 1)))
                                || number === selectedNumber - 1
                                || number === selectedNumber + 1
                                || selectedNumber === number
                                ? 'block'
                                : ''}
                                ${selectedNumber === number ? 'selected' : ''}
                            `} onClick={() => callbacks.getItems(number * itemsSkipPages, number)}>
                            {number + 1}
                        </p>
                    ))
                }
                <p className={`ThreeDots ${selectedNumber <= (pageNumber.length - 1) && selectedNumber !== (pageNumber.length - 1) ? 'block' : ''} `}>...</p>
                <p className={`Pagination-bth-last ${selectedNumber === pageNumber.length + 1 ? 'selected' : ''}`} onClick={() => callbacks.getItems((pageNumber.length + 1) * itemsSkipPages, pageNumber.length + 1)}>{pageNumber.length + 2}</p>
            </div>

        </div>
    )
}
Pagination.propTypes = {

    lengthItems: propTypes.number,
}
Pagination.defaultProps = {
    lengthItems: 0,
}

export default Pagination