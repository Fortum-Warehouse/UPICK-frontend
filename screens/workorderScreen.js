import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

export default class WorkorderScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      data: null,
      isLoaded: false,
      id: null,
    }
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', 'error');
    fetch(`https://upickup.herokuapp.com/workorders/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res[0],
          isLoaded: true,
          id: id,
        })
      })
  }

  onPress(url) {
    console.log(url)
    WebBrowser.openBrowserAsync(url)
  }

  render() {
    if (!this.state.isLoaded) return <Text>Loading</Text>
    return (
      <View>
        <FlatList
          data={this.state.data.items}
          renderItem={({ item }) => <WorkorderItem item={item} onPress={this.onPress.bind(this, item.item.url)} />}
        />
      </View>
    )
  }
}

class WorkorderItem extends React.Component {

  render() {
    return (
      <TouchableHighlight underlayColor='gray' onPress={this.props.onPress}>
        <View>
          <Text>
            {`${this.props.item.item.name} ${this.props.item.qty}`}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}