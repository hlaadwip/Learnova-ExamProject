import { StyleSheet } from 'react-native';
import { Colors } from './Colors'; 

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: 'Poppins-Black', 
    fontSize: 48, 
    color: Colors.white,
    letterSpacing: -1.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  circleAccent: {
    width: 26,
    height: 26,
    backgroundColor: Colors.accent, 
    borderRadius: 13,
    marginHorizontal: 1,
    transform: [{ translateY: 4 }], 
  },
});