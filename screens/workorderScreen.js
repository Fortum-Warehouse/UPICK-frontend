import React from "react"
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Modal,
  Button,
  Picker
} from "react-native"
import {
  FlatList,
  TouchableHighlight,
  TextInput
} from "react-native-gesture-handler"
import * as WebBrowser from "expo-web-browser"
import Constants from "expo-constants"
import { MaterialIcons } from "@expo/vector-icons"
import { styles } from "../Styles.js"

export default class WorkorderScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      isLoaded: false,
      id: null,
      modalVisible: false,
      modalItem: null,
      picker: "Select issue"
    }
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("id", "error")
    fetch(`https://upickup.herokuapp.com/workorders/${id}`)
      .then(res => res.json())
      .then(res => {
        const list = res[0]
        list.items = list.items.sort((a, b) =>
          a.item.location > b.item.location ? 1 : -1
        )
        this.setState({
          data: list,
          isLoaded: true,
          id: id
        })
      })
  }

  onPressLoc(url) {
    console.log(url)
    WebBrowser.openBrowserAsync(url)
  }

  setModalVisible(visible, item) {
    console.log("test")
    this.setState({
      modalVisible: visible,
      modalItem: item,
      picker: "Select issue"
    })
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Submit issue for:</Text>
              <Text>{this.state.modalItem}</Text>
              <Picker
                selectedValue={this.state.picker}
                onValueChange={(itemValue, itemPosition) => {
                  this.setState({ picker: itemValue })
                }}
              >
                <Picker.Item
                  label="Item not at location"
                  value="Item not at location"
                />
                <Picker.Item
                  label="Not enough in stock"
                  value="Not enough in stock"
                />
                <Picker.Item label="Item is damaged" value="Item is damaged" />
              </Picker>
              <Button
                onPress={() => {
                  console.log("close")
                  this.setModalVisible(false, null)
                }}
                title="Cancel"
              />
              <Button
                onPress={() => {
                  console.log("close")
                  this.setModalVisible(false, null)
                }}
                title="Send"
              />
            </View>
          </View>
        </Modal>

        <FlatList
          data={this.state.data.items}
          renderItem={({ item }) => (
            <WorkorderItem
              item={item}
              onPress={this.onPressLoc.bind(this, item.item.url)}
              onPress2={this.setModalVisible.bind(this)}
            />
          )}
        />
      </View>
    )
  }
}

class WorkorderItem extends React.Component {
  constructor() {
    super()
    this.state = {
      done: false
    }
  }

  render() {
    const a = this.state.done ? styles.listItemDone : styles.listItem
    return (
      <View style={a}>
        <View style={styles.test}>
          <TouchableHighlight
            underlayColor="gray"
            onPress={() => this.props.onPress2(true, this.props.item.item.name)}
          >
            <View style={styles.icon}>
              <MaterialIcons name="warning" size={24} color="#AAA" />
            </View>
          </TouchableHighlight>
          <Text
            style={styles.body}
            onPress={() => this.setState({ done: !this.state.done })}
          >
            {this.props.item.qty} x {this.props.item.item.name}
          </Text>
        </View>

        <TouchableHighlight underlayColor="gray" onPress={this.props.onPress}>
          <Text style={styles.listText}>{this.props.item.item.location}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
