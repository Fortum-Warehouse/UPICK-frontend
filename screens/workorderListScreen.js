import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import data from '../dummyData';
import { FlatList } from 'react-native-gesture-handler';

export default class WorkorderListScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={data} renderItem={({ item }) => <WorkorderListItem workorder={item}/>}></FlatList>
      </View>
    )
  }
}

class WorkorderListItem extends React.Component {

  render() {
    return (<Text>{this.props.workorder.id}</Text>)
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});