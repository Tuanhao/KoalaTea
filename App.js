import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoadScreen} from './LoadScreen.js';
import {HomeScreen} from './HomeScreen.js';

const MainNavigator = createStackNavigator({
  Load: {screen: LoadScreen},
  Home: {screen: HomeScreen},
}, {
  headerMode: 'none'
});

const App = createAppContainer(MainNavigator);

export default App;
