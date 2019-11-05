import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import data from '../dummyData';
import { FlatList, TouchableHighlight, TextInput } from 'react-native-gesture-handler';

export default class WorkorderListScreen extends React.Component {

  onPress(id) {
    alert(`Pressed ${id}`);
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput/>
        <FlatList
          data={data}
          renderItem={({ item }) => <WorkorderListItem workorder={item} onPress={this.onPress.bind(this, item.id)}/>}
          //ItemSeparatorComponent = {<View style/>}
        />
      </View>
    )
  }
}

class WorkorderListItem extends React.Component {

  render() {
    return (
      <TouchableHighlight underlayColor='red' onPress={this.props.onPress}>
        <View>
          <Text style={styles.listItem}>
            {this.props.workorder.id}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  listItem: {
    fontSize: 50,
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
  },
});