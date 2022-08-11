import React from "react";
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import ModalItem from "../modal-item";
import ModalResult from "../modal-result";

function ModalList(props){

  const cn = bem('ModalList');

  return(
    <div className={cn()}>
      {props.orderForModal.map(item =>
        <div className={cn('item')} key={item.code}>
          <ModalItem key={item.code} item={item} onDelete={props.onDelete}/>
        </div>)}
        <ModalResult result={props.totalSum}/>
    </div>
    )
}

ModalList.propTypes = {
  orderForModal: propTypes.object,
  onDelete: propTypes.func,
  totalSum: propTypes.number 
}

ModalList.defaultProps = {
  item: {},
  onDelete: () => {},
  totalSum: 0
}

export default React.memo(ModalList);