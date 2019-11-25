import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { FlatList, TouchableHighlight, TextInput } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
    this.props.navigation.navigate('Workorder', { id })
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
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large'/>
        </View>
      )
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

      <View style={styles.listItem}>
        <Text style={styles.listText}>
          {`${this.props.workorder.id}`}
        </Text>
        <TouchableHighlight underlayColor='E3E3E3' onPress={this.props.onPress}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons style={styles.center} name='dropbox' size={35} />
            <Text style={styles.center}>{`${this.props.workorder.items.length} items`}</Text>
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
    flex: 1,
    borderColor: 'black',
    borderWidth: 2,
    flexDirection: "row"
  },
  listText: {
    fontSize: 35,
    marginRight: 'auto'
  },
  iconContainer: {
    marginRight: 20
  },
  center: {
    alignSelf: "center"
  }
});