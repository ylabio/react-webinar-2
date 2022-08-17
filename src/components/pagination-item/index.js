import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

export const dots = {
  pagEl: <span>&nbsp;&#8230;&nbsp;</span>,
  clickable: false
};

function PagItem({idx}) {
  const cn = bem('PagItem');
  return (
    <div key={'pag-' + idx} className={cn()}>
      {idx}
    </div>
  )
}

PagItem.propTypes = {
  idx: propTypes.number.isRequired,
}

export default React.memo(PagItem);
