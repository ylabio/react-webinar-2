import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

import "./style.css";

function Controls({onShow, getInfo}){
    const cn = bem('Controls');

    return (
    <div className={cn()}>
        <span>В корзине:</span>
        <span className={cn('info')}>{getInfo()}</span>
        <button onClick={onShow}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
    onShow: propTypes.func.isRequired,
    getInfo: propTypes.func.isRequired,
}

export default React.memo(Controls);
