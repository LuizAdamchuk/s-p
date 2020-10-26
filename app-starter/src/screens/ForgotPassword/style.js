import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  header: {
    paddingBottom: 50,
    flexDirection: 'row',
  },
  textHeader: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
  },
  content: {
    marginTop: 48,
  },
  textContent: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 30,
    justifyContent: 'center',
  },
  textDescription: {
    marginTop: 16,
    color: '#666',
    fontSize: 18,
  },

  footer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
  },

  inputContainer: {
    flexDirection: 'row',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    padding: 8,
    alignItems: 'center',
  },
  inputContainerWrong: {
    flexDirection: 'row',
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F85568',
    padding: 8,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 48,
    width: 288,
    flex: 1,
    alignSelf: 'center',
  },
  buttonSendEmail: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
  },
  textButtonSendEmail: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 12,
  },
});
