import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

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
    this.props.navigation.navigate('Workorder', {id})
  }

  componentDidMount() {
    fetch('https://upickup.herokuapp.com/workorders')
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
              return workorder.name.toLowerCase().includes(text.toLowerCase())
            })
          })
        }} />
        <FlatList
          data={this.state.visibleData}
          renderItem={({ item }) => <WorkorderListItem workorder={item} onPress={this.onPress.bind(this, item.id)} />}
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
            {`${this.props.workorder.id} ${this.props.workorder.items.length} items`}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  listItem: {
    fontSize: 40,
    borderColor: 'black',
    borderWidth: 2,
  },
});