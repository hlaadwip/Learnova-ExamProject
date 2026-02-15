import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  
  thumbnailWrapper: { 
    padding: 20, 
    paddingTop: 50, 
    position: 'relative', 
    alignItems: 'center' 
  },
  thumbnail: { 
    width: '100%', 
    height: 220, 
    borderRadius: 30, 
    resizeMode: 'cover' 
  },
  backBtn: { 
    position: 'absolute', 
    top: 65, 
    left: 35, 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 8 
  },
  shareBtn: { 
    position: 'absolute', 
    top: 65, 
    right: 35, 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    padding: 8 
  },
  playCenterBtn: { 
    position: 'absolute', 
    top: '55%', 
    backgroundColor: 'rgba(255,255,255,0.9)', 
    borderRadius: 40, 
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },

  // Info Content
  infoContainer: { 
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  mainTitle: { 
    fontFamily: 'Poppins-Bold', 
    fontSize: 24, 
    marginTop: 10, 
    color: '#000' 
  },
  mentorRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 15 
  },
  mentorAvatar: { 
    width: 45, 
    height: 45, 
    borderRadius: 22.5, 
    backgroundColor: '#2F65EB', 
    overflow: 'hidden' 
  },
  avatarImg: { 
    width: '100%', 
    height: '100%' 
  },
  mentorInfo: { 
    marginLeft: 12 
  },
  mentorName: { 
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 14, 
    color: '#000' 
  },
  mentorTitle: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 11, 
    color: '#888' 
  },
  subInfoText: { 
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 12, 
    color: '#000', 
    marginTop: 15 },

  // Tab Bar
  tabBar: { 
    flexDirection: 'row', 
    backgroundColor: '#F0F5FF', 
    borderRadius: 25, 
    padding: 5, 
    marginTop: 25,
    justifyContent: 'space-between'
  },
  tabItem: { 
    flex: 1, 
    paddingVertical: 12, 
    alignItems: 'center', 
    borderRadius: 20 
  },
  tabActive: { 
    backgroundColor: '#2F65EB' 
  },
  tabLabel: { 
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 13, 
    color: '#000000' 
  },
  labelActive: { 
    color: '#ffff' 
  },

  // Content Sections
  contentSection: { 
    marginTop: 15,
    paddingBottom: 20,
  },
  sectionHeading: { 
    fontFamily: 'Poppins-Bold', 
    fontSize: 18, 
    marginBottom: 10 
  },
  descriptionText: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 13, 
    color: '#888', 
    lineHeight: 20 
  },

  // Lessons Styling
  sectionSubHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },
  sectionSubText: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 11, 
    color: '#BBB' 
  },
  lessonCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#F0F0F0',
    elevation: 1 
  },
  lessonNumBox: { 
    width: 40, 
    height: 40, 
    backgroundColor: '#F5F5F5', 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  lessonNumText: { 
    fontFamily: 'Poppins-Bold', 
    fontSize: 14 
  },
  lessonInfo: { 
    flex: 1, 
    marginLeft: 15 
  },
  lessonTitleText: { 
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 14, 
    color: '#000' 
  },
  lessonDurationText: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 11, 
    color: '#BBB' 
  },

  // Reviews Styling
  reviewSummaryHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  ratingBig: { 
    fontFamily: 'Poppins-Bold', 
    fontSize: 28 
  },
  reviewBadge: { 
    backgroundColor: '#7089FF', 
    paddingHorizontal: 12, 
    paddingVertical: 5, 
    borderRadius: 10 
  },
  reviewBadgeText: { 
    color: '#FFF', 
    fontSize: 11, 
    fontFamily: 'Poppins-Bold' 
  },
  reviewItemCard: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#FFF', 
    borderRadius: 20, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#F0F0F0' 
  },
  reviewAvatar: { 
    width: 45, 
    height: 45, 
    backgroundColor: '#7089FF', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  reviewAvatarText: { 
    color: '#FFF', 
    fontFamily: 'Poppins-Bold', 
    fontSize: 18 
  },
  reviewUser: { 
    fontFamily: 'Poppins-Bold', 
    fontSize: 15, 
    color: '#000' 
  },
  reviewComment: { 
    fontFamily: 'Poppins-Regular', 
    fontSize: 12, 
    color: '#888' 
  },
  starRow: { 
    flexDirection: 'row', 
    marginTop: 5 
  },

  // Footer Button
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    padding: 20, 
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0'
  },
  enrollButton: { 
    backgroundColor: '#2F65EB', 
    paddingVertical: 18, 
    borderRadius: 20, 
    alignItems: 'center' 
  },
  enrollButtonText: { 
    color: '#FFF', 
    fontFamily: 'Poppins-Bold', 
    fontSize: 16 
  }
});