import React from 'react'
import propTypes from "prop-types";
import useSelector from "../../hooks/use-selector";

function PrivateComponent({children, warning}) {
  const select = useSelector(state => ({
    exists: state.session.exists
  }));

  return select.exists ? children : warning ;
}

export default React.memo(PrivateComponent)

PrivateComponent.propTypes = {
  warning: propTypes.node,
  children: propTypes.node,
}