import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 26,
    fontFamily: 'Poppins-SemiBold', 
    color: '#1F1F1F',
    letterSpacing: -0.5,
  },

  // Banner
  banner: {
    borderRadius: 24, 
    padding: 24,
    flexDirection: 'row',
    height: 180,
    marginBottom: 30,
    position: 'relative',
    overflow: 'hidden', 
  },
  bannerContent: {
    flex: 0.6,
    justifyContent: 'center',
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    lineHeight: 22,
    marginBottom: 12,
  },
  bannerButton: {
    backgroundColor: '#ffc402', 
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    elevation: 3,
  },
  bannerButtonText: {
    color: '#FFFFFF', 
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  bannerImage: {
    width: 200,
    height: '200%', 
    position: 'absolute',
    right: -10,
    bottom: -10,
    resizeMode: 'contain',
  },

  // Categories
  categoryList: {
    marginBottom: 20,
  },
  categoryItem: {
    paddingHorizontal: 24,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#1F1F1F', 
    marginRight: 7,
    marginTop: 12,
    backgroundColor: '#FFFFFF',
  },
  categoryActive: {
    backgroundColor: '#3D5CFF',
    borderColor: '#3B82F6',
  },
  categoryLabel: {
    color: '#1F1F1F',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  labelActive: {
    color: '#FFFFFF',
  },

  // Recommended for You
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1F1F1F',
  },
  viewAll: {
    color: '#2563EB',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  courseCard: {
    width: width * 0.42,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 5,
    elevation: 1,
    marginBottom: 10,
  },
  courseImg: {
    width: '100%',
    height: 110,
    borderRadius: 16,
    marginBottom: 9,
  },
  courseBadge: {
    backgroundColor: '#2F65EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    marginTop: -20, 
    marginLeft: 8,
    alignSelf: 'flex-start', 
    zIndex: 1,
  },
  courseBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },
  courseTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#1F1F1F',
    marginTop: 4,
    width: '100%',
    paddingHorizontal: 5,
  },
  courseMentor: {
    fontSize: 11,
    color: '#B0B0B0',
    fontFamily: 'Poppins',
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    paddingHorizontal: 5,
  },

  // Mentor
  mentorCard: {
    width: 90,
    marginRight: 10,
    alignItems: 'center',
  },
  mentorImg: {
    width: 90,
    height: 110,
    borderRadius: 13,
    backgroundColor: '#F5F5F5',
  },
  mentorBadge: {
    backgroundColor: '#2F65EB',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: -15,
  },
  mentorBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  }
});