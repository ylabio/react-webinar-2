import React, {useContext} from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import "./style.css";
import Translation from "../../services/locale";
import {LanguageContext} from "../../services/locale/context";

function Navigation(props){
  const cn = bem('Navigation');
  const {language} = useContext(LanguageContext);

  return (
  <nav className={cn()}>
    <a className={cn('link')}
       href="#"
       onClick={props.onClick}>{Translation[language].actions.home}</a>
  </nav>
  )
}

Navigation.propTypes = {
  onClick: propTypes.func.isRequired,
}

export default React.memo(Navigation);
