import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import WorkorderListScreen from './screens/workorderListScreen';
import WorkorderList from './screens/workorderScreen';
import BarcodeScanner from './screens/barcodeScan'
import ItemList from './screens/itemList';


const workorderStack = createStackNavigator({
  List: { 
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
},
{
  initialRouteName: 'List'
});

const scannerStack = createStackNavigator({
  Scanner: BarcodeScanner,
  Workorder: WorkorderList,
})

const tabNavigator = createBottomTabNavigator({
  Workorders: workorderStack,
  Scanner: scannerStack,
  ItemList: ItemList,
})

export default createAppContainer(tabNavigator)
