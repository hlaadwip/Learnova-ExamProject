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
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#888',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIconBox: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#EBF1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
});