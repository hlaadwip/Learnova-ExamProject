import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from './Colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgSoft,
  },
  skipWrapper: {
    alignItems: 'flex-end',
    paddingTop: 28,
    paddingHorizontal: 30,
    zIndex: 10,
  },
  skipText: {
    fontFamily: 'Poppins-Medium', 
    fontSize: 16,
    color: '#000',
  },

  // Onboarding
  imageWrapper: {
      height: height * 0.40, 
      justifyContent: 'center', 
      width: width,
      zIndex: 1,
      overflow: 'visible', 
  },
  image: {
    resizeMode: 'contain',
    zIndex: 1,
  },
  bottomCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 40,
    paddingTop: 45,
    height: height * 0.45, 
    justifyContent: 'space-between',
    paddingBottom: 60, 
    position: 'absolute', 
    bottom: 0,
    width: width,
    zIndex: 5,
    elevation: 10,
  },
  titleBlack: {
    fontFamily: 'Poppins-Bold', 
    fontSize: 24,
    color: '#000',
    lineHeight: 36,
  },
  titleBlue: {
    fontFamily: 'Poppins-Bold', 
    fontSize: 24,
    color: Colors.primary,
    lineHeight: 36,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.gray,
    marginTop: 10,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80, 
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 20, 
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  nextButtonContainer: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRing: {
    position: 'absolute',
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 3,
    borderColor: '#D1E4FF',
    borderTopColor: Colors.primary,
    transform: [{ rotate: '45deg' }],
  },
  nextButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});