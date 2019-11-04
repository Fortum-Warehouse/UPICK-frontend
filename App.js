import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import workorderScreen from './screens/workorderListScreen';

const AppNavigator = createStackNavigator({
  Home: { screen: workorderScreen },
});

export default createAppContainer(AppNavigator)
