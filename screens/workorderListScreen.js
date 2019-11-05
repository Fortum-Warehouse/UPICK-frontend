import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TextInput } from 'react-native-gesture-handler';

export default class WorkorderListScreen extends React.Component {

  constructor(){
    super()
    this.state = {
      data: null,
      isLoaded:false,
    }
  }

  onPress(id) {
    alert(`Pressed ${id}`);
    this.props.navigation.navigate('Home')
  }

  componentDidMount(){
    fetch('https://api.myjson.com/bins/w3fjk')
    .then(res => res.json())
    .then(res => {
      this.setState({
        data:res,
        isLoaded:true
      })
    })
  }


  render() {
    if (!this.state.isLoaded) {
      return <Text>Loading</Text>
    } 
    return (
      <View style={styles.container}>
        <TextInput/>
        <FlatList
          data={this.state.data}
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