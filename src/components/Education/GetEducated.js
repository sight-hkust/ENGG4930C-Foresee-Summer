import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, Dimensions } from "react-native";
import React, { Component } from "react";
import { database } from "../../config/config";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenWidth, ScreenHeight, FontScale } from "../../../constant/Constant";
import FABView from "../../../Utils/FAB";
import MenuScreen from "../../../Utils/MenuScreen";

function rand(x) {
  return Math.floor(Math.random() * x);
}

export default class GetEducated extends Component {
  static navigationOptions = {
    title: (navigation) => `Chat with `,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      topArticle: "",
      uid_list: [],
    };
  }

  componentDidMount() {
    database
      .ref("contents/articles")
      .orderByChild("date")
      .on("value", (snapshot) => {
        console.log("Database updated");
        var temp = [];
        var temp_uid_list = [];
        snapshot.forEach((childSnapshot) => {
          var item = childSnapshot.val();
          var key = { _uid: childSnapshot.key };
          var childData = { ...item, ...key };
          temp.push(childData);
          temp_uid_list.push(childSnapshot.key);
        });
        if (JSON.stringify(this.state.uid_list) != JSON.stringify(temp_uid_list)) {
          console.log(temp_uid_list);
          console.log("App refreshed");
          temp.reverse();
          let x = rand(temp.length);
          console.log("topArticle", x, temp[x].subject);
          this.setState({ topArticle: temp[x], data: temp, uid_list: temp_uid_list });
        } else console.log("NOT refreshed");
      });
  }

  render() {
    const pressHandler = () => {
      const id = this.state.topArticle._uid;
      this.props.navigation.navigate("ArticleDetailScreen", { article_id: id });
    };
    return (
      <>
        <MenuScreen>
          <View
            style={{
              backgroundColor: "white",
              height: "100%",
            }}
          >
            <View style={GetEducatedScreen.headerContainer}>
              <LinearGradient
                colors={["#1872a7", "#5a74d1", "#a676ff"]}
                start={[0, 0.9]}
                end={[1, 0.1]}
                locations={[0, 0.5, 1]}
                style={{
                  height: ScreenHeight,
                }}
              ></LinearGradient>
            </View>
            <View style={{ flex: 1 }}>
              <View style={GetEducatedScreen.topArticleContainer}>
                <TouchableOpacity onPress={pressHandler}>
                  <Image source={{ uri: this.state.topArticle.image }} style={GetEducatedScreen.topArticleImage} />
                  <Text style={GetEducatedScreen.topArticleText}>{this.state.topArticle.subject}</Text>
                </TouchableOpacity>
              </View>

              <View style={GetEducatedScreen.articleListContainer}>
                <FlatList data={this.state.data} renderItem={({ item }) => <Item item={item} navigation={this.props.navigation} />} keyExtractor={(item) => item._uid} />
              </View>
            </View>
          </View>
          <FABView />
        </MenuScreen>
      </>
    );
  }
}

function Item({ item, navigation }) {
  //console.log(item.key);
  const id = item._uid;
  const pressHandler = () => navigation.navigate("ArticleDetailScreen", { article_id: id });
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={GetEducatedScreen.articleItem}>
        <Image source={{ uri: item.image }} style={GetEducatedScreen.itemImage} />
        <View style={{ flex: 1 }}>
          <Text style={GetEducatedScreen.articleSubject}>{item.subject}</Text>
          <Text style={GetEducatedScreen.articleDate}>{item.date}</Text>
          <Text style={GetEducatedScreen.articleAbstract}>{item.abstract}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const GetEducatedScreen = StyleSheet.create({
  header: {
    paddingTop: 40,
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  headerContainer: {
    overflow: "hidden",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    position: "absolute",
    height: 210,
    width: Dimensions.get("window").width,
  },
  topArticleContainer: {
    marginTop: 90,
  },
  articleListContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
    flex: 1,
  },
  articleItem: {
    flexDirection: "row",
    marginVertical: 10,
  },
  itemImage: {
    width: 85,
    height: 85,
    borderRadius: 10,
    marginRight: 20,
  },
  articleSubject: {
    flexWrap: "wrap",
    fontWeight: "bold",
    fontSize: 18,
    color: "#24559E",
  },
  articleDate: {
    fontSize: 12,
    color: "#1772A6",
    paddingBottom: 5,
    paddingTop: 2,
  },
  articleAbstract: {
    flexWrap: "wrap",
    fontSize: 14,
    color: "#2D9CDB",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#24559E",
  },
  topArticleImage: {
    width: ScreenWidth - 60,
    height: ScreenWidth * 0.6 - 36,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 14,
  },
  topArticleText: {
    position: "absolute",
    top: ScreenWidth * 0.6 - 86,
    paddingLeft: 20,
    paddingTop: 7,
    left: 30,
    width: ScreenWidth - 60,
    height: 50,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
