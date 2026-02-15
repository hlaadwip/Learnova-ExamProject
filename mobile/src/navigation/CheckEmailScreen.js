import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/AuthStyles';
import { Colors } from '../styles/Colors';

const CheckEmailScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.container, { justifyContent: 'space-between' }]}>
      <StatusBar barStyle="dark-content" />
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        <View style={extraStyles.iconCircle}>
          <Ionicons name="mail-open-outline" size={80} color={Colors.primary} />
        </View>
        
        <Text style={[styles.title, { textAlign: 'center' }]}>Check Your Email</Text>
        <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 10 }]}>
          We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
        </Text>
      </View>

      <View style={[styles.footer, { marginBottom: 20 }]}>
        <Text style={styles.footerText}>Go back to </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const extraStyles = StyleSheet.create({
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  }
});

export default CheckEmailScreen;