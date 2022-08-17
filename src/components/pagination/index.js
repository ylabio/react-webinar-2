import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import usePaginate from "../../utils/use-paginate";
import './style.css';


function Pagination({itemsQty, pagSel, pagSurf}) {
  const cn = bem('Pagination');

  console.log('Pagination');

  const pagArr = usePaginate(itemsQty, pagSel);

  const pagCurr = pagArr.map((item, idx) =>
    <div
      key={idx}
      className={cn(`pag-item ${item.sel ? 'pag-selected' : null}`)}
      onClick={() => {item.clickable ? pagSurf(item.pag) : null}}
    >
      {item.pagEl}
    </div>)

  return (
    <div className={cn()}>
      {pagCurr}
    </div>
  )
}

Pagination.propTypes = {
  itemsQty: propTypes.number.isRequired,
  pagSel: propTypes.number.isRequired,
  pagSurf: propTypes.func.isRequired
}

export default React.memo(Pagination);
