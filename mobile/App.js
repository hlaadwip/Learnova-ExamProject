import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

import { 
  useFonts, 
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold, 
  Poppins_700Bold,     
  Poppins_800ExtraBold,
  Poppins_900Black 
} from '@expo-google-fonts/poppins';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold, 
    'Poppins-Bold': Poppins_700Bold,         
    'Poppins-ExtraBold': Poppins_800ExtraBold, 
    'Poppins-Black': Poppins_900Black,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);

  if (!fontsLoaded) return null; 

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}