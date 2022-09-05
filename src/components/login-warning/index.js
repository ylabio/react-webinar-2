import React from 'react'
import {Link} from "react-router-dom";
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import './style.css'
import Translate from '../../containers/translate';

function LoginWarning(props) {
  const cn = bem("LoginWarning")

  return (
    <div className={cn()}>
      {props.type === 'article' ? 
        <div>
          <Translate tkey={"comment.warning"} count={1} t={props.t}>
            <span><Link to='/login' state={{back: props.pathname}} className={cn('link')}>Войдите</Link>, чтобы иметь возможность комментировать</span>
          </Translate>
        </div>
      :
        <div>
          <Translate tkey={"reply.warning"} count={2} t={props.t}>
            <span><Link to='/login' state={{back: props.pathname}} className={cn('link')}>Войдите</Link>, чтобы иметь возможность ответить. </span>
          </Translate>
          {" "}<span className={cn('cancel')} onClick={props.onCancel}>{props.t('reply.cancel')}</span>
        </div> 
      }
    </div>
  )
}

export default React.memo(LoginWarning)

LoginWarning.propTypes = {
  onCancel: propTypes.func,
  type: propTypes.string,
  pathname: propTypes.string,
  t: propTypes.func
}

LoginWarning.defaultProps = {
  indent: null,
  onCancel: () => {},
  t: (text) => text
}