import React from "react";
import useSelector from '../../utils/use-selector';
import propTypes from 'prop-types';

function MLText (props){

  console.log('MultiLanguage');
  
  const select = useSelector(state => ({
    dictionary: state.lang.dictionary,
    language: state.lang.language
  }));

let item=props.item

return(select.dictionary[select.language][item]);
}
MLText.propTypes = {
  amount: propTypes.string,
}

  export default React.memo(MLText)