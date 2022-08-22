import React, { useCallback, useMemo } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../components/spinner";
import UserInfo from "../../components/user-info";

function UserProfile() {
  const location = useLocation();

  const select = useSelector((state) => ({
    user: state.auth.user,
    waiting: state.auth.waiting,
  }));

  const { t } = useTranslate();

  if (!select.user && !select.waiting) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  return (
    <Spinner active={select.waiting}>
      <UserInfo user={select.user} t={t} />
    </Spinner>
  );
}

export default React.memo(UserProfile);
