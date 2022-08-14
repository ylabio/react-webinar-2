import React, { useCallback } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PaginationLayout(props){
    const cn = bem('Pagination');
    const { itemsNuberPerPage, totalItemsQuantity, activePage, renderItem } = props
    const Paginator = useCallback(() => {
        const numberOfPages = Math.ceil(totalItemsQuantity/itemsNuberPerPage)
        const arrayOfNumbersOfShrinkableButtons = Array.from(Array(numberOfPages).keys())
        const first = arrayOfNumbersOfShrinkableButtons.splice(0, 1)[0]
        const last = arrayOfNumbersOfShrinkableButtons.splice(-1, 1)[0]
        const Dotes = () => <span className={cn('dotes')}>...</span>

        return(
            <ol className={cn()}>
                {renderItem(first, activePage)}
                {activePage < 3 || <Dotes />}
                {arrayOfNumbersOfShrinkableButtons.map((indexNumber) => {
                    if (activePage === 0) {
                        const seconde = indexNumber === 1
                        const third = indexNumber === 2
                        if (seconde || third) return renderItem(indexNumber, activePage)
                    } else if (activePage - numberOfPages === -1) {
                        const prePreLast = (indexNumber - activePage) === -2
                        const preLast = (indexNumber - activePage) === -1
                        if (prePreLast || preLast) return renderItem(indexNumber, activePage)
                    } else {
                        const preCurrent = (indexNumber - activePage) === -1
                        const isCurrent = (indexNumber - activePage) === 0
                        const postCurrent = (indexNumber - activePage) === 1
                        if (preCurrent || isCurrent || postCurrent) return renderItem(indexNumber, activePage)
                    }
                    })}
                {last - activePage < 3 || <Dotes />}
                {renderItem(last, activePage)}
             </ol>
            )}, [itemsNuberPerPage, totalItemsQuantity, activePage])

    return totalItemsQuantity === 'idle' ? null : <Paginator />
}

export default React.memo(PaginationLayout);