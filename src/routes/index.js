import { useRoutes, Navigate } from 'react-router-dom';
import React from 'react';
import Main from '../app/main';
import Article from '../app/article';
import Login from '../app/login';
import Profile from '../app/profile';

export const PrivateRoutes = () => {
  const privateRoutes = useRoutes([
    { path: '', element: <Main /> },
    { path: 'articles/:id', element: <Article /> },
    { path: 'profile', element: <Profile /> },
    {
      path: '*',
      element: <Navigate to='/' replace />,
    },
  ]);
  return privateRoutes;
};

export const PublicRoutes = () => {
  const publicRoutes = useRoutes([
    { path: '', element: <Main /> },
    { path: 'articles/:id', element: <Article /> },
    { path: 'login', element: <Login /> },
    { path: '*', element: <Navigate to='login' replace /> },
  ]);
  return publicRoutes;
};
