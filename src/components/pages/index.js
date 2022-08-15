import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pages(props){
const pagesList = [];
const cn = bem('Pages');
const [active, setActive] = useState(0);

for (let n = 1; n <= props.count; n++) {
    pagesList.push(n);
} 

return (
    <div className={cn()}>
        {pagesList.map((item, index) =>
        <NavLink key={item}
        className={({isActive}) =>{
            if (index === 0 && active === 0) return cn('item_active');
            else if (index === 0) return isActive ? cn('item_active') : cn('item');
            else return cn('item_none');
        }}
        onClick={()=>setActive(index)}
        to={`limit=${props.perPage}&skip=${item*props.perPage-props.perPage}`}>
            {item}
        </NavLink>
        )}

        {(active > 2) && <span className={cn('spread')}>...</span>}

      {pagesList.map((item, index) =>
      <NavLink key={item}
      className={({isActive}) =>{
        if (index === 0 || index === (props.count - 1)) return cn('item_none');
        else if (active == 0 && index > (active + 2)) return cn('item_none');
        else if (active !== 0 && index > (active + 1)) return cn('item_none');
        else if (active !== (props.count - 1) && index < (active - 1) && active > 2) return cn('item_none');
        else if (active === (props.count - 1) && index < (active - 2) && active > 2) return cn('item_none');  
        else if (index === active) return isActive ? cn('item_active') : cn('item');
        
        else return isActive ? cn('item_active') : cn('item'); 
        }
      } 
      onClick={()=>setActive(index)}
      to={`limit=${props.perPage}&skip=${item*props.perPage-props.perPage}`}>
        {item}
      </NavLink>)}

      {(active < (props.count - 3)) && <span className={cn('spread')}>...</span>}

      {pagesList.map((item, index) =>
        <NavLink key={item}
        className={({isActive}) =>{
            if (index === (props.count - 1) && active === (props.count - 1)) return cn('item_active');
            else if (index === (props.count - 1)) return isActive ? cn('item_active') : cn('item');
            else return cn('item_none');
        }}
        onClick={()=>setActive(index)}
        to={`limit=${props.perPage}&skip=${item*props.perPage-props.perPage}`}>
            {item}
        </NavLink>
        )}
    </div>
)
}

export default React.memo(Pages);