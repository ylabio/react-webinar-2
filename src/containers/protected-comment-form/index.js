import React from 'react';
import propTypes from 'prop-types';
import useSelector from '../../hooks/use-selector';
import InfoBadge from '../../components/info-badge';

function ProtectedCommentForm({children}) {
  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting
  }));

  return !select.exists || select.waiting ? <InfoBadge /> : children;
}

ProtectedCommentForm.propTypes = {
  children: propTypes.node
};

export default React.memo(ProtectedCommentForm);
