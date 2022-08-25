import React from 'react'
import { Navigate,useNavigate } from 'react-router-dom'
import propTypes from 'prop-types';

function CheckUser({ children, auth, path, id }) {
    const navigate = useNavigate()
    // <Navigate to={`${path}/${id}`} />
    return auth ? <Navigate to={path}/> : children
}
CheckUser.propTypes = {
    children: propTypes.node,
    path: propTypes.any,
    auth: propTypes.any,
    id: propTypes.string

}
CheckUser.defaultProps = {
    path: '',
    auth: false,
    id: '',
}
export default CheckUser