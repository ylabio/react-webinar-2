import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import "./style.css";

function LayoutForm({children}){
    const cn = bem('LayoutForm');

    return(
        <div className={cn()}>{children}</div>
    )
}

LayoutForm.propTypes = {
    children: PropTypes.node
}

export default React.memo(LayoutForm)