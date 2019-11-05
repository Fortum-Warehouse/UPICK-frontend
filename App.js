import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WorkorderListScreen from './screens/workorderListScreen';
import WorkorderList from './screens/workorderScreen';

const AppNavigator = createStackNavigator({
  Home: { 
    screen: WorkorderListScreen,
    navigationOptions: (navigation) => ({
      title: 'Workorder list',
    }),
  },
  Workorder: {
    screen: WorkorderList,
    navigationOptions: (navigaton) => ({
      title: 'Workorder'
    }),
  }
});

export default createAppContainer(AppNavigator)
