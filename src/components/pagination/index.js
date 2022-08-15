import React from "react";
import { cn as bem } from "@bem-react/classname";
import './style.css';
import propTypes from 'prop-types';


function Pagination({ gapsStyle, onClick, page, gaps, totalPages }) {
  const cn = bem('Pagination');
  
  return (
    <div className={cn()}>
      <div className={cn('rockButton', [cn('button', { ['active']: page === 1 })])}
        onClick={() => onClick(1)}>
        1
      </div>
      {gaps.before ?
        <div className={cn('gaps')}>
          {gapsStyle}
        </div> : null}
      {gaps.paginationGroup.map((el) => (
        <div
          onClick={() => onClick(el)}
          key={el}
          className={cn('button', { ['active']: page === el })}
        >
          {el}
        </div>
      ))}
      {gaps.after ?
        <div className={cn('gaps')}>
          {gapsStyle}
        </div> : null}
      <div className={cn('rockButton', [cn('button', { ['active']: page === totalPages })])}
        onClick={() => onClick(totalPages)}>
        {totalPages}
      </div>
    </div>
  )

}

Pagination.propTypes = {
  gapsStyle: propTypes.string,
  onClick: propTypes.func.isRequired,
  page: propTypes.number.isRequired,
  gaps: propTypes.object.isRequired,
  totalPages: propTypes.number.isRequired
}

Pagination.defaultProps = {
  gapsStyle: "..."
}

export default React.memo(Pagination);
