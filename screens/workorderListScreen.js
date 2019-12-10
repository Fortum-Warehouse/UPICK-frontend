import React from "react"
import { StyleSheet, Text, View, ActivityIndicator } from "react-native"
import {
  FlatList,
  TouchableHighlight,
  TextInput
} from "react-native-gesture-handler"
import Constants from "expo-constants"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default class WorkorderListScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      data: null,
      isLoaded: false,
      visibleData: null
    }
  }

  onPress(id) {
    this.props.navigation.navigate("Workorder", { id })
  }

  componentDidMount() {
    fetch("https://upickup.herokuapp.com/workorders")
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          isLoaded: true,
          visibleData: res
        })
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
        <TextInput
          onChangeText={text => {
            this.setState({
              visibleData: this.state.data.filter(workorder => {
                return workorder.id.includes(text.toLowerCase())
              })
            })
          }}
        />
        <FlatList
          data={this.state.visibleData}
          renderItem={({ item }) => (
            <WorkorderListItem
              workorder={item}
              onPress={this.onPress.bind(this, item.id)}
            />
          )}
        />
      </View>
    )
  }
}

class WorkorderListItem extends React.Component {
  render() {
    return (
      <View style={styles.listItem}>
        <View style={styles.workorderInfo}>
          <Text style={styles.listItemLabel}>Workorder</Text>
          <Text style={styles.listText}>{`${this.props.workorder.id}`}</Text>
        </View>
        <TouchableHighlight underlayColor="E3E3E3" onPress={this.props.onPress}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="dropbox"
              size={24}
            />
            <Text
              style={styles.itemCount}
            >{`${this.props.workorder.items.length} items`}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight
  },
  listItem: {
    flex: 1,
    borderBottomColor: "#F0F0F0",
    borderTopColor: "#fff",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 16
  },
  listText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4
  },
  iconContainer: {
    flex: 1,
    width: 96,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
  itemCount: {
    alignSelf: "center",
    color: "#07051D65",
    fontWeight: "700",
    marginLeft: 8
  },
  listItemLabel: {
    fontSize: 12,
    color: "#07051D65"
  },
  workorderInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 8
  }
})
