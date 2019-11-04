import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import data from '../dummyData';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';

export default class WorkorderListScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={data} renderItem={({ item }) => <WorkorderListItem workorder={item} />}></FlatList>
      </View>
    )
  }
}

class WorkorderListItem extends React.Component {

  onPress() {
    alert('clicked');
  }

  render() {
    return (
      <TouchableHighlight underlayColor='red' onPress={this.onPress}>
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
  },
});