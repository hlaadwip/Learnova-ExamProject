import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF' 
  },
  searchHeader: { 
    paddingHorizontal: 20, 
    paddingTop: 20, 
    marginBottom: 20 
  },
  headerTitle: { 
    fontSize: 24, 
    fontFamily: 'Poppins-Bold', 
    marginBottom: 15 
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FF',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: { 
    marginRight: 10 
  },
  searchInput: { 
    flex: 1, 
    fontSize: 16, 
    color: '#000' 
  },
  
  // Section Styles
  sectionTitle: { 
    fontSize: 18, 
    fontFamily: 'Poppins-SemiBold', 
    marginHorizontal: 20, 
    marginBottom: 15 
  },
  resultSection: { 
    marginTop: 10 
  },
  recommendSection: { 
    marginTop: 10 
  },
  
  // Card Styles 
  searchResultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  resultImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 8, 
    marginRight: 15 
  },
  resultInfo: { 
    flex: 1 
  },
  resultTitle: { 
    fontSize: 14, 
    fontFamily: 'Poppins-Medium' 
  },
  resultCategory: { 
    fontSize: 12, 
    color: '#888' 
  },
  
  // Horizontal Course Card 
  courseCard: { 
    width: 150, 
    marginLeft: 20, 
    marginRight: 5 
  },
  courseImg: { 
    width: '100%', 
    height: 120, 
    borderRadius: 15 
  },
  courseTitle: { 
    fontSize: 14, 
    fontFamily: 'Poppins-Bold', 
    marginTop: 5
  },
  badge: { 
    backgroundColor: '#E8EFFF', 
    alignSelf: 'flex-start', 
    padding: 5, 
    borderRadius: 5, 
    marginTop: 5 
  },
  badgeText: { 
    color: '#2F65EB', 
    fontSize: 10 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 50, 
    color: '#AAA' 
  }
});