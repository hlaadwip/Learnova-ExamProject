import React, { useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView } from 'react-native';
import { styles } from '../../styles/WelcomeStyles'; 

const WelcomingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (navigation && typeof navigation.replace === 'function') {
        navigation.replace('Onboarding');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />
      
      <View style={styles.contentWrapper}>
        <Text style={styles.logoText}>Learn</Text>
        <View style={styles.circleAccent} />
        <Text style={styles.logoText}>va</Text>
      </View>
    </View>
  );
};

export default WelcomingScreen;