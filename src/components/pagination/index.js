import React, {useState} from "react";
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import {PaginationButton} from "../ui/pagination-button";
import './style.css'

export const Pagination = ({itemsPerPage, totalItems, setPage, activeIndex}) => {
    const cn = bem('Pagination');
    const array = [];
    const amount = Math.ceil(totalItems / itemsPerPage);

    // createPages(array, totalItems, activeIndex, amount);

    function createPages(pages, pagesCount, currentPage) {
        if (pagesCount >= 10) {
            pages[0] = 1;
            if (currentPage >= 4) {
                let lastIndex = currentPage + 1;

                if (lastIndex >= amount) {
                    lastIndex = amount - 1;
                }

                if (activeIndex - 1 >= 3) {
                    if (amount - 2 <= activeIndex) {
                        pages[activeIndex - 4] = '...';
                    } else {
                        pages[activeIndex - 2] = '...';
                    }
                }

                for (let i = currentPage - 1; i <= lastIndex; i++) {
                    pages.push(i)
                    if (i == pagesCount) break
                }
                if (activeIndex + 2 < amount) {
                    pages[activeIndex + 2] = '...';
                    console.log(pages);
                }


            } else {
                for (let i = currentPage - 1; i <= currentPage + 2; i++) {
                    if (i >= 2) {
                        pages.push(i)
                    }
                    if (i == pagesCount) break
                }
                pages[currentPage + 3] = '...';

            }
            if (activeIndex + 3 === amount) {
                pages[activeIndex + 2] = '...';
                console.log(pages);
            }
            pages[amount] = amount;
        } else {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
            }
        }
    }

    createPages(array, totalItems, activeIndex);
    return (
        <div className={cn()}>
            {array.map((value, index) => {
                return (
                    <li key={index} className={cn('item')}>
                        {value === '...' ? <div>...</div> :
                            <PaginationButton activeIndex={activeIndex} setPage={setPage} index={value}/>}
                    </li>
                )
            })}
        </div>
    )
}