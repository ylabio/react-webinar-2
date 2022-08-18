import React, { useContext } from 'react'
import propTypes from 'prop-types';
import './style.css'
import { ContextTitle } from './../../store/contextTitle';
function Pagination({ lengthItems, getItems }) {
    const { itemsSkipPages, selectedNumber } = useContext(ContextTitle)

    const pageNumber = []
    for (let item = 1; item < Math.ceil(lengthItems / itemsSkipPages) - 1; item++) {
        pageNumber.push(item)
    }
    return lengthItems > 0 ? (
        <div className={`Pagination`}>

            <div className={`Wrapper-Pagination`}>
                <p className={`Pagination-bth-first ${selectedNumber == 0 ? 'selected' : ''}`} onClick={() => {
                    getItems((pageNumber[0] - 1) * itemsSkipPages, 0, itemsSkipPages)
                    localStorage.setItem('selected', 0)
                }

                }>{pageNumber[0]}</p>
                <p className={`ThreeDots ${selectedNumber >= 3 ? 'block' : ''}`}>...</p>
                {
                    pageNumber.map(number => (
                        <p key={number} className={`Pagination-bth 
                            ${((selectedNumber === 0 && number <= 2)
                                || (selectedNumber === (pageNumber.length + 1)
                                    && number >= (pageNumber.length - 1)))
                                || number === selectedNumber - 1
                                || number === selectedNumber + 1
                                || selectedNumber === number
                                ? 'block'
                                : ''}
                                ${selectedNumber === number ? 'selected' : ''}
                            `} onClick={() => {

                                getItems(number * itemsSkipPages, number, itemsSkipPages)
                                localStorage.setItem('selected', number)

                            }
                            }>
                            {number + 1}
                        </p>
                    ))
                }
                <p className={`ThreeDots ${selectedNumber <= (pageNumber.length - 1) && selectedNumber !== (pageNumber.length - 1) ? 'block' : ''} `}>...</p>
                <p className={`Pagination-bth-last ${selectedNumber === pageNumber.length + 1 ? 'selected' : ''}`} onClick={() => {
                    localStorage.setItem('selected', pageNumber.length + 1)
                    getItems((pageNumber.length + 1) * itemsSkipPages, pageNumber.length + 1, itemsSkipPages)
                }}>{pageNumber.length + 2}</p>
            </div>

        </div>
    ) : null
}


Pagination.propTypes = {
    getItems: propTypes.func.isRequired,
    lengthItems: propTypes.number,
    selectedNumber: propTypes.number,
}
Pagination.defaultProps = {
    lengthItems: 0,
    selectedNumber: 0,
}

export default Pagination