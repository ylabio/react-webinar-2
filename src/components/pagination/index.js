import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination(props) {
    const cn = bem('Pagination');

    const [idItem, setIdItem] = useState('1')

    // Сброс цвета кнопки переключения предыдущей страницы
    function styleItem(e) {
        setIdItem(e.target.id)
        try {
            if (props.activePage != e.target.id) {
                document.getElementById(`${props.activePage}`).style.backgroundColor = '#FFFFFF';
            } else {
                document.getElementById(`${idItem}`).style.backgroundColor = '#0087E9';
            }
        } catch (e) {
        }
    }

    // Функция создания пагинации
    function showPagination() {
        const addPagination = (count, first) => {
            return Array.from({length: count}, (e, i) => i).map((i) =>
                (<div id={first + i} key={first + i} className={cn('item')} onClick={(e) => {
                    props.setActivePage(first + i);
                    styleItem(e);
                }
                }
                >{first + i}</div>))
        }

        const ellipsis = () => {
            return <div className={cn('ellipsis')}>...</div>
        }

        if (props.pageCount < 6) {
            return addPagination(props.pageCount, 1)
        } else {
            if (props.activePage === 1 || props.activePage === 2) {
                return <>
                    {addPagination(3, 1)}
                    {ellipsis()}
                    {addPagination(1, props.pageCount)}
                </>
            } else if (props.activePage === props.pageCount || props.activePage === props.pageCount - 1) {
                return <>
                    {addPagination(1, 1)}
                    {ellipsis()}
                    {addPagination(3, (props.pageCount - 2))}
                </>
            } else if (props.activePage === 3) {
                return <>
                    {addPagination(4, 1)}
                    {ellipsis()}
                    {addPagination(1, props.pageCount)}
                </>
            } else if (props.activePage === (props.pageCount - 2)) {
                return <>
                    {addPagination(1, 1)}
                    {ellipsis()}
                    {addPagination(4, (props.pageCount - 3))}
                </>
            } else if (props.activePage >= 4 || props.activePage < (props.pageCount - 3)) {
                return <>
                    {addPagination(1, 1)}
                    {ellipsis()}
                    {addPagination(3, (props.activePage - 1))}
                    {ellipsis()}
                    {addPagination(1, props.pageCount)}
                </>
            }
        }
    }

    // Установка цвета кнопки активной страницы
    useEffect(() => {
        try {
            document.getElementById(`${idItem}`).style.backgroundColor = '#0087E9';
        } catch (e) {
        }
    })
    useEffect(() => {
        try {
            document.getElementById(`${idItem}`).style.backgroundColor = '#0087E9';
        } catch (e) {
        }
    }, [idItem])

    return (
        <div className={cn()}>
            {showPagination()}
        </div>
    )
}

Pagination.propTypes = {
    pageCount: propTypes.number.isRequired,
    activePage: propTypes.number.isRequired,
    setActivePage: propTypes.func,
}

Pagination.defaultProps = {
    pageCount: 1,
    activePage: 1,
}

export default React.memo(Pagination);

