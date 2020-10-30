import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes = () => {
  const {accessToken} = useContext(AuthContext);

  return accessToken ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
