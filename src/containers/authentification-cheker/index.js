import React, { useCallback, useMemo, useState, useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Menu from '../../components/menu';
import BasketSimple from '../../components/basket-simple';
import LayoutFlex from '../../components/layout-flex';
import propTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getUserToken } from '../../utils/localstorage/auth';

function AuthentificationChecker({ page, redirectLink }) {
  const [token, setToken] = useState(getUserToken());

  useEffect(() => {
    setToken(getUserToken());
  }, []);

  return <>{token ? page : <Navigate to={redirectLinks} />}</>;
}

AuthentificationChecker.propTypes = {
  page: propTypes.node.isRequired,
  redirectLink: propTypes.string.isRequired,
};

export default React.memo(AuthentificationChecker);
