import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../context/AuthContext';
import { fetchCourses } from '../../services/api'; 
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/HomeStyles';

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext); 
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  const fetchData = async (categoryToFetch) => {
    setLoading(true);
    try {
      const isAll = categoryToFetch === 'All';
      const limitAmount = isAll ? 5 : 3;
      
      const params = {
        category: isAll ? '' : categoryToFetch,
        limit: limitAmount,
      };

      if (isAll) {
        params.recommended = 'true';
      }

      const data = await fetchCourses(params); 
      setCourses(data || []);
    } catch (err) { 
      setCourses([]); 
      console.error(err); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeCategory);
  }, [activeCategory]);

  const handleCategoryPress = (item) => {
    setActiveCategory(item);
  };

  const categories = ['All', 'Biology', 'Chemistry', 'Economics', 'Mathematics', 'Physics'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi, {user?.fullName?.split(' ')[0] || 'User'}</Text>
          <TouchableOpacity onPress={() => Alert.alert("Notification", "No new notifications.")}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('MyCourse')} activeOpacity={0.9}>
          <LinearGradient
            colors={['#4D81FF', '#2563EB']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.banner}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerText}>Prepare Smarter for Your Final Exams</Text>
              <View style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Start Learning</Text>
              </View>
            </View>
            <Image 
              source={require('../../assets/banner_student.png')} 
              style={styles.bannerImage} 
            />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
          {categories.map(item => (
            <TouchableOpacity 
              key={item} 
              onPress={() => handleCategoryPress(item)}
              style={[styles.categoryItem, activeCategory === item && styles.categoryActive]}
            >
              <Text style={[styles.categoryLabel, activeCategory === item && styles.labelActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CourseList', { category: activeCategory })}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color="#2F65EB" style={{ marginVertical: 20 }} />
        ) : (
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={courses} 
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.courseCard} 
                onPress={() => navigation.navigate('Detail', { item: item })} 
              >
                <Image 
                  source={{ uri: item.image && item.image !== "" ? item.image : 'https://via.placeholder.com/150' }} 
                  style={styles.courseImg} 
                />
                <View style={styles.courseBadge}>
                  <Text style={styles.courseBadgeText}>{item.category}</Text>
                </View>
                <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.courseMentor}>{item.mentorName}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Mentors</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={courses} 
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.mentorCard}>
              <Image 
                source={{ uri: item.mentorImage && item.mentorImage !== "" ? item.mentorImage : 'https://via.placeholder.com/100' }} 
                style={styles.mentorImg} 
              />
              <View style={styles.mentorBadge}>
                <Text style={styles.mentorBadgeText}>{item.mentorName?.split(' ')[0]}</Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;