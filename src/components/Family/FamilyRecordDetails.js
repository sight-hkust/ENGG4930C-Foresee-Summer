import React, { useEffect, useState } from "react";
import { LinearGradientBackground } from "../Utils/LinearGradientBackground";
import { connect } from "react-redux";
import { getRecordsUpdate } from "../../reducers/records";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeight, ScreenWidth } from "../../../constant/Constant";
import { RenderLineChart, DetailButton } from "../../../Screens/RecordsScreen";
import { Icon, Button } from "react-native-elements";
import { RenderContent } from "../../../Screens/RenderDescription";
const Open = require("../../../assets/images/open.png");
const Close = require("../../../assets/images/close.png");
const BackArrow = require("../../../assets/images/BackArrow.png");
const NextArrow = require("../../../assets/images/NextArrow.png");
import { Modal, Portal, Provider, Dialog } from "react-native-paper";

const FamilyRecordDetails = ({
  navigation,
  route,
  recordStore,
  getRecordsHandler,
}) => {
  useEffect(() => {
    const { familyMembers } = route.params;
    console.log(familyMembers);
    const { uid, inactive } = familyMembers[0];
    setSelectedFamily(familyMembers[0]);
    getRecordsHandler(uid, inactive);
  }, []);
  useEffect(() => {
    const { dateList, records } = recordStore;
    if (dateList && records) {
      setDateList(dateList);
      setRecords(records);
      setSelectedDate(dateList[dateList.length - 1]);
      setIndex(dateList.length - 1);
    }
  }, [recordStore]);

  const { familyMembers } = route.params;
  const [selectedFamily, setSelectedFamily] = useState({});
  const [records, setRecords] = useState(null);
  const [refractive, setRefractive] = useState("0"); //0:myopia, 1:hyperopia
  const [dateList, setDateList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [index, setIndex] = useState(null);
  const [leftEyeSelected, setLeftEyeStatus] = useState(false);
  const [isFamilyListModalVisible, setFamilyListModalVisibility] = useState(
    false
  );



  const _selectFamily = (member) => {
    const { uid, inactive } = member;
    getRecordsHandler(uid, inactive);
    setSelectedFamily(member);
    _hideFamilyListModal();
  };
  const GetNext = () => {
    const length = dateList.length;
    const value = (index + 1) % length;
    setIndex(value);
    setSelectedDate(dateList[value]);
  };

  const GetBack = () => {
    if (index == 0) {
      const length = dateList.length - 1;
      setIndex(length);
      setSelectedDate[dateList[length]];
    } else {
      const value = index;
      setIndex(value - 1);
      setSelectedDate(dateList[value - 1]);
    }
  };

  return (
    <>
      <LinearGradientBackground
        colors={["#1872a7", "#5a74d1", "#a676ff"]}
        start={[0, 0.9]}
        end={[1, 0.1]}
        locations={[0, 0.5, 1]}
      >
        <SafeAreaView
          style={{
            paddingTop: "24%",
            marginHorizontal: ScreenWidth * 0.02,
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={_showFamilyList}>
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 4,
                    paddingBottom: 4,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 28, color: "#3CA1B7" }}
                    adjustsFontSizeToFit={true}
                  >
                    {selectedFamily.lastName + selectedFamily.firstName}
                  </Text>
                  <View
                    style={{
                      marginLeft: ScreenWidth * 0.01,
                      alignSelf: "center",
                    }}
                  >
                    <Icon
                      name="caretdown"
                      type="antdesign"
                      color="#3CA1B7"
                      size={ScreenHeight * 0.02}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "900",
                  color: "#FFFFFF",
                  textAlignVertical: "center",
                }}
                adjustsFontSizeToFit={true}
              >
                {" 的"}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "900",
                color: "#FFFFFF",
                textAlign: "right",
              }}
              adjustsFontSizeToFit={true}
            >
              {refractive == "0" ? "近視" : refractive == "1" ? "遠視" : "散光"}
              度數趨勢
            </Text>
          </View>
          <View style={styles.refractiveMenu}>
            <TouchableOpacity onPress={() => setRefractive("1")}>
              <Text
                style={
                  refractive == "1"
                    ? styles.selectedMenuText
                    : styles.unselectedMenuText
                }
              >
                遠視
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRefractive("0")}>
              <Text
                style={
                  refractive == "0"
                    ? styles.selectedMenuText
                    : styles.unselectedMenuText
                }
              >
                近視
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRefractive("2")}>
              <Text
                style={
                  refractive == "2"
                    ? styles.selectedMenuText
                    : styles.unselectedMenuText
                }
              >
                散光
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRefractive("3")}>
              <Text
                style={
                  refractive == "3"
                    ? styles.selectedMenuText
                    : styles.unselectedMenuText
                }
              >
                視力
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linechart}>
            <RenderLineChart
              dataArr={records}
              dateArr={dateList}
              refractive={refractive}
              isLeft={leftEyeSelected}
              selectedIndex={index}
            />
          </View>

          {records && (
            <View style={styles.contentContainer}>
              <View style={styles.eyesButton}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setLeftEyeStatus(true)}
                >
                  <Image source={leftEyeSelected ? Open : Close} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setLeftEyeStatus(false)}
                  style={{ paddingLeft: 40 }}
                >
                  <Image source={leftEyeSelected ? Close : Open} />
                </TouchableOpacity>
              </View>

              <View style={styles.datesButton}>
                <TouchableOpacity onPress={GetBack}>
                  <Image source={BackArrow} />
                </TouchableOpacity>
                <Text style={styles.dateText}>{selectedDate}</Text>
                <TouchableOpacity onPress={GetNext}>
                  <Image source={NextArrow} />
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                <RenderContent
                  isLeft={leftEyeSelected}
                  ddlValue={refractive}
                  data={records}
                  selectedDate={selectedDate}
                  index={index}
                  dateArr={dateList}
                />
              </View>
            </View>
          )}
          <View style={styles.buttonGroup}>
            {records && (
              <DetailButton
                data={records}
                selectedDate={selectedDate}
                isAdj={false}
              />
            )}
            <Button
              icon={<Icon name="add" size={25} color="#2D9CDB" />}
              onPress={() => {
                navigation.navigate("AddRecordScreen", {
                  isProfessional: false,
                  professional_id: -1,
                  patient_id: selectedFamily.uid,
                  refractive: refractive,
                  inactive: selectedFamily.inactive,
                });
              }}
              buttonStyle={{
                backgroundColor: "white",
                width: 48,
                height: 48,
                borderRadius: 24,
                paddingLeft: 0,
                paddingRight: 0,
              }}
            />
            {records && (
              <DetailButton
                data={records}
                selectedDate={selectedDate}
                isAdj={true}
              />
            )}
          </View>
        </SafeAreaView>
      </LinearGradientBackground>
      <Provider>
        <Portal>
          <Modal
            visible={isFamilyListModalVisible}
            onDismiss={_hideFamilyListModal}
          >
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: ScreenWidth * 0.12,
                minHeight: ScreenHeight * 0.2,
                elevation: 3,
                borderRadius: ScreenWidth * 0.02,
                padding: ScreenWidth * 0.03,
              }}
            >
              <Text style={{ fontSize: 23 }}>選擇家人紀錄</Text>
              <FlatList
                /* ItemSeparatorComponent={({ highlighted }) => (
                  <View
                    style={[
                      {
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#00000070",
                      },
                      highlighted && { marginLeft: 0 },
                    ]}
                  />
                )} */
                data={familyMembers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => _selectFamily(item)}>
                    <View
                      style={{
                        width: "100%",
                        paddingVertical: ScreenHeight * 0.02,
                      }}
                    >
                      <Text style={{ fontSize: 20, textAlign: "center" }}>
                        {item.surName && item.givenName
                          ? item.surName + item.givenName
                          : item.lastName + item.firstName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>
        </Portal>
      </Provider>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getRecordsHandler: (uid, inactive) =>
      dispatch(getRecordsUpdate(uid, inactive)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyRecordDetails);

const styles = StyleSheet.create({
  refractiveMenu: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectedMenuText: {
    fontSize: 18,
    color: "#3CA1B7",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  unselectedMenuText: {
    fontSize: 18,
    color: "#FFFFFF",
    paddingLeft: 1,
    paddingRight: 1,
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    borderBottomWidth: 1.5,
    borderColor: "#B8CAE4",
  },
  eyesButton: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  datesButton: {
    alignSelf: "center",
    flexDirection: "row",
    paddingBottom: 2,
  },
  dateText: {
    color: "#2D9CDB",
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: ScreenHeight * 0.5,
  },
  contentContainer: {
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    height: ScreenHeight / 3.2,
    width: ScreenWidth / 1.25,
    borderRadius: 20,
    marginTop: ScreenHeight / 4 + 5,
    paddingBottom: 10,
  },
});
