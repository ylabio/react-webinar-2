import PropTypes from 'prop-types';
import useSelector from '../../utils/use-selector'
import {languages} from './languages'

function Translate(props) {
  const lang = useSelector(state => state.lang.name)

  function translate(text) {
     if (Object.keys(languages).includes(lang)) {
       return languages[lang][text] || text
     }
     return text
   }

  return (
    translate(props.children)
  )
}

export default Translate

Translate.propTypes = {
  children: PropTypes.node
};