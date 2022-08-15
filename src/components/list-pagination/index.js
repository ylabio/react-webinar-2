import React from 'react'
import Pagination from '../../app/pagination'
import List from '../list'
import propTypes from 'prop-types';
function ListAndPagination({ items, renderItem, lengthItems,setTitle }) {
    return (
        <>
            <List
                items={items}
                setTitle={setTitle}
                renderItem={renderItem}
            />
            <Pagination
                lengthItems={lengthItems}
            />
        </>
    )
}
ListAndPagination.propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    renderItem: propTypes.func,
    lengthItems: propTypes.number,
    setTitle: propTypes.func,
}

ListAndPagination.defaultProps = {
    items: [],
    renderItem: (item) => {
        return item.toString()
    },
    lengthItems: 0,
    setTitle: () => {

    }
}


export default ListAndPagination