import React from "react";
import "./styles.css";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import propTypes from "prop-types";

function ItemDetail({id, item, onAdd}) {
    const cn = bem('ItemDetail');

    return (
        <div className={cn('content')}>
            <p>{item?.description}</p>
            <div className={cn('block')}>
                <span>Страна производитель:</span>
                <span className={cn('cell')}>{item?.maidIn.title} ({item?.maidIn.code})</span>
            </div>
            <div className={cn('block')}>
                <span>Категория:</span>
                <span className={cn('cell')}>{item?.category.title}</span>
            </div>
            <div className={cn('block')}>
                <span>Год выпуска:</span>
                <span className={cn('cell')}>{item?.edition}</span>
            </div>
            <div className={cn('block')}>
                <span>Цена:</span>
                <span className={cn('cell')}>{`${numberFormat(item?.price)} ₽`}</span>
            </div>
            <button onClick={() => onAdd(id)}>Добавить</button>
        </div>
    );
}

ItemDetail.propTypes = {
    id: propTypes.string,
    item: PropTypes.object,
    onAdd: PropTypes.func,
}

ItemDetail.defaultProps = {
    onAdd: () => {},
}

export default React.memo(ItemDetail)