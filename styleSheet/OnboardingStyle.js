import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';

const _height = Platform.select({
  ios: 200,
  android: StatusBar.currentHeight + 70,
});

const OnboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navBar: {
    backgroundColor: '#005F60',
    // elevation: 0,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000000',
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingBottom: 25,
  },
  inputConainer: {
    paddingHorizontal: 20,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    paddingTop: 0,
    height: 50
  },
  textArea: {
    height: 220,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    color: '#000',
    backgroundColor: '#F6F6F6',
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 10,
  },
  _row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  termsText: {
    color: '#5C5B5B',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Quicksand SemiBold'
  },
  submitBtn: {
    borderRadius: 50,
    height: 55,
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  submitCustomBtn: {
    borderRadius: 50,
    height: 45,
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  addChildBtn: {
    backgroundColor: '#F9B406',
    fontSize: 12,
    borderRadius: 50,
    height: 30,
    justifyContent: 'center',
    width: 100,
    position: 'absolute',
    top: -15,
    right: 10
  },
  submitBtnContainer: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
    paddingHorizontal: 20,
  },
  customBtnContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  _scrollView: {
    flexGrow: 1,
    height: Dimensions.get('window').height - _height,
  },
  cancelBtn: {
    backgroundColor: '#fff',
    fontSize: 12,
    borderRadius: 4,
    height: 45,
    margin: 20,
    justifyContent: 'center',
  },
  nextBtn: {
    backgroundColor: '#F9B406',
    fontSize: 12,
    borderRadius: 50,
    height: 45,
    margin: 20,
    justifyContent: 'center',
  },
  footerBtn: {
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    bottom: 0,
    zIndex: 5,
    paddingHorizontal: 4,
  },
  banner: {
    height: 160,
    width: '100%',
    backgroundColor: '#F9B406',
    borderRadius: 8,
    alignSelf: 'center'
  }
});

export default OnboardingStyles;
