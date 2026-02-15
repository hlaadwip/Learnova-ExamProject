import React from 'react';
import { View, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, Octicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Main/HomeScreen';
import MyCourseScreen from '../screens/Main/MyCourseScreen';
import SearchScreen from '../screens/Explore/SearchScreen';
import CalendarScreen from '../screens/Main/CalendarScreen'; 
import ProfileScreen from '../screens/Main/ProfileScreen';
import { getTabStyles } from '../styles/TabStyles'; 

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  const styles = getTabStyles(insets);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: {
          ...styles.tabItem,
          width: width / 5.5, 
        },
        tabBarContentContainerStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{ tabBarIcon: ({ focused }) => (
          <View style={[styles.iconContainer, focused && styles.activeCircle]}>
            <Ionicons name={focused ? "home" : "home-outline"} size={22} color={focused ? "#FFF" : "#000"} />
          </View>
        )}} 
      />
      <Tab.Screen name="MyCourse" component={MyCourseScreen} 
        options={{ tabBarIcon: ({ focused }) => (
          <View style={[styles.iconContainer, focused && styles.activeCircle]}>
            <Feather name="book-open" size={22} color={focused ? "#FFF" : "#000"} />
          </View>
        )}} 
      />
      <Tab.Screen name="Search" component={SearchScreen} 
        options={{ tabBarIcon: ({ focused }) => (
          <View style={[styles.iconContainer, focused && styles.activeCircle]}>
            <Ionicons name="search" size={22} color={focused ? "#FFF" : "#000"} />
          </View>
        )}} 
      />
      <Tab.Screen name="Calendar" component={CalendarScreen} 
        options={{ tabBarIcon: ({ focused }) => (
          <View style={[styles.iconContainer, focused && styles.activeCircle]}>
            <Octicons name="calendar" size={22} color={focused ? "#FFF" : "#000"} />
          </View>
        )}} 
      />
      <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{ tabBarIcon: ({ focused }) => (
          <View style={[styles.iconContainer, focused && styles.activeCircle]}>
            <Feather name="user" size={22} color={focused ? "#FFF" : "#000"} />
          </View>
        )}} 
      />
    </Tab.Navigator>
  );
}