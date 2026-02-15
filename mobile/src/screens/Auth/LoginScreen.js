import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import { AuthContext } from '../../context/AuthContext';
import { styles } from '../../styles/AuthStyles';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    try {
      await login(email, password); 
      
    } catch (error) {
      const msg = error.response?.data?.message || "Login Failed. Check your connection.";
      alert(msg);
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
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ 
            flexGrow: 1, 
            paddingHorizontal: 25,
            paddingBottom: 20
          }}
        >
          <View style={{ marginTop: 20 }}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>Continue your learning journey and stay focused on your goals.</Text>
          </View>

          <CustomInput 
            placeholder="Enter your email" 
            value={email} 
            onChangeText={setEmail}
            iconName="mail-outline"
          />
          <CustomInput 
            placeholder="Enter your password" 
            value={password} 
            onChangeText={setPassword} 
            isPassword={true} 
            iconName="lock-closed-outline"
          />
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('ForgotPassword')}
            style={{ alignSelf: 'flex-end', zIndex: 10 }}
          >
            <Text style={styles.forgotText}>Forgot password</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { zIndex: 10, opacity: isLoading ? 0.8 : 1 }]} 
            onPress={handleLogin}
            activeOpacity={0.7}
            disabled={isLoading} 
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => alert("Google Sign-In Coming Soon")}
          >
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.socialButton} 
            onPress={() => alert("Apple Sign-In Coming Soon")}
          >
            <Ionicons name="logo-apple" size={20} color="#000" />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>

          <View style={[styles.footer, { marginTop: 'auto', paddingVertical: 20 }]}>
            <Text style={styles.footerText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;