import useSelector from '../utils/use-selector';

export default function MLText (props){
  console.log('MultiLanguage');
  
  const select = useSelector(state => ({
    dictionary: state.lang.dictionary,
  }));
return(select.dictionary[props]);
}
