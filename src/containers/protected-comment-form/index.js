import React from 'react';
import propTypes from 'prop-types';
import InfoBadge from '../../components/info-badge';

function ProtectedCommentForm({children, callbackGuardCondition}) {
  if (callbackGuardCondition()) {
    return children;
  } else {
    return <InfoBadge />;
  }

  //   return !select.exists || select.waiting ? <InfoBadge /> : children;
}

ProtectedCommentForm.propTypes = {
  children: propTypes.node,
  callbackGuardCondition: propTypes.func
};

export default React.memo(ProtectedCommentForm);
