import React from 'react';
import useSelector from '../../hooks/use-selector';
import {Navigate} from 'react-router-dom';
import propTypes from 'prop-types';
import CommonLayout from "../common-layout";
import Stack from "../../components/elements/stack";

const AuthCheck = ({children}) => {
  const {waiting, status, profile} = useSelector((s) => s.user);

  if (status !== 'confirm' && !profile.name) return <Navigate to="/sign_in"/>;

  return waiting ? (
    <CommonLayout>
      <Stack spacing={'normal'} px={'normal'}>
        <div>loading...</div>
      </Stack>
    </CommonLayout>
  ) : children;
};

AuthCheck.propTypes = {
  children: propTypes.node.isRequired,
};

export default React.memo(AuthCheck);
