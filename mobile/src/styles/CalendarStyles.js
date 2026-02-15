import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 20,
    marginTop: 20,
    color: '#000',
    marginBottom: 20,
  },
  calendarCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 25,
  },
  // Style Navigasi
  monthNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  monthLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  // Badge tambahan 
  monthBadge: {
    backgroundColor: '#2F65EB',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 15,
  },
  monthText: {
    color: '#FFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekDayText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    width: 35,
    textAlign: 'center',
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dateItem: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    position: 'relative', 
  },
  // State Styles (Live & Selected)
  selectedDateItem: {
    backgroundColor: '#2F65EB',
  },
  todayItem: {
    backgroundColor: '#EBF1FF',
  },
  dateText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  selectedDateText: {
    color: '#FFF',
  },
  todayDateText: {
    color: '#2F65EB',
    fontFamily: 'Poppins-Bold',
  },
  blueDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2F65EB',
    position: 'absolute',
    bottom: 4,
  },
  // Helpers
  otherMonthText: {
    color: '#D0D0D0',
  },
  weekendText: {
    color: '#2F65EB',
  },
  // Schedule Card Styles
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    alignItems: 'center',
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  chapterText: {
    fontSize: 11,
    color: '#888',
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    fontSize: 11,
    color: '#AAA',
    marginLeft: 4,
    fontFamily: 'Poppins-Regular',
  },
});