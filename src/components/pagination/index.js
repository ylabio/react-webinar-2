import React, {useEffect, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import propTypes from "prop-types";

function Pagination({totalCount, perPage, onChangePage}) {

    const cn = bem('Paginator');

    const pageCount = Math.ceil(totalCount / perPage)  //количество страниц

    const pages = [] //массив страниц

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    const [currentPage, setCurrentPage] = useState(1) //текущая страница

    const [activePages, setActivePages] = useState([]) //номера доступных страниц

    useEffect(() => {
        let tempPages = [...activePages]

        let dotsMid = '...'
        let dotsL = '...'
        let dotsR = '...'

        //если страниц меньше 6, то выводим все страницы сразу
        if (pages.length < 6) {
            tempPages = pages
        }
        //если текущая страница 1-2, то 1 2 3 ... последняя страница
        else if (currentPage >= 1 && currentPage <= 2) {
            tempPages = [1, 2, 3, dotsMid, pages.length]
        }
        //если текущая страница 3, то 1 2 3 4 ... последняя страница
        else if (currentPage === 3) {
            const sliced = pages.slice(0, 4)
            tempPages = [...sliced, dotsMid, pages.length]
        }
        //если текущая страница больше 3 и меньше 3го числа с конца, то точки с обеих сторон
        else if (currentPage > 3 && currentPage < pages.length - 2) {
            const portionL = pages.slice(currentPage - 2, currentPage)
            const portionR = pages.slice(currentPage, currentPage + 1)
            tempPages = ([1, dotsL, ...portionL, ...portionR, dotsR, pages.length])
        }
        //если текущая страница в диапазоне последних трех страниц, то 1...последние страницы
        else if (currentPage > pages.length - 3) {
            const sliced = pages.slice(pages.length - 4)
            tempPages = ([1, dotsL, ...sliced])
        }

        setActivePages(tempPages)
        onChangePage(currentPage, perPage)
    }, [pageCount, currentPage])

    const showPages = activePages.map((item, index) => {
        if (item === '...') {
            return <li className={cn('dots')} key={index}>{item}</li>
        }
        return <li className={item === currentPage ? 'selected' : ''} key={index}
                   onClick={() => setCurrentPage(item)}>{item}</li>
    })

    return (
        <div className={cn()}>
            <div className={cn('items')}>
                {showPages}
            </div>
        </div>
    )
}

Pagination.propTypes = {
    onChangePage: propTypes.func.isRequired,
    totalCount: propTypes.number,
    perPage: propTypes.number.isRequired,
}

Pagination.defaultProps = {
    totalCount: null
}

export default React.memo(Pagination);
