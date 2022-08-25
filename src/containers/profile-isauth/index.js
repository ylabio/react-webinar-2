import React from "react";
import propTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Profile from "../../app/profile";

function ProfileIsAuth({ user }) {
  if (user) {
    return <Profile />;
  } else {
    return <Navigate to="/login" />;
  }
}

ProfileIsAuth.propTypes = {
  user: propTypes.object,
};
ProfileIsAuth.defaultProps = {
  user: {},
};

export default React.memo(ProfileIsAuth);
