import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import { styles } from '../../styles/AuthStyles';
import { checkEmailApi } from '../../services/api'; 

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (!email.trim()) {
      Alert.alert("Email Required", "Please enter your email address first.");
      return;
    }

    setLoading(true);
    try {
      const data = await checkEmailApi(email);

      if (data.exists) {
        navigation.navigate('CheckEmail');
      } else {
        Alert.alert("User Not Found", "This email is not registered in our system.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 25 }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.title}>Forgot Password</Text>
              <Text style={styles.subtitle}>No worries. Enter your email and we’ll send you a link to reset it.</Text>
            </View>

            <CustomInput 
              placeholder="Enter your email" 
              value={email} 
              onChangeText={setEmail} 
              iconName="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            
            <TouchableOpacity 
              style={[styles.button, { marginTop: 20, opacity: loading ? 0.7 : 1 }]} 
              onPress={handleSendEmail}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Send email</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={[styles.footer, { paddingBottom: 20, marginTop: 20 }]}>
            <Text style={styles.footerText}>Go back to </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;