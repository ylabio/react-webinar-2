import { useRoutes, Navigate } from 'react-router-dom';
import React from 'react';
import Main from '../app/main';
import Article from '../app/article';
import Login from '../app/login';
import Profile from '../app/profile';
import CatalogList from '../containers/catalog-list';
import { getLocation } from '../utils/get-location';
import RequireAuth from '../hoc/require-auth';

export const Routes = () => {
  const href = getLocation();
  const Routes = useRoutes([
    { path: '', element: <Main /> },
    { path: 'articles/:id', element: <Article /> },
    { path: 'login', element: <Login /> },
    {
      path: 'profile',
      element: (
        <RequireAuth>
          <Profile />
        </RequireAuth>
      ),
    },
    { path: `${href}`, element: <CatalogList /> },
    {
      path: '*',
      element: <Navigate to='' replace />,
    },
  ]);
  return Routes;
};
