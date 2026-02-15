import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { fetchCourses, fetchMyCourses } from '../../services/api'; 
import { styles } from '../../styles/SearchStyles';

const SearchScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = user?._id || user?.id;

  const loadData = async () => {
    setLoading(true);
    try {
      const myCoursesData = await fetchMyCourses(userId);
      const enrolledIds = myCoursesData.map(course => course._id || course.id);
      const allData = await fetchCourses({ limit: 50 }); 
      setAllCourses(allData || []);
      
      const recData = await fetchCourses({ recommended: 'true', limit: 10 });
      
      const notEnrolledRecs = recData.filter(course => 
        !enrolledIds.includes(course._id)
      );

      setRecommended(notEnrolledRecs.slice(0, 5));
    } catch (err) {
      console.error("Search Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [userId])
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredCourses([]);
    } else {
      const results = allCourses.filter(course => 
        course.title.toLowerCase().includes(text.toLowerCase()) ||
        course.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCourses(results);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.searchHeader}>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.searchBarWrapper}>
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Find your course..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#888"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {searchQuery.length > 0 ? (
          <View style={styles.resultSection}>
            <Text style={styles.sectionTitle}>Results for "{searchQuery}"</Text>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((item) => (
                <TouchableOpacity 
                  key={item._id}
                  style={styles.searchResultCard} 
                  onPress={() => navigation.navigate('Detail', { item: item })}
                >
                  <Image source={{ uri: item.image }} style={styles.resultImage} />
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle}>{item.title}</Text>
                    <Text style={styles.resultCategory}>{item.category}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>No courses found.</Text>
            )}
          </View>
        ) : (
          <View style={styles.recommendSection}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            {loading ? (
              <ActivityIndicator color="#2F65EB" style={{ marginTop: 20 }} />
            ) : (
              <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recommended}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.courseCard} 
                    onPress={() => navigation.navigate('Detail', { item: item })} 
                  >
                    <Image source={{ uri: item.image }} style={styles.courseImg} />
                    <View style={styles.badge}><Text style={styles.badgeText}>{item.category}</Text></View>
                    <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={{ marginLeft: 20, color: '#AAA' }}>All recommended courses enrolled!</Text>}
              />
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;