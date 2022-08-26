import React from 'react';
import {Navigate, useNavigate, useLocation } from 'react-router-dom';

function BackRedirect({status, children, redirectPath}) {
  // const location = useLocation();
  const navigate = useNavigate();

  if (status) {
    if (redirectPath || redirectPath === '/') {
      return <Navigate to={redirectPath} replace/>;
    } else {
      navigate(-1);
    }
    
  };

  return (
    <>
     {children}
    </>
    )
  }

export default BackRedirect;
