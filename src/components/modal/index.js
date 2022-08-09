import React, {useCallback, useState} from 'react';
// import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Layout from "../layout";
import Controls from "../controls";
import List from "../list";
import Item from "../item";
import './style.css';

function Modal(props) {
  
  const cn = bem('Modal');

  return (
    <div className={cn('')}>
      <div className={cn('bg')} onClick={() => {props.setVisibility(false)}}>
        <div className={cn('window')} onClick={e => e.stopPropagation()}>

          <div className={cn('head')}>
            <div className={cn('headBg')}>
              {props.head}
              <button onClick={() => {props.setVisibility(false)}}> 
                Закрыть
              </button>
            </div>
          </div>
          <List items={props.items}
                onButton={props.onButton}
                buttonText={props.buttonText}
          />
          <div className={props.bottomText ? cn('bottomText') : cn('bottomText_hidden')}>
            <div className={cn('bottomTextSum')}>Итого</div>
            <div className={cn('bottomTextData')}>{props.bottomText}</div>
          </div>
          <div className={!props.bottomText ? cn('emptyCartMessage') : cn('emptyCartMessage_hidden')}>В корзине пока ничего нет, но вы можете это исправить :)</div>
        </div>
      </div>
    </div>
  )
}


export default React.memo(Modal);
