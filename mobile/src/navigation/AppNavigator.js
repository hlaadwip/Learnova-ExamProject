import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack';
import MainStack from './MainStack'; 
import WelcomingScreen from '../screens/Auth/WelcomingScreen';

export default function AppNavigator() {
  const [isSplash, setIsSplash] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => setIsSplash(false), 3000); 
  }, []);

  if (isSplash) return <WelcomingScreen />;

  return user ? <MainStack /> : <AuthStack />;
}