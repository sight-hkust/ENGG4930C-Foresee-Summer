import { StyleSheet } from 'react-native';
import AppColors from './colors';
import { ScreenWidth, ScreenHeight } from '../constant/Constant';

export const Styles = StyleSheet.create({
  horizontalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  smallButton: {
    borderWidth: 3,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'gray',
  },
  aProgressionButton: {
    borderColor: AppColors.primaryColor,
  },
  aProgressionText: {
    color: AppColors.primaryColor,
  },
  smallButtonText: {
    fontSize: 24,
    color: 'gray',
    fontWeight: 'bold',
  },
  registerTitle: {
    fontSize: 32,
    color: AppColors.primaryDark,
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'left',
    width: '80%',
    fontWeight: 'bold',
  },
  termsOfUseText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
    width: '70%',
  },
  headerStyle: {
    backgroundColor: '#2D89DD',
  },
  headerTitleStyle: {
    textAlign: "center",
    fontWeight: '500',
  },
  formFieldWrapper: {
    marginHorizontal: ScreenWidth * 0.1,
    marginVertical: ScreenHeight * 0.007,
  },
  formTextInput: {
    marginTop: ScreenHeight * 0.01,
    paddingHorizontal: ScreenWidth * 0.02,
    borderWidth: 0.7,
    borderColor: 'grey',
    height: 40,
    borderRadius: 3,
  },  
  formTextInputArea: {
    marginTop: ScreenHeight * 0.01,
    paddingHorizontal: ScreenWidth * 0.02,
    borderWidth: 0.7,
    borderColor: 'grey',
    borderRadius: 3,
  },
});
