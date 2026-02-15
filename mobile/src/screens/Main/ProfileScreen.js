import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/AuthContext';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../styles/ProfileStyles'; 

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const menuItems = [
    { id: 1, title: 'Edit Profile', icon: 'person-outline', type: 'Ionicons' },
    { id: 2, title: 'Favorite', icon: 'heart-outline', type: 'Ionicons' },
    { id: 3, title: 'Payment Method', icon: 'credit-card', type: 'Feather' },
    { id: 4, title: 'Settings', icon: 'settings-outline', type: 'Ionicons' },
    { id: 5, title: 'Security', icon: 'shield-outline', type: 'Ionicons' },
    { id: 6, title: 'Privacy', icon: 'lock-closed-outline', type: 'Ionicons' },
    { id: 7, title: 'Help', icon: 'help-circle-outline', type: 'Ionicons' },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => logout() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Profile</Text>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }} 
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=1000&auto=format&fit=crop' }} 
              style={styles.avatar} 
            />
          </View>
          <Text style={styles.userName}>{user?.fullName || 'John Doe'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'johndoe@gmail.com'}</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuIconBox}>
                {item.type === 'Ionicons' ? (
                  <Ionicons name={item.icon} size={22} color="black" />
                ) : (
                  <Feather name={item.icon} size={22} color="black" />
                )}
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={[styles.menuIconBox, { backgroundColor: '#FFECEC' }]}>
              <MaterialCommunityIcons name="logout" size={22} color="#FF4D4D" />
            </View>
            <Text style={[styles.menuText, { color: '#FF4D4D' }]}>Logout</Text>
            <Ionicons name="chevron-forward" size={20} color="#C4C4C4" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;