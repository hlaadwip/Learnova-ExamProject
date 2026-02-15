import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomingScreen from '../screens/Auth/WelcomingScreen'; 
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import CheckEmailScreen from './CheckEmailScreen';
import CourseList from '../screens/Explore/CourseList';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
      initialRouteName="Welcoming" 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcoming" component={WelcomingScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="CheckEmail" component={CheckEmailScreen} /> 
      <Stack.Screen name="CourseList" component={CourseList} />
    </Stack.Navigator>
  );
}