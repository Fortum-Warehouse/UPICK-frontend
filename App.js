import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WorkorderListScreen from './screens/workorderListScreen';
import WorkorderList from './screens/workorderScreen';
import BarcodeScanner from './screens/barcodeScan'

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
  },
  BarcodeScanner: { 
    screen: BarcodeScanner,
    navigationOptions: (navigation) => ({
      title: 'Scan barcode',
    }),
  },
},
{
  initialRouteName: 'Home'
});

export default createAppContainer(AppNavigator)
