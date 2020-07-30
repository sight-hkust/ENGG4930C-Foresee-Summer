import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import { ListItem, Input, Overlay, Icon, Button } from "react-native-elements";
import Collapsible from "react-native-collapsible";

import { ScreenWidth, ScreenHeight } from "../../../constant/Constant";
import MenuScreen from "../../../Utils/MenuScreen";
import { auth, database } from "../../config/config";
import { RoundButton } from "../../../Utils/RoundButton";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Snackbar, Portal } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { watchUserInfoUpdate } from "../../reducers/user";
import moment from "moment";

export default function Setting({ route, navigation }) {
  const [selectedLabel, setSelectedLabel] = useState();

  return (
    <MenuScreen
      backgroundContainer={
        !route.params?.isProfessional
          ? {
              height: ScreenHeight,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }
          : {}
      }
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ListItem
          title={"深色主題"}
          containerStyle={styles.listItem}
          titleStyle={styles.title}
          rightIcon={<ThemeSwitch />}
        />
        <ListItem
          Component={TouchableOpacity}
          title={"程式教學"}
          containerStyle={styles.listItem}
          titleStyle={styles.title}
          chevron={{ size: 30 }}
          onPress={() => navigation.navigate("Tutorial")}
        />
        <ListItem
          Component={TouchableOpacity}
          title={"聯絡我們"}
          containerStyle={styles.listItem}
          titleStyle={styles.title}
          chevron={{ size: 30 }}
          onPress={() =>
            setSelectedLabel(selectedLabel == "contact-us" ? "" : "contact-us")
          }
        />
        <Collapsible collapsed={selectedLabel != "contact-us"}>
          <ContactUs />
        </Collapsible>
        <ListItem
          Component={TouchableOpacity}
          title={"意見反饋"}
          containerStyle={styles.listItem}
          titleStyle={styles.title}
          chevron={{ size: 30 }}
          onPress={() =>
            setSelectedLabel(selectedLabel == "feedback" ? "" : "feedback")
          }
        />
        <Collapsible collapsed={selectedLabel != "feedback"}>
          <Feedback />
        </Collapsible>
        <ListItem
          Component={TouchableOpacity}
          title={"權限"}
          containerStyle={styles.listItem}
          titleStyle={styles.title}
          chevron={{ size: 30 }}
          onPress={() =>
            setSelectedLabel(selectedLabel == "permission" ? "" : "permission")
          }
        />
        <Collapsible collapsed={selectedLabel != "permission"}>
          <PermissionSetting />
        </Collapsible>
        <ListItem
          Component={TouchableOpacity}
          title={"條款及細則"}
          containerStyle={styles.listItem}
          titleStyle={{ fontSize: 20, color: "white" }}
          chevron={{ size: 30 }}
          onPress={() => navigation.navigate("Terms")}
        />
        <ListItem
          Component={TouchableOpacity}
          title={"私隱政策"}
          containerStyle={styles.listItem}
          titleStyle={{ fontSize: 20, color: "white" }}
          chevron={{ size: 30 }}
          onPress={() => navigation.navigate("Policy")}
        />
        <ListItem
          Component={TouchableOpacity}
          title={"登出"}
          containerStyle={styles.listItem}
          titleStyle={styles.title}
          chevron={{ size: 30, color: "#E1EDFF" }}
          onPress={() => {
            auth.signOut();
          }}
        />
      </ScrollView>
    </MenuScreen>
  );
}

const ThemeSwitch = () => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const toggleSwitch = () => setIsLightTheme((previousState) => !previousState);

  return (
    <>
      <Switch
        trackColor={{ false: "#767577", true: "#9AFF98" }}
        thumbColor={isLightTheme ? "white" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isLightTheme}
      />
    </>
  );
};

export const ContactUs = ({ containerStyle, ...props }) => {
  return (
    <View
      style={[
        {
          width: "90%",
          alignSelf: "center",
          padding: 10,
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: 4,
          height: "100%",
        },
        containerStyle,
      ]}
    >
      <Grid>
        <Row style={styles.contactUsRow}>
          <Col style={styles.contactUsLeftCol}>
            <Icon type="entypo" name="instagram" color="pink" />
            <Text style={{ ...styles.contactUsTitle, ...props.titleColor }}>
              {" "}
              Instagram
            </Text>
          </Col>
          <Col style={styles.contactUsRightCol}>
            <Text style={{ ...styles.contactUsTitle, ...props.titleColor }}>
              @foresee_offical
            </Text>
          </Col>
        </Row>

        <Row style={styles.contactUsRow}>
          <Col style={styles.contactUsLeftCol}>
            <Icon type="entypo" name="facebook" color="#33D1FF" />
            <Text style={{ ...styles.contactUsTitle, ...props.titleColor }}>
              {" "}
              Facebook
            </Text>
          </Col>
          <Col style={styles.contactUsRightCol}>
            <Text style={{ ...styles.contactUsTitle, ...props.titleColor }}>
              @ForeSee HQ
            </Text>
          </Col>
        </Row>

        <Row style={styles.contactUsRow}>
          <Col style={styles.contactUsLeftCol}>
            <Icon type="fontisto" name="whatsapp" color="#3FF961" />
            <Text style={{ ...styles.contactUsTitle, ...props.titleColor }}>
              {" "}
              Whatsapp
            </Text>
          </Col>
          <Col style={styles.contactUsRightCol}>
            <Text style={{ ...styles.contactUsTitle, ...props.titleColor }}>
              {" "}
              +85230624700
            </Text>
          </Col>
        </Row>

        <Row style={styles.contactUsRow}>
          <Col style={styles.contactUsLeftCol}>
            <Icon type="material-icon" name="email" color="#F0886F" />
            <Text style={{ ...styles.contactUsTitle, ...props.titleColor }}>
              {" "}
              Email
            </Text>
          </Col>
          <Col style={styles.contactUsRightCol}>
            <Text style={{ ...styles.contactUsTitle, ...props.titleColor }}>
              sight.foresee@gmail.com
            </Text>
          </Col>
        </Row>
      </Grid>
    </View>
  );
};

