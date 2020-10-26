import { StyleSheet, Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImgNamePicture: {
    height: 96,
    width: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#CFCFCF',
    marginBottom: 16,
  },
  containerImgLetter: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },

  content: {
    flex: 1,
    width: width - 32,
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    maxHeight: 56,
    width: 304,
  },
});
