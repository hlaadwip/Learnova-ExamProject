import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchCourses } from '../../services/api';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/CourseListStyles';

const CourseList = ({ route, navigation }) => {
  const { category } = route.params || { category: 'All' };
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState(category);

  useEffect(() => {
    fetchFilteredData();
  }, [activeCategory]);

  const fetchFilteredData = async () => {
    try {
      const limitAmount = activeCategory === 'All' ? 35 : 3;

      const data = await fetchCourses({ 
        category: activeCategory === 'All' ? '' : activeCategory,
        limit: limitAmount 
      });
      
      setCourses(data);
    } catch (error) {
      console.error("Error fetching course list:", error);
      setCourses([]); 
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course list</Text>
      </View>

      <View style={{ marginBottom: 15 }}>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={['All', 'Biology', 'Chemistry', 'Economics', 'Mathematics', 'Physics']}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => setActiveCategory(item)}
              style={[styles.categoryItem, activeCategory === item && styles.categoryActive]}
            >
              <Text style={[styles.categoryLabel, activeCategory === item && styles.labelActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={courses}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.gridCard} 
            onPress={() => navigation.navigate('Detail', { item: item })} 
          >
            <Image source={{ uri: item.image }} style={styles.gridImg} />
            <View style={styles.gridBadge}><Text style={styles.gridBadgeText}>{item.category}</Text></View>
            <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating || '4.7'}</Text>
              <Text style={styles.studentCount}> ({item.students || '512'} students)</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default CourseList;