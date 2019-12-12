import { StyleSheet } from "react-native"
import Constants from "expo-constants"

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
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16
  },
  listItemDone: {
    flex: 1,
    borderBottomColor: "#F0F0F0",
    borderTopColor: "#fff",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#bdffdb"
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
    alignItems: "flex-start",
    paddingRight: 16
  },
  body: {
    color: "#07051DCB",
    marginLeft: 8,
    fontSize: 16,
    maxWidth: 200
  },
  bodyBold: {
    alignSelf: "center",
    color: "#07051D65",
    fontWeight: "700",
    marginLeft: 8
  },
  label: {
    fontSize: 12,
    color: "#07051D65"
  },
  test: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  icons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 4
  },
  name: {
    maxWidth: 200
  },
  workorderInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 8
  }
})

/*const styles = StyleSheet.create({
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
*/

export { styles }
