import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import { AuthContext } from '../../context/AuthContext'; 
import { styles } from '../../styles/AuthStyles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../styles/Colors';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const { register, isLoading } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (!isAccepted) {
      Alert.alert("Error", "You must accept the Terms & Conditions");
      return;
    }

    try {
      console.log("Attempting to register to MongoDB...");
      await register(name, email, password); 
      
      Alert.alert("Success", "Account created successfully!");
      navigation.replace('Login');
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed. Email might already be registered.";
      Alert.alert("Registration Error", errorMsg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 20 }}>
            
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Register</Text>
              <Text style={styles.subtitle}>Join Learnova Today. Build better study habits and prepare smarter.</Text>
            </View>

            <CustomInput 
              placeholder="Full Name" 
              value={name} 
              onChangeText={setName} 
              iconName="person-outline"
            />
            <CustomInput 
              placeholder="Email Address" 
              value={email} 
              onChangeText={setEmail} 
              iconName="mail-outline"
            />
            <CustomInput 
              placeholder="Password" 
              value={password} 
              onChangeText={setPassword} 
              isPassword={true} 
              iconName="lock-closed-outline"
            />
            
            <TouchableOpacity 
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25, marginTop: 5 }}
              onPress={() => setIsAccepted(!isAccepted)}
            >
              <Ionicons 
                name={isAccepted ? "checkbox" : "square-outline"} 
                size={22} 
                color={Colors.primary} 
              />
              <Text style={[styles.footerText, { marginLeft: 10 }]}>
                I agree to the <Text style={{ color: Colors.primary, fontFamily: 'Poppins-Bold' }}>Terms & Conditions</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, { opacity: isLoading ? 0.7 : 1 }]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>{isLoading ? "Processing..." : "Sign Up"}</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert("Coming Soon")}>
              <Ionicons name="logo-google" size={20} color="#EA4335" />
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert("Coming Soon")}>
              <Ionicons name="logo-apple" size={20} color="#000" />
              <Text style={styles.socialText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.footer, { paddingBottom: 20 }]}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;