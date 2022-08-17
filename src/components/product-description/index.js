import React from 'react';
import propTypes from 'prop-types';
import { translate } from '../../utils/languages';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';

function ProductDescription(props) {
    const cn = bem('Description')
    return (
        <>
            {props.item && <div className={cn()}>
    
                <div className={cn('cell')}>{props.item.description}</div>
                <div className={cn('cell')}>{translate('madeIn')}: <span>{props.item.maidIn.title}</span></div>
                <div className={cn('cell')}>{translate('category')}: <span>{props.item.category.title}</span></div>
                <div className={cn('cell')}>{translate('edition')}: <span>{props.item.edition}</span></div>
                <div className={cn('price')}>{translate('price')}:<span> {numberFormat(props.item.price)}</span></div>
                <div className={cn('cell')}><button onClick={() => props.onAdd(props.item._id)}>{translate('add')}</button></div>
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