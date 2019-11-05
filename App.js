import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WorkorderListScreen from './screens/workorderListScreen';

const AppNavigator = createStackNavigator({
  Home: { 
    screen: WorkorderListScreen,
    navigationOptions: (navigation) => ({
      title: 'Workorder list',
    }),
  },
});

export default createAppContainer(AppNavigator)
