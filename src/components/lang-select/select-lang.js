import React from "react";
import propTypes from 'prop-types';


const SelectLang = ({ChangeLang}) => {
    return (
          <div>
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