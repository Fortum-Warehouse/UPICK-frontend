import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WorkorderListScreen from './screens/workorderListScreen';
import WorkorderList from './screens/workorderScreen';
import BarcodeScanner from './screens/barcodeScan'
import ItemList from './screens/itemList';

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
  ItemList: {
    screen: ItemList,
    navigationOptions: (navigaton) => ({
      title: 'Item list'
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
  initialRouteName: 'ItemList'
});

export default createAppContainer(AppNavigator)
