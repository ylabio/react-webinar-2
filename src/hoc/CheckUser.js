import React from 'react'
import { Navigate } from 'react-router-dom'
import propTypes from 'prop-types';

function CheckUser({ children, auth, path,id }) {
    console.log(id);
    return auth ? <Navigate to={`${path}/${id}`} /> : children
}
CheckUser.propTypes = {
    children: propTypes.node,
    path:propTypes.string,
    auth:propTypes.any,
    id:propTypes.string
}
CheckUser.defaultProps = {
    path:'',
    auth:false,
    id:'',
}
export default CheckUser