import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/DetailStyles';
import { AuthContext } from '../../context/AuthContext';
import { fetchMyCourses, enrollCourseApi, toggleLessonStatusApi } from '../../services/api';

const CourseDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('About');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [watchedLessons, setWatchedLessons] = useState([]);

  const userId = user?._id || user?.id;
  const totalLessons = item.lessons?.length || 0;
  const isAllWatched = totalLessons > 0 && watchedLessons.length === totalLessons;

  // Helper hitung durasi total
  const calculateTotalDuration = (lessons) => {
    if (!lessons || lessons.length === 0) return "0m";
    const totalMinutes = lessons.reduce((acc, curr) => {
      const durationValue = parseInt(curr.duration) || 0;
      return acc + durationValue;
    }, 0);

    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return `${hours}h ${mins}m`;
    }
    return `${totalMinutes}m`;
  };

  const totalDuration = calculateTotalDuration(item.lessons);

  // Cek status enroll user saat screen dibuka
  useEffect(() => {
    const checkStatus = async () => {
      if (!userId) return;
      try {
        const responseData = await fetchMyCourses(userId);
        const currentCourse = responseData.find(c => 
          c._id === item._id || c.courseId === item._id || c.courseId?._id === item._id
        );
        
        if (currentCourse) {
          setIsEnrolled(true);
          const completedIds = currentCourse.completedLessons || [];
          setWatchedLessons(completedIds);
        }
      } catch (error) {
        console.error("Error checking status:", error);
      }
    };
    checkStatus();
  }, [userId, item._id]);

  // Fungsi Enroll (Daftar Kelas)
  const handleEnroll = async () => {
    if (!userId) {
      Alert.alert("Error", "You must be logged in to enroll.");
      return;
    }
    try {
      const response = await enrollCourseApi({
        userId: userId,
        courseId: item._id,
        topic: item.lessons[0]?.title || "Introduction",
        date: new Date(),
        status: "ongoing",
        progress: 0
      });

      if (response.status === 201 || response.status === 200) {
        setIsEnrolled(true);
        Alert.alert("Success", "Successfully enrolled!", [{ text: "OK", onPress: () => navigation.goBack() }]);
      }
    } catch (error) {
      setIsEnrolled(true);
      Alert.alert("Information", "You are already enrolled in this course.");
    }
  };

  // Fungsi Update Progress
  const handleLessonPress = async (index) => {
    const lessonId = item.lessons[index]._id;

    try {
      const updatedLessons = await toggleLessonStatusApi({
        userId: userId,
        courseId: item._id,
        lessonId: lessonId
      });

      const newWatchedIds = updatedLessons
        .filter(l => l.isCompleted)
        .map(l => l._id);

      setWatchedLessons(newWatchedIds);
    } catch (error) {
      console.error("Update Progress Error:", error.message);
      Alert.alert("Sync Error", "Failed to update progress to the server.");
    }
  };

  const reviews = [
    { id: '1', user: 'Maudie', comment: 'Itaque dolor fuga natus eveniet.', rating: 5 },
    { id: '2', user: 'Maudie', comment: 'Itaque dolor fuga natus eveniet.', rating: 5 },
    { id: '3', user: 'Maudie', comment: 'Itaque dolor fuga natus eveniet.', rating: 5 },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.thumbnailWrapper}>
        <Image source={{ uri: item.image || 'https://via.placeholder.com/400' }} style={styles.thumbnail} />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}><Ionicons name="share-outline" size={20} color="black" /></TouchableOpacity>
        <TouchableOpacity style={styles.playCenterBtn}><Ionicons name="play" size={32} color="black" /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.infoContainer}>
          <Text style={styles.mainTitle}>{item.title}</Text>
          
          <View style={styles.mentorRow}>
            <View style={styles.mentorAvatar}>
              <Image source={{ uri: item.mentorImage || 'https://via.placeholder.com/100' }} style={styles.avatarImg} />
            </View>
            <View style={styles.mentorInfo}>
              <Text style={styles.mentorName}>{item.mentorName}</Text>
              <Text style={styles.mentorTitle}>{item.category} Teacher</Text>
            </View>
          </View>

          <Text style={styles.subInfoText}>
            1 section  •  {totalLessons} lectures  •  {totalDuration}
          </Text>

          <View style={styles.tabBar}>
            {['About', 'Lessons', 'Reviews'].map((tab) => (
              <TouchableOpacity 
                key={tab} 
                style={[styles.tabItem, activeTab === tab && styles.tabActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabLabel, activeTab === tab && styles.labelActive]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'Lessons' && (
            <View style={styles.contentSection}>
              <View style={styles.sectionSubHeader}>
                <Text style={styles.sectionSubText}>Section 1 - Introduction</Text>
                <Text style={styles.sectionSubText}>{totalDuration}</Text>
              </View>
              {item.lessons?.map((lesson, index) => {
                const isWatched = watchedLessons.includes(lesson._id);
                return (
                  <TouchableOpacity 
                    key={lesson._id} 
                    style={[styles.lessonCard, isWatched && { backgroundColor: '#EBF2FF', borderColor: '#2F65EB', borderWidth: 1 }]}
                    onPress={() => handleLessonPress(index)}
                  >
                    <View style={[styles.lessonNumBox, isWatched && { backgroundColor: '#2F65EB' }]}>
                      <Text style={[styles.lessonNumText, isWatched && { color: '#FFF' }]}>
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </Text>
                    </View>
                    <View style={styles.lessonInfo}>
                      <Text style={[styles.lessonTitleText, isWatched && { color: '#2F65EB', fontWeight: 'bold' }]}>{lesson.title}</Text>
                      <Text style={styles.lessonDurationText}>{lesson.duration} mins</Text>
                    </View>
                    <View style={styles.playSmallBtn}>
                      <Ionicons name={isWatched ? "checkmark-circle" : "play-circle"} size={24} color="#2F65EB" />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {activeTab === 'About' && (
            <View style={styles.contentSection}>
              <Text style={styles.sectionHeading}>About Course</Text>
              <Text style={styles.descriptionText}>{item.description || "No description available."}</Text>
            </View>
          )}

          {activeTab === 'Reviews' && (
            <View style={styles.contentSection}>
               <View style={styles.reviewSummaryHeader}>
                  <Text style={styles.sectionHeading}>Reviews</Text>
                  <View style={{alignItems: 'flex-end'}}>
                      <Text style={styles.ratingBig}>{item.rating || "4.5"}</Text>
                      <View style={styles.reviewBadge}>
                        <Text style={styles.reviewBadgeText}>322+ reviews</Text>
                      </View>
                  </View>
               </View>
               {reviews.map(rev => (
                 <View key={rev.id} style={styles.reviewItemCard}>
                    <View style={styles.reviewAvatar}>
                        <Text style={styles.reviewAvatarText}>{rev.user[0]}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.reviewUser}>{rev.user}</Text>
                        <Text style={styles.reviewComment}>{rev.comment}</Text>
                    </View>
                    <View style={styles.starRow}>
                        {[1,2,3,4,5].map(s => <Ionicons key={s} name="star" size={14} color="#FF9500" />)}
                    </View>
                 </View>
               ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.enrollButton, 
            isEnrolled && { backgroundColor: '#4CAF50' },
            isEnrolled && isAllWatched && { backgroundColor: '#2F65EB' }
          ]} 
          onPress={isEnrolled ? () => navigation.navigate('MyCourse') : handleEnroll}
        >
          <Text style={styles.enrollButtonText}>
            {!isEnrolled ? "Enroll Course" : isAllWatched ? "Course Complete" : "Already Enrolled"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseDetailScreen;