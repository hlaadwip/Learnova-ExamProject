import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Container utama
  container: { 
    flex: 1, 
    backgroundColor: '#FFF' 
  },
  headerTitle: { 
    fontSize: 24, 
    fontFamily: 'Poppins-Bold', 
    marginHorizontal: 20, 
    marginTop: 20, 
    marginBottom: 20,
    color: '#000'
  },
  
  // Tab Switcher 
  tabWrapper: { 
    paddingHorizontal: 20, 
    marginBottom: 25,
    width: '100%', 
  },
  tabContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#EEF4FF', 
    borderRadius: 25, 
    padding: 5, 
    height: 45, 
    alignItems: 'center',
    width: '100%', 
  },
  tabButton: { 
    flex: 1, 
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTabButton: { 
    backgroundColor: '#2F65EB', 
  },
  tabText: { 
    fontFamily: 'Poppins-Medium', 
    color: '#000', 
    fontSize: 14 
  },
  activeTabText: { 
    color: '#FFF',
    fontFamily: 'Poppins-Bold' 
  },

  // Card Course
  listContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 40 
  },
  courseCard: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    padding: 10, 
    marginBottom: 15, 
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderWidth: 0.5,
    borderColor: '#F8F8F8',
    alignItems: 'center'
  },
  courseImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 10, 
    marginRight: 15 
  },
  infoContainer: { 
    flex: 1 
  },
  titleText: { 
    fontSize: 15, 
    fontFamily: 'Poppins-Bold', 
    color: '#000' 
  },
  
  // Meta data (star & watch)
  metaRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5,
    gap: 12, 
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  metaText: { 
    fontSize: 10, 
    color: '#C0C0C0', 
    fontFamily: 'Poppins-Regular',
    marginLeft: 4,
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 14,
  },
  
  // Progress Bar
  progressLabelRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 12, 
    marginBottom: 5 
  },
  completedText: { 
    fontSize: 9, 
    color: '#C0C0C0', 
    fontFamily: 'Poppins-Regular' 
  },
  percentageText: { 
    fontSize: 9, 
    color: '#C0C0C0', 
    fontFamily: 'Poppins-Bold' 
  },
  progressBarBg: { 
    height: 4, 
    backgroundColor: '#F0F0F0', 
    borderRadius: 2 
  },
  progressBarFill: { 
    height: 4, 
    backgroundColor: '#2F65EB', 
    borderRadius: 2 }
});