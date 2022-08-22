import React from 'react';
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children, path, condition}) => {
    if (condition) {
        return <Navigate to={path} replace/>;
    }
    return children;
};

export default PrivateRoute;