export const Feedback = ({ contentConatinerStyle, ...props }) => {
  const [feedback, setFeedback] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(watchUserInfoUpdate());
  }, []);

  let timer = 0;

  const handleFeedbackSubmission = () => {
    const datetime = moment();
    const date = datetime.format("YYYYMMDD");
    const timestamp = datetime.format("YYYYMMDDHHmmss");
    if (feedback == "") {
      return;
    } else {
      database.ref("/feedbacks/" + date).push({
        content: feedback,
        userInfo: {
          email: user.email,
          surName: user.lastName ? user.lastName : user.surName,
        },
      });

      setFeedback("");
      setAlertSuccess(true);
      let showSuccess = setInterval(() => {
        timer += 1;
        if (timer >= 2) {
          clearInterval(showSuccess);
          setAlertSuccess(false);
        }
      }, 3000);
    }
  };

  return (
    <View style={{ width: "90%", alignSelf: "center", padding: 10 }}>
      <Input
        onChangeText={(e) => setFeedback(e)}
        maxLength={200}
        multiline={true}
        value={feedback}
        placeholder="歡迎留下意見"
        inputContainerStyle={[styles.contentContainer, contentConatinerStyle]}
        inputStyle={{ ...styles.textAreaContainer, ...props.contentFontColor }}
        rightIcon={
          <Text
            style={{ ...styles.wordCounter, ...props.wordCounterFontColor }}
          >
            {feedback.length}/200
          </Text>
        }
        rightIconContainerStyle={{
          position: "absolute",
          bottom: 0,
          right: 15,
        }}
      />
      <RoundButton
        onPress={() => {
          handleFeedbackSubmission();
        }}
        title="提交"
        buttonStyle={{ width: 96, ...props.buttonColor }}
        textStyle={{ color: "#3CA1B7", ...props.buttonTitle }}
      />
      <Snackbar
        visible={alertSuccess}
        onDismiss={() => setAlertSuccess(false)}
        action={{
          label: "確認",
          onPress: () => {
            setAlertSuccess(false);
          },
        }}
      >
        你的回應已被提交，感謝你的寶貴意見！
      </Snackbar>
    </View>
  );
};

const PermissionSetting = () => {
  const [allowView, setAllowView] = useState(false);
  const toggleAllowViewSwitch = () =>
    setAllowView((previousState) => !previousState);

  const [allowSearch, setAllowSearch] = useState(false);
  const toggleAllowSearchSwitch = () =>
    setAllowSearch((previousState) => !previousState);

  return (
    <View
      style={{
        width: "90%",
        alignSelf: "center",
        padding: 10,
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 4,
      }}
    >
      <Grid>
        <Row style={styles.contactUsRow}>
          <Col>
            <Text style={styles.contactUsTitle}> 允許查看紀錄 </Text>
          </Col>
          <Col>
            <Switch
              trackColor={{ false: "#767577", true: "#9AFF98" }}
              thumbColor={allowView ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAllowViewSwitch}
              value={allowView}
            />
          </Col>
        </Row>

        <Row style={styles.contactUsRow}>
          <Col>
            <Text style={styles.contactUsTitle}> 開啟通知 </Text>
          </Col>
          <Col>
            <Switch
              trackColor={{ false: "#767577", true: "#9AFF98" }}
              thumbColor={allowSearch ? "white" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleAllowSearchSwitch}
              value={allowSearch}
            />
          </Col>
        </Row>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth * 0.8,
    height: ScreenHeight * 0.75,
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  listItem: {
    backgroundColor: "transparent",
  },
  title: {
    color: "#E1EDFF",
    fontSize: 20,
  },
  label: {
    color: "#E1EDFF",
    fontSize: 20,
    marginBottom: 25,
  },
  contentContainer: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#E1EDFF",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 230,
  },
  textAreaContainer: {
    color: "white",
    height: 230,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  wordCounter: {
    color: "#B8CAE4",
    fontSize: 16,
    fontWeight: "bold",
  },
  contactUsRow: {
    marginBottom: 10,
    marginTop: 10,
  },
  contactUsLeftCol: {
    flexDirection: "row",
    justifyContent: "center",
  },
  contactUsRightCol: {
    alignItems: "center",
  },
  contactUsTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
