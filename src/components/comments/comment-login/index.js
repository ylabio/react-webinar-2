import React from 'react';
import {Link} from "react-router-dom";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function CommentLogin(){
  const cn = bem('CommentLogin');

  return (
    <div className={cn()}>
      <Link to={'/login'} className={cn('link')}>Войдите</Link>, чтобы иметь возможность комментировать
    </div>
  )
}

CommentLogin.propTypes = {
}

CommentLogin.defaultProps = {
}

export default React.memo(CommentLogin);