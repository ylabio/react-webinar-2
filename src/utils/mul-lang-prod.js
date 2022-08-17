import useSelector from '../utils/use-selector';
import plural from 'plural-ru';
import propTypes from 'prop-types';

export default function MlProd (props){

  console.log('MultiLanguageProd');
  
  const select = useSelector(state => ({
    dictionary: state.lang.dictionary
  }));

  let prod1=select.dictionary.product1;
  let prod2=select.dictionary.product2;
  let prod5=select.dictionary.product5;
  const product=plural(props,prod1, prod2, prod5)

return product;
} 

MlProd.propTypes = {
  amount: propTypes.number,
}

