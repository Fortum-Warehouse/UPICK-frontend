import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TextInput } from 'react-native-gesture-handler';

export default class WorkorderListScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      data: null,
      isLoaded: false,
      visibleData: null,
    }
  }

  onPress(id) {
    alert(`Pressed ${id}`);
    this.props.navigation.navigate('Home')
  }

  componentDidMount() {
    fetch('https://api.myjson.com/bins/w3fjk')
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          isLoaded: true,
          visibleData: res,
        })
      })
  }


  render() {
    if (!this.state.isLoaded) {
      return <Text>Loading</Text>
    }
    return (
      <View style={styles.container}>
        <TextInput onChangeText={text => {
          this.setState({
            visibleData: this.state.data.filter(workorder => {
              return workorder.name.includes(text)
            })
          })
          console.log(text);
        }} />
        <FlatList
          data={this.state.visibleData}
          renderItem={({ item }) => <WorkorderListItem workorder={item} onPress={this.onPress.bind(this, item.id)} />}
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
            {this.props.workorder.name}
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