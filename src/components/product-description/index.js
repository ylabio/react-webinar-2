import React from 'react';
import propTypes from 'prop-types';
import LangArr from '../lang-array';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function ProductDescription(props) {
    const cn = bem('Description')
    return (
        <>
            {props.item && <div className={cn()}>
    
                <div className={cn('cell')}>{props.item.description}</div>
                <div className={cn('cell')}>{LangArr.productDescription.madeIn[props.lang]}: <span>{props.item.maidIn.title}</span></div>
                <div className={cn('cell')}>{LangArr.productDescription.category[props.lang]}: <span>{props.item.category.title}</span></div>
                <div className={cn('cell')}>{LangArr.productDescription.edition[props.lang]}: <span>{props.item.edition}</span></div>
                <div className={cn('price')}>{LangArr.productDescription.price[props.lang]}:<span> {numberFormat(props.item.price)}</span></div>
                <div className={cn('cell')}><button onClick={() => props.onAdd(props.item._id)}>{LangArr.productDescription.button[props.lang]}</button></div>
            </div>}
        </>
    )
}

ProductDescription.propTypes = {
    
  }
  
ProductDescription.defaultProps = {
    item: {},
    onAdd: () => {}
}

export default React.memo(ProductDescription); 