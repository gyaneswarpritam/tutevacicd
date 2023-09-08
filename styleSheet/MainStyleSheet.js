import { StyleSheet } from 'react-native';
// import {DefaultTheme} from 'react-native-paper';

const MainStyleSheet = StyleSheet.create({
  fontStyle: {
    fontFamily: 'Quicksand SemiBold'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
    color: '#000000',
  },
  scrollView: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  title: {
    color: '#000000',
  },
  card: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
  },
  cardSelection: {
    width: '80%',
    backgroundColor: '#D9D9D9',
    padding: 10,
    margin: 10,
    height: 90,
    borderRadius: 10,
  },
  cardSelected: {
    width: '80%',
    backgroundColor: '#F9B406',
    padding: 10,
    margin: 10,
    height: 90,
    borderRadius: 10,
  },
  navBar: {
    backgroundColor: '#F9B406',
    elevation: 5,
    color: '#FFFFFF'
  },
  navBarColor: {
    color: '#FFFFFF',
  },
  //Dashboard
  wrapper: {},
  slide: {
    flex: 1,
    height: 200,
  },
  cardTitle: {
    fontSize: 16,
    color: '#595959',
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  titleScreen: {
    fontSize: 16,
    fontWeight: 'bold',
    // paddingVertical: 6,
    paddingLeft: 6,
  },
  viewAll: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F9B406',
    marginLeft: 30
  },
  dot: {
    // backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderColor: '#302C54',
    borderWidth: 1,
    margin: 2,
  },
  activeDot: {
    backgroundColor: '#302C54',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 2,
  },
  fontSemiQuicksand: {
    fontWeight: '600',
    fontFamily: 'Quicksand SemiBold'
  },
  fontBoldQuicksand: {
    fontWeight: 'bold',
    fontFamily: 'Quicksand SemiBold'
  },
  fontBoldLato: {
    fontFamily: 'Lato Bold',
  },
  textHeading: {
    fontSize: 18,
    color: '#222222'
  },
  textHeadingMargin: {
    marginTop: 20,
  },
  textHeadingMr10: {
    marginTop: 10,
  },
  radioContainer: {
    flex: 1,
  },
  radioButtonContainer: {
    flexDirection: 'row',
  },
  radioButtonReverse: {
    flexDirection: 'row-reverse', // Place label to the right
    alignItems: 'center',
    paddingRight: 10, // Adjust spacing
  },
});

export default MainStyleSheet;
