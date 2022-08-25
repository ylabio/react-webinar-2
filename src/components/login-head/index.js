import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function LoginHead({signOut,user,Loginlink,ProfileLink,signin,signout}) {
 if(user.logined){
  return(
    <div className='loginHead'>
    <div ><Link to={ProfileLink}>{user.data.profile.name}</Link></div>
    <button onClick={() => signOut()}>{signout}</button>
    </div>
    )
 }
 else{
   return (
    <div className='loginHead'>
     <Link to={Loginlink}>
     <button>{signin}</button>
    </Link>
    </div>
  )
}
}

export default React.memo(LoginHead);
