import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import usePaginate from "../../utils/use-paginate";
import './style.css';


function Pagination({artQty, pagSel, pagSurf}) {
  const cn = bem('Pagination');

  console.log('Pagination');

  const pagArr = usePaginate(artQty, pagSel);

  const pagCurr = pagArr.map((item, idx) =>
    <div
      key={idx}
      className={cn(`pag-item ${item.sel ? 'pag-selected' : null}`)}
      onClick={() => pagSurf(item.pag)}
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
  artQty: propTypes.number.isRequired,
  pagSel: propTypes.number.isRequired,
  pagSurf: propTypes.func.isRequired
}

export default React.memo(Pagination);
