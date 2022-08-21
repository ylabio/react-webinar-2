import React, {useCallback} from 'react';
import propTypes from "prop-types";
import transformCategories from '../../utils/transform-categories';
// import './style.css';

function CategoriesSelect(props){
	const optionCategories = transformCategories(props.categories);

  const onSelect = useCallback((e) => {
    props.onChange(e.target.value);
  }, [props.onChange])
	
  return (
    <select className="Select" onChange={onSelect} value={props.value}>
			<option value="">Все</option>
      {optionCategories && optionCategories.map(item => (
        <>
					<option key={item._id} value={item._id}>{item.title}</option>
				
					{item.children?.length ? 
						item.children.map(children => (
							<option key={children._id} value={children._id}>-{children.title}</option>
						)) : 
						''}
				</>
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