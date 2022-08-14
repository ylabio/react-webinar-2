import React from "react";
import useSelector from '../../utils/use-selector';
import plural from 'plural-ru';
import propTypes from 'prop-types';

function MlProd (props){

  console.log('MultiLanguageProd');
  
  const select = useSelector(state => ({
    dictionary: state.lang.dictionary,
    language: state.lang.language
  }));

  let prod1=select.dictionary[select.language].product1;
  let prod2=select.dictionary[select.language].product2;
  let prod5=select.dictionary[select.language].product5;
  const product=plural(props.amount,prod1, prod2, prod5)

return product;
} 

MlProd.propTypes = {
  amount: propTypes.number,
}

  export default React.memo(MlProd)