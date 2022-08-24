import React from "react";
import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";

function ProtectedProfile({children}){
    const token = localStorage.getItem('access-token')

    return(
        <>
            {token ? children : <Navigate to="/login"/>}
        </>
    )
}

ProtectedProfile.propTypes = {
    children: PropTypes.node
}

export default React.memo(ProtectedProfile)