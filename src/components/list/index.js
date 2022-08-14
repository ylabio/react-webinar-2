import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import useStore from '../../utils/use-store'; 
import {cn as bem} from "@bem-react/classname";
import {useParams} from 'react-router-dom';
import './style.css';

function List(props) {
  const cn = bem('List');
  const {query} = useParams();
  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(query);
  }, [query]);

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item._id} className={cn('item')}>
        {props.renderItem(item)}
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func
}

List.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString()
  }
}

export default React.memo(List);
