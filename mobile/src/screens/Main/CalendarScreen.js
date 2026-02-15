import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { styles } from '../../styles/CalendarStyles';
import { fetchMyCourses } from '../../services/api'; 

const CalendarScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 15)); 
  const [selectedDate, setSelectedDate] = useState(15);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = user?._id || user?.id;
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const fetchOngoingSchedules = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const myData = await fetchMyCourses(userId);
      const ongoingCourses = myData.filter(item => 
        (item.status && item.status.toLowerCase() === 'ongoing')
      );

      const sortedAlphabetically = ongoingCourses.sort((a, b) => {
        const titleA = (a._doc?.title || a.title || "").toUpperCase();
        const titleB = (b._doc?.title || b.title || "").toUpperCase();
        return titleA.localeCompare(titleB);
      });

      const mappedSchedules = sortedAlphabetically.map((item, index) => {
        const coreData = item._doc || item;
        const startTime = 10 + index;
        return {
          id: item._id || coreData._id || index.toString(),
          title: coreData.title || "Untitled Course",
          chapter: item.nextTopic || "Class Session", 
          time: `${startTime}:00 - ${startTime + 1}:30 AM`, 
          image: coreData.image || 'https://via.placeholder.com/150',
          fullData: { ...coreData, ...item }
        };
      });

      setSchedules(mappedSchedules);
    } catch (error) {
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOngoingSchedules();
    }, [userId])
  );

  useEffect(() => {
    fetchOngoingSchedules();
  }, [selectedDate, currentDate]);

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
    setCurrentDate(newDate);
    setSelectedDate(1);
  };

  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const todayDate = today.getDate();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay(); 
    
    const calendarSlots = [];
    
    for (let i = 0; i < firstDayIndex; i++) {
      calendarSlots.push(<View key={`pad-${i}`} style={styles.dateItem} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = isCurrentMonth && i === todayDate;
      const isSelected = selectedDate === i;

      calendarSlots.push(
        <TouchableOpacity 
          key={i} 
          style={[
            styles.dateItem, 
            isToday && !isSelected && { backgroundColor: '#EBF1FF' }, 
            isSelected && styles.selectedDateItem, 
          ]}
          onPress={() => setSelectedDate(i)}
        >
          <Text style={[
            styles.dateText, 
            isToday && !isSelected && { color: '#2F65EB' }, 
            isSelected && styles.selectedDateText, 
          ]}>
            {i}
          </Text>

          {isToday && !isSelected && (
            <View style={{ 
              width: 4, 
              height: 4, 
              borderRadius: 2, 
              backgroundColor: '#2F65EB', 
              position: 'absolute', 
              bottom: 4 
            }} />
          )}
        </TouchableOpacity>
      );
    }
    return calendarSlots;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.headerTitle}>Class calendar</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.calendarCard}>
          
          <View style={styles.monthNavContainer}>
            <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
              <Ionicons name="chevron-back" size={18} color="#000" />
            </TouchableOpacity>
            
            <Text style={styles.monthLabel}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>

            <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
              <Ionicons name="chevron-forward" size={18} color="#000" />
            </TouchableOpacity>
          </View>
          
          <View style={{ marginVertical: 10 }} />

          <View style={styles.weekDaysRow}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <Text key={day} style={[styles.weekDayText, day === 'Su' && styles.weekendText]}>{day}</Text>
            ))}
          </View>

          <View style={styles.dateGrid}>
            {renderCalendarGrid()}
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2F65EB" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={schedules}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.scheduleCard}
                onPress={() => navigation.navigate('Detail', { item: item.fullData })}
              >
                <Image source={{ uri: item.image }} style={styles.courseImage} />
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{item.title}</Text>
                  <Text style={styles.chapterText}>{item.chapter}</Text>
                  <View style={styles.timeRow}>
                    <Ionicons name="time-outline" size={12} color="#AAA" />
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={{ marginTop: 30, alignItems: 'center' }}>
                <Ionicons name="calendar-outline" size={40} color="#DDD" />
                <Text style={{ textAlign: 'center', color: '#888', marginTop: 10, fontFamily: 'Poppins-Regular' }}>
                  No ongoing classes for this date
                </Text>
              </View>
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;