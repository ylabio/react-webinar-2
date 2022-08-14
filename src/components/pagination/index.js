import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination({initPage, lastPage, onFirstClick, onLastClick, onPageClick}) {
  const cn = bem('Pagination');

  const [active, setActive] = useState(initPage);

  const clickHandler = (e) => {
    const value = Number(e.target.value);
    setActive(value);
    switch (value) {
      case  1: {
        onFirstClick();
        break;
      }
      case lastPage: {
        onLastClick();
        break;
      }
      default: {
        onPageClick(value - 1);
      }
    }
  };
  // Welcome to hell buddy :)
  return (<div className={cn()}>
    <ul className={cn('list')}>
      <li key="firstPage" className={cn('item')}>
        <input className={`${cn('button')} ${active === 1 ? 'active' : ''}`}
               type="button"
               value={1}
               onClick={clickHandler}/>
      </li>
      {active === 1 || active === 2 || active === 3 ? null : <li key="gapLeft" className={cn('item')}>
        <input className={cn('gap')} type="button" value="..."/>
      </li>}

      {Array(lastPage).fill(0).map((_, index) => {
        if (index === 0 || index === lastPage - 1) {
          return;
        }
        if (index === active + 1 && active === 1) {
          return <li key={index} className={cn('item')}>
            <input className={`${cn('button')} ${active === index + 1 ? 'active' : ''}`}
                   type="button"
                   value={index + 1}
                   onClick={clickHandler}/>
          </li>;
        }
        switch (index + 1) {
          case (active - 1):
            return <li key={index} className={cn('item')}>
              <input className={`${cn('button')} ${active === index + 1 ? 'active' : ''}`}
                     type="button"
                     value={index + 1}
                     onClick={clickHandler}/>
            </li>;
          case active:
            return <li key={index} className={cn('item')}>
              <input className={`${cn('button')} ${active === index + 1 ? 'active' : ''}`}
                     type="button"
                     value={index + 1}
                     onClick={clickHandler}/>
            </li>;
          case (active + 1):
            return <li key={index} className={cn('item')}>
              <input className={`${cn('button')} ${active === index + 1 ? 'active' : ''}`}
                     type="button"
                     value={index + 1}
                     onClick={clickHandler}/>
            </li>;
        }
      })}

      {active === lastPage || active === lastPage - 1 ? null : <li key="gapRight" className={cn('item')}>
        <input className={cn('gap')} type="button" value="..."/>
      </li>}
      <li key="lastPage" className={cn('item')}>
        <input className={`${cn('button')} ${active === lastPage ? 'active' : ''}`}
               type="button"
               value={lastPage}
               onClick={clickHandler}/>
      </li>
    </ul>
  </div>);
}

Pagination.propTypes = {
  lastPage: propTypes.number.isRequired,
  onFirstClick: propTypes.func.isRequired,
  onLastClick: propTypes.func.isRequired,
  onPageClick: propTypes.func.isRequired,
};

export default React.memo(Pagination);
