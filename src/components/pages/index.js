import React, {useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pages(props){
const pagesList = [];
const cn = bem('Pages');
const {query} = useParams();
const active = props.state.activePage 
  || (query) ? query.split('=')[2]/10 : 0;

for (let n = 1; n <= props.count; n++) {
  pagesList.push(n);
}

useEffect(()=>{
  props.catalog.load(query);
  },[query]);

return (
  <div className={cn()}>{
    <NavLink className={({isActive}) =>{
      if (active === 0) return cn('item_active');
      else return isActive ? cn('item_active') : cn('item');
    }}
    onClick={()=>props.catalog.setActive(0)}
    to={`limit=${props.state.query.limit}&skip=${1*props.state.query.limit-props.state.query.limit}`}>
      {1}
    </NavLink>
    }

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
    onClick={()=>props.catalog.setActive(index)}
    to={`limit=${props.state.query.limit}&skip=${item*props.state.query.limit-props.state.query.limit}`}>
      {item}
    </NavLink>)}

    {(active < (props.count - 3)) && <span className={cn('spread')}>...</span>}

    {<NavLink className={({isActive}) =>{
      return isActive ? cn('item_active') : cn('item');
      }}
      onClick={()=>props.catalog.setActive(props.count - 1)}
      to={`limit=${props.state.query.limit}&skip=${props.count*props.state.query.limit-props.state.query.limit}`}>
        {(props.count) ? props.count : ''}
      </NavLink>
    }
  </div>
)
}

export default React.memo(Pages);