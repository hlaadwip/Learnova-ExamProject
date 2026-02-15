import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import CourseList from '../screens/Explore/CourseList';
import CourseDetailScreen from '../screens/Detail/CourseDetailScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      
      <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="Detail" component={CourseDetailScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
}