import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { FlatList, TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons'

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
          data: res.sort((a,b) => a.name>b.name ? 1:-1),
          isLoaded: true,
          visibleData: res,
        })
      })
  }


  render() {
    if (!this.state.isLoaded) {
      return (<View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>)
    }
    return (
      <View style={styles.container}>
        <TextInput onChangeText={text => {
          this.setState({
            visibleData: this.state.data.filter(item => {
              return item.name.toLowerCase().includes(text.toLowerCase())
            })
          })
        }} />
        <FlatList
          data={this.state.visibleData}
          renderItem={({ item }) => <ItemListItem item={item} onPress={this.onPress.bind(this, item.url)} />}
        />
      </View>
    )
  }
}

class ItemListItem extends React.Component {

  render() {
    return (

      <View style={styles.listItem}>
        <Text style={styles.name}>
          {this.props.item.name}
        </Text>
        <TouchableHighlight underlayColor='#E3E3E3' onPress={this.props.onPress}>
          <View style={styles.icon}>
            <MaterialIcons name='location-on' size={35} />
            <Text>{this.props.item.location}</Text>
          </View>
        </TouchableHighlight>
      </View>

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
    flexDirection: "row",
    fontSize: 35,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: "center",
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    paddingLeft:5,
    paddingRight:5
  },
  name: {
    fontSize: 35,
    flex: 8
  },
  icon: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
  }
});
