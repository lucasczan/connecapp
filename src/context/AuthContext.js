import React, {createContext, useCallback, useState, useEffect} from 'react';
import {api} from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';
const AuthContext = createContext();
const AuthContextProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const token = await AsyncStorage.getItem('@token');
      if (token) {
        setAccessToken(token);
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async (user) => {
    try {
      const response = await api.post('/auth', {
        email: user.email,
        password: user.password,
      });
      await AsyncStorage.setItem('@token', response.data.accessToken);
      setUser(user);
      setAccessToken(response.data.accessToken);
    } catch (error) {
      alert('Erro de autenticação');
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@token');
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{loading, signIn, signOut, user, accessToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthContextProvider};
