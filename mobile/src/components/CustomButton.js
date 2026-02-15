import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

const CustomButton = ({ title, onPress, loading }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      {loading ? <ActivityIndicator /> : <Text>{title}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;