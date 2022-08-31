import React, { useEffect, useState } from "react";
import propTypes from 'prop-types';

function useBranchState(branchState, updateBranchState) {
  const [isHidden, setIsHidden] = useState(typeof branchState === 'object' ? false : branchState);

  useEffect(() => {
    if (typeof branchState === 'object') {
      updateBranchState(branchState);
    } else {
      setIsHidden(branchState);
    }
  }, [branchState])

  return isHidden;
}

useBranchState.propTypes = {
  branchState: propTypes.oneOfType([
    propTypes.object.isRequired, 
    propTypes.bool.isRequired
  ]),
  useBranchState: propTypes.func.isRequired,
};

useBranchState.defaultProps = {
};

export default useBranchState;