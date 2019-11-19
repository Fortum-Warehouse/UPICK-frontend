import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

export default class ItemListScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      data: null,
      isLoaded: false,
      visibleData: null,
    }
  }

  onPress(url) {
    console.log(url)
    WebBrowser.openBrowserAsync(url)
  }

  componentDidMount() {
    fetch('https://upickup.herokuapp.com/items')
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
            visibleData: this.state.data.filter(item => {
              return item.name.includes(text)
            })
          })
          console.log(text);
        }} />
        <FlatList
          data={this.state.visibleData}
          renderItem={({ item }) => <ItemListItem item={item} onPress={this.onPress.bind(this, item.url)} />}
        //ItemSeparatorComponent = {<View style/>}
        />
      </View>
    )
  }
}

class ItemListItem extends React.Component {

  render() {
    return (
      <TouchableHighlight underlayColor='red' onPress={this.props.onPress}>
        <View>
          <Text style={styles.listItem}>
            {`${this.props.item.name} ${this.props.item.location}`}
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