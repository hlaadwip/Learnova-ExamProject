import { StyleSheet, Platform } from 'react-native';

export const getTabStyles = (insets) => StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 10,
    position: 'absolute',
    bottom: 0, 
    left: 0,
    right: 0,
    height: Platform.OS === 'android' ? 85 : 100 + insets.bottom, 
    paddingHorizontal: 23, 
    paddingBottom: Platform.OS === 'android' ? 10 : insets.bottom, 
    paddingTop: 13, 
  },
  tabItem: {
    paddingHorizontal: 0, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  iconContainer: { 
    width: 44, 
    height: 44, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 22,
  },
  activeCircle: { 
    backgroundColor: '#2F65EB',
  },
});