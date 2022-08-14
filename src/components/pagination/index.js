import React, { useMemo } from 'react';
import "./style.css"
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import { useParams } from "react-router-dom";
import PaginationItem from '../pagination-item';

function Pagination({ totalItems }) {
  const { pageId } = useParams();
  const pageID = Number(pageId)
  const pages = useMemo(
    () =>
      Array.from(
        { length: Math.ceil(totalItems / 10) },
        (_, i) => i + 1
      ),
    [totalItems]
  );
  const cn = bem('Pagination');
  return (
    <div className={cn('wrapper')}>
      {
        pages.map((value) => {
          if (value == pageID) { return (<PaginationItem key={value} value={value} state={"active"} />) }
          else if (value === pages[0] || value === pages.length) { return (<PaginationItem key={value} value={value} state={"static"} />) }
          else if (value === 2 && pageID === 3) { return (<PaginationItem key={value} value={value} state={"static"} />) }
          else if (value === pageID - 1) { return (<PaginationItem key={value} value={value} state={"prev"} />) }
          else if (value === pageID + 1) { return (<PaginationItem key={value} value={value} state={"next"} />) }
          else { return null }
        })
      }
    </div>
  )
}

Pagination.propTypes = {
  totalItems: propTypes.number.isRequired,
}


export default React.memo(Pagination)
