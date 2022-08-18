import React,{useContext} from 'react'
import './style.css'
import propTypes from 'prop-types';
import { ContextTitle } from '../../../store/contextTitle';
import numberFormat from './../../../utils/numberFormat';
import Loading from '../../loading/loading';
function Info({ cuurentItem, isEmpty, addToBasket }) {
    const {itemsSkipPages,selectedNumber} = useContext(ContextTitle)
    console.log(selectedNumber)
    return isEmpty(cuurentItem) ? (
        <div className='InfoItem'>
            <p>{cuurentItem.description}</p>
            <p>Страна производитель:<span>{cuurentItem.maidIn.title}</span> </p>
            <p>Категория:<span>{cuurentItem.category.title}</span> </p>
            <p>Год выпуска: <span>{cuurentItem.edition}</span></p>
            <p className='price'>Цена:{numberFormat(cuurentItem.price)} ₽</p>
            <button onClick={() => addToBasket(cuurentItem._id,itemsSkipPages,selectedNumber)}>Добавить</button>
        </div>
    ) : <Loading/>
}
Info.propTypes = {
    cuurentItem: propTypes.object,
    isEmpty: propTypes.func.isRequired,
    addToBasket: propTypes.func.isRequired
}
Info.defaultProps = {
    cuurentItem: {}
}
export default Info