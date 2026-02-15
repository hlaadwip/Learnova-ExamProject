import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/Colors';

const CustomInput = ({ placeholder, value, onChangeText, isPassword, iconName }) => {
  const [hideText, setHideText] = useState(isPassword);

  return (
    <View style={styles.inputContainer}>
      <Ionicons name={iconName} size={22} color={Colors.primary} style={styles.iconStyle} />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hideText}
        placeholderTextColor="#999"
        autoCapitalize="none" 
        keyboardType={placeholder.toLowerCase().includes('email') ? 'email-address' : 'default'}
      />

      {isPassword && (
        <TouchableOpacity onPress={() => setHideText(!hideText)} style={styles.eyeButton}>
          <Ionicons 
            name={hideText ? "eye-off-outline" : "eye-outline"} 
            size={22} 
            color="#999" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB', 
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  iconStyle: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#000',
  },
  eyeButton: {
    padding: 5,
  }
});

export default CustomInput;