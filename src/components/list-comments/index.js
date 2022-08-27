import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import ItemComments from "../item-comments";


function ListComments(props) {
  const cn = bem('ListComments');

  return (
    <div className={cn()}>{props.items?.map(item =>
        <ItemComments key={item._id} item={item} isAuthorized={props.isAuthorized} onSignIn={props.onSignIn}/>
      )}
    </div>
  )
}

ListComments.propTypes = {

}

ListComments.defaultProps = {

}

export default React.memo(ListComments);
