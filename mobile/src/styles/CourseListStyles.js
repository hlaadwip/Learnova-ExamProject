import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 50) / 2; 

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#000',
  },

  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  categoryActive: {
    backgroundColor: '#2F65EB', 
    borderColor: '#2F65EB',
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  labelActive: {
    color: '#FFF',
  },

  gridCard: {
    width: cardWidth,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  gridImg: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  gridBadge: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: '#2F65EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  gridBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginHorizontal: 10,
    color: '#000',
  },
  
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 11,
    color: '#888',
    marginLeft: 3,
  },
  studentCount: {
    fontSize: 11,
    color: '#888',
  }
});