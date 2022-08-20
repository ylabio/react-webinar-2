import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import List from "../list";

function Product({ children, items, onBtn, btn, /*calcCountAndSumCart*/ }){
  const cn = bem('Product');

  return (
    <div className={cn()}>
      <List items={items}
            onBtn={onBtn}
            btn={btn}
      />
      {children}
    </div>
  )
}

Product.propTypes = {
  children: propTypes.node,
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onBtn: propTypes.func.isRequired,
  btn: propTypes.node,
}

Product.defaultProps = {
  items: [],
  onBtn: () => {},
  btn: '',
}

export default React.memo(Product);