import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';

function PrivateRoute() {
  const isAuthenticated = localStorage.getItem('accessToken') ? true : false;
  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/auth"/>
  );
}

export default PrivateRoute;
