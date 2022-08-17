import React from "react";
import propTypes from 'prop-types';
import './styles.css'


const SelectLang = ({ChangeLang}) => {
    return (
          <div className="SelectLang">
            <select onChange={(e)=>ChangeLang(e.target.value)}>
              <option>Сhange language</option>
              <option value="english">english</option>
              <option value="russian">русский</option>
            </select>
          </div>
        )}

SelectLang.propTypes = {
  ChangeLang: propTypes.func,
}

        
  export default React.memo(SelectLang)