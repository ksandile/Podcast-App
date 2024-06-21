// The PrivateRoute component is a simple wrapper around React Router's Navigate component that ensures certain routes are only accessible to authenticated users. If a user is authenticated (user is truthy), it renders the children (which are the components or elements wrapped by PrivateRoute). If the user is not authenticated (user is falsy), it redirects them to the /login route using the Navigate component.
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
