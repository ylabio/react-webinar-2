import React, {useState, useEffect} from 'react';
import useStore from '../../utils/use-store';
import {NavLink, useParams} from "react-router-dom";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pages(props){
const store = useStore();
const pagesList = [];
const cn = bem('Pages');
const {query} = useParams();
const [active, setActive] = useState((query) ? query.split('=')[2]/10 : 0);

for (let n = 1; n <= props.count; n++) {
    pagesList.push(n);
}

useEffect(()=>{
    store.get('catalog').load(query);
  },[query]);

return (
  <div className={cn()}>
      {
      <NavLink className={({isActive}) =>{
        if (active === 0) return cn('item_active');
        else return isActive ? cn('item_active') : cn('item');
      }}
      onClick={()=>setActive(0)}
      to={`limit=${props.perPage}&skip=${1*props.perPage-props.perPage}`}>
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
    onClick={()=>setActive(index)}
    to={`limit=${props.perPage}&skip=${item*props.perPage-props.perPage}`}>
      {item}
    </NavLink>)}

    {(active < (props.count - 3)) && <span className={cn('spread')}>...</span>}

    {
      <NavLink className={({isActive}) =>{
          return isActive ? cn('item_active') : cn('item');
      }}
      onClick={()=>setActive(props.count - 1)}
      to={`limit=${props.perPage}&skip=${props.count*props.perPage-props.perPage}`}>
          {(props.count) ? props.count : ''}
      </NavLink>
      }
  </div>
)
}

export default React.memo(Pages);