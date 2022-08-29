import React from 'react';
import propTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';
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
  children: propTypes.node
};

export default React.memo(ProtectedCommentForm);
