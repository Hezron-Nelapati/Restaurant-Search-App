import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ResultShowScreen from './src/screens/ResultShowScreen';
import SearchScreen from './src/screens/searchScreen';

const navigator = createStackNavigator({
  Home: HomeScreen,
  Search: SearchScreen,
  ResultShow: ResultShowScreen
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    title: 'Buisness Search'
  }
});

export default createAppContainer(navigator);
