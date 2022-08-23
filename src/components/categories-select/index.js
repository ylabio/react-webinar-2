import React, {useCallback} from 'react';
import propTypes from "prop-types";
// import transformCategories from '../../utils/transform-categories';

function CategoriesSelect(props){
	// const optionCategories = transformCategories(props.categories);

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])
	
  return (
    <select className="Select" onChange={onSelect} value={props.value}>
			<option value="">Все</option>
      {props.categories.map((item, index) => (<option key={`category_${index}`} value={item._id}>{item.title}</option>
      ))}
    </select>
  )
}

CategoriesSelect.propTypes = {
  categories: propTypes.arrayOf(propTypes.object).isRequired,
  value: propTypes.any,
  onChange: propTypes.func
}

CategoriesSelect.defaultProps = {
  onChange: () => {}
}

export default React.memo(CategoriesSelect);