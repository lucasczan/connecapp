import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import {View, ActivityIndicator} from 'react-native';

const Routes = () => {
  const {accessToken, loading} = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#6d71f9" />
      </View>
    );
  }
  return accessToken ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
