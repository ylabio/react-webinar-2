import React from 'react'
import {  Link } from 'react-router-dom';

function LinkMenu({path,title}) {
  return (
   <Link style={{color:'black',textDecoration:'none'}} to={path}>
    {title}
   </Link>
   )
}

export default LinkMenu