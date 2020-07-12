import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { Component } from "react";
import { database } from "../../config/config";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScreenWidth,
  ScreenHeight,
  FontScale,
} from "../../../constant/Constant";
const thumbNail = require("../../../assets/images/interview.png");
const eyeglasses = require("../../../assets/images/eyeglasses.jpg");
const Setting = require("../../../assets/images/setting.png");

export default class GetEducated extends Component {
  static navigationOptions = {
    title: (navigation) => `Chat with `,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      topArticle: "",
    };
  }

  componentDidMount() {
    database
      .ref("contents/articles")
      .orderByChild("article_id")
      .on("value", (snapshot) => {
        var temp = [];
        //console.log(snapshot.toJSON());
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          console.log(childData);
          temp.push(childData);
        });
        this.setState({ topArticle: temp[temp.length - 1] });
        temp.pop();
        temp.reverse();
        this.setState({ data: temp });
      });
  }

  render() {
    const pressHandler = () => {
      const id = this.state.topArticle.article_id;
      this.props.navigation.navigate("ArticleDetailScreen", { article_id: id });
    };
    return (
      <View
        style={{
          backgroundColor: "#E1EDFF",
          height: "100%",
          paddingBottom: ScreenHeight * 0.1,
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
              <Image
                source={{ uri: this.state.topArticle.image }}
                style={GetEducatedScreen.topArticleImage}
              />
              <Text style={GetEducatedScreen.topArticleText}>
                {this.state.topArticle.subject}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={GetEducatedScreen.articleListContainer}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <Item item={item} navigation={this.props.navigation} />
              )}
              keyExtractor={(item) => item.article_id}
            />
          </View>
        </View>
      </View>
    );
  }
}

function Item({ item, navigation }) {
  //console.log(item.article_id)
  const id = item.article_id;
  const pressHandler = () => {
    navigation.navigate("ArticleDetailScreen", { article_id: id });
  };
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={GetEducatedScreen.articleItem}>
        <Image
          source={{ uri: item.image }}
          style={GetEducatedScreen.itemImage}
        />
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
    marginTop: 15,
    flex: 1,
  },
  articleItem: {
    flexDirection: "row",
    marginVertical: 15,
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
