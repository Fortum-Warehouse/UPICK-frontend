import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import WorkorderListScreen from './screens/workorderListScreen';
import WorkorderList from './screens/workorderScreen';
import BarcodeScanner from './screens/barcodeScan'
import ItemList from './screens/itemList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';


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
    initialRouteName: 'List',
    headerMode: 'none',
  });

const scannerStack = createStackNavigator({
  Scanner: BarcodeScanner,
  Workorder: WorkorderList,
},
  {
    initialRouteName: 'Scanner',
    headerMode: 'none',
  })

const icon = (name) => {
  return <MaterialCommunityIcons name={name} size={35}/>
}

const tabNavigator = createBottomTabNavigator({
  Workorders: {
    screen: workorderStack,
    navigationOptions: {
      tabBarLabel: 'Workorders',
      tabBarIcon: () => icon('truck-fast'),
    }
  },
  Scanner: {
    screen: scannerStack,
    navigationOptions: {
      tabBarLabel: 'Scan Workorder',
      tabBarIcon: () => icon('barcode-scan'),
    }
  },
  ItemList: {
    screen: ItemList,
    navigationOptions: {
      tabBarLabel: 'Inventory List',
      tabBarIcon: () => icon('playlist-edit'),
    }
  },
},
{
  tabBarOptions: {
    activeTintColor:'#7AE17A',
    activeBackgroundColor: '#E3E3E3',
  }
  }
)

export default createAppContainer(tabNavigator)
