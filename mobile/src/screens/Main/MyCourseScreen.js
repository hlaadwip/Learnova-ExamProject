import React, { useState, useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import { useFocusEffect } from '@react-navigation/native'; 
import { AuthContext } from '../../context/AuthContext';
import { styles } from '../../styles/MyCourseStyles';
import { fetchMyCourses } from '../../services/api'; 

const MyCourseScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState('All');
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const userId = user?._id || user?.id;

  const loadCourses = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const data = await fetchMyCourses(userId);
      console.log("MyCourse Raw Data:", data); 

      const sortedData = Array.isArray(data) 
        ? data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) 
        : [];
      setMyData(sortedData);
    } catch (error) {
      console.error("Fetch My Course Error:", error.message);
      Alert.alert("Error", "Gagal mengambil data kursus.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCourses();
    }, [userId])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadCourses();
  };

  // Filter dengan handle lowercase
  const filteredData = tab === 'All' 
    ? myData 
    : myData.filter(item => item.status && item.status.toLowerCase() === tab.toLowerCase());

  const renderItem = ({ item }) => {
    const coreData = item._doc || item; 
    
    const displayProgress = item.progress || 0;
    const isComplete = item.status && item.status.toLowerCase() === 'complete';
    
    const imageUrl = coreData.image || item.image;
    const courseImage = imageUrl && imageUrl.trim() !== "" 
      ? { uri: imageUrl } 
      : { uri: 'https://via.placeholder.com/150' };

    return (
      <TouchableOpacity 
        style={styles.courseCard}
        onPress={() => navigation.navigate('Detail', { 
          item: { ...coreData, ...item } 
        })}
      >
        <Image source={courseImage} style={styles.courseImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.titleText} numberOfLines={1}>
            {coreData.title || item.title || 'Untitled Course'}
          </Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.metaText}>{coreData.rating || '4.7'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={12} color="#C0C0C0" />
              <Text style={styles.metaText}>{coreData.duration || '2h 30m'}</Text>
            </View>
          </View>

          <View style={styles.progressLabelRow}>
            <Text style={[styles.completedText, isComplete && { color: '#4CAF50' }]}>
              {isComplete ? 'Completed' : 'On Progress'}
            </Text>
            <Text style={styles.percentageText}>{displayProgress}%</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBarFill, 
                { 
                  width: `${displayProgress}%`,
                  backgroundColor: isComplete ? '#4CAF50' : '#2F65EB' 
                } 
              ]} 
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.headerTitle}>My Course</Text>

      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          {['All', 'Ongoing', 'Complete'].map(t => (
            <TouchableOpacity 
              key={t} 
              onPress={() => setTab(t)}
              style={[styles.tabButton, tab === t && styles.activeTabButton]}
            >
              <Text style={[styles.tabText, tab === t && styles.activeTabText]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2F65EB" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => (item._id || item.id || Math.random().toString()).toString()}
          contentContainerStyle={[styles.listContainer, { paddingBottom: 100 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} color="#2F65EB" />
          }
          ListEmptyComponent={
            <View style={{ marginTop: 50, alignItems: 'center' }}>
              <Ionicons name="book-outline" size={50} color="#DDD" />
              <Text style={{ color: '#888', marginTop: 10 }}>No courses found in this category.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MyCourseScreen;