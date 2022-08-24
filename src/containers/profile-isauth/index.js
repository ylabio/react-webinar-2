import React from "react";
import propTypes from "prop-types";
import { Navigate } from "react-router-dom";
import ProfileInfo from "../../components/profile-info";

function ProfileIsAuth({ user }) {
  if (user) {
    return <ProfileInfo user={user} />;
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
