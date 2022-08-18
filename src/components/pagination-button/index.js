import React, { useCallback } from "react"
import { cn as bem } from '@bem-react/classname'
import './style.css'

function PaginationButton(props){
    const { indexNumber, activePage, moveToPage } = props;
    const cn = bem('Pagination-button')
    const isActive = activePage === indexNumber
    const callbacks = {
        moveToPage: useCallback((e) => moveToPage(indexNumber), [moveToPage])
      };

    return (
        <li>
            <button
                type="submit"
                className={cn({'selected': isActive})} 
                onClick={callbacks.moveToPage}>
                {indexNumber + 1}
            </button>
        </li>
    )
}

export default React.memo(PaginationButton);