import React from "react"
import propTypes from 'prop-types';
import "./styles.css"

const Item = ({item, onClick, current}) => {
    return <span onClick={onClick} className={"Pagination-item" + (current ? " Pagination-item_active" : "")}>
        {item}
    </span>
}

Item.propTypes = {
    item: propTypes.number,
    onClick: propTypes.func.isRequired,
    current: propTypes.bool
};

Item.defaultProps = {
    current: false
}
export default React.memo(Item)