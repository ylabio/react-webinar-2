import React from "react";
import propTypes from 'prop-types';

function CheckLogin({loginRequired, exists, component}){
    return (
        exists ? component : loginRequired
    )
}

CheckLogin.propTypes = {
    loginRequired: propTypes.node,
    exists: propTypes.bool,
    component: propTypes.node
}

export default React.memo(CheckLogin)