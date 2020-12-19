import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from "react-native";
import { Icon, ListItem, SearchBar } from "react-native-elements";

import { ScreenWidth, ScreenHeight } from "../../../constant/Constant";
import { auth } from "../../config/config";

import MenuScreen from "../../../Utils/MenuScreen";
import { connect } from "react-redux";
import { watchPatientListUpdate } from "../../reducers/patientList";
import { displayName } from "../../utils/displayName";

import i18n from 'i18n-js';
import {useLocalization} from "../../strings/Strings";

/**
 * For Local Search.
 */
function SearchPatient(key, referenceList) {
  const targetList = [];
  referenceList.map((u, i) => {
    //let name = u.lastName + u.firstName;
    let name = displayName(u);
    if (name != undefined && name.includes(key)) {
      targetList.push(u);
    }
  });
  return targetList;
}

const ProfMainMenu = ({ route, navigation, patientListStore }) => {
  useLocalization();
  //const [originalList, setOriginalList] = useState([]);

  const [searchContent, setSearchContent] = useState("");
  const [searchingStatus, setSearchingStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { patientList } = patientListStore;
  const [showList, setShowList] = useState([]);

  useEffect(() => {
    if (patientList !== null && patientList !== undefined && searchContent === "") {
      setIsLoading(false);
      setShowList(patientList);
    }
  });

  return (
    <MenuScreen>
      <View style={styles.container}>
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#00acc1" />
            <Text style={styles.loadingText}>Loading . . . </Text>
          </View>
        ) : (
          <View>
            <View style={{ marginTop: ScreenHeight * 0.078, height: ScreenHeight * 0.078, width: ScreenWidth, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <SearchBar
                placeholder={i18n.t('profMain1')}
                onChangeText={(e) => {
                  setSearchContent(e);
                  setSearchingStatus(true);
                  setShowList(SearchPatient(e, patientList));
                }}
                value={searchContent}
                inputStyle={{ color: "black" }}
                round
                lightTheme
                placeholderTextColor="white"
                searchIcon={{ color: "white" }}
                containerStyle={{ backgroundColor: "transparent", width: ScreenWidth * 0.8, borderBottomColor: "transparent", borderTopColor: "transparent" }}
                inputContainerStyle={{ backgroundColor: "#A6ACE9", height: 35 }}
              />
              <Icon name="qrcode-scan" type="material-community" color="white" size={30} onPress={() => navigation.navigate("QR Scan")} />
            </View>
            <ScrollView style={{ height: ScreenHeight * 0.6, width: ScreenWidth * 0.9, backgroundColor: "transparent", alignSelf: "center" }}>
              {showList.length == 0 ? (
                <Text style={{ textAlign: "center", color: "white", fontSize: 30 }}>{i18n.t('profMain2')}</Text>
              ) : (
                showList.map((patient, index) => {
                  const key = patient.uid;
                  return (
                    <View key={index}>
                      <ListItem
                        title={displayName(patient)}
                        subtitle={"test".lastReserveDate}
                        rightIcon={
                          <>
                            <Icon
                              key={index}
                              size={25}
                              name="plus"
                              type="feather"
                              color="#80A4EB"
                              containerStyle={{ backgroundColor: "white", borderRadius: 5, paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3 }}
                              onPress={() => {
                                navigation.navigate("AddRecordScreen", {
                                  //will navigate to ProfAddRecord
                                  isProfessional: true,
                                  professional_id: auth.currentUser.uid,
                                  patient_id: key,
                                });
                              }}
                            />
                          </>
                        }
                        containerStyle={{ backgroundColor: "transparent" }}
                        titleStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                        subtitleStyle={{ color: "white", fontSize: 13 }}
                        onPress={() => {
                          navigation.navigate("Patient Record", {
                            key: key,
                          });
                        }}
                      />
                      <View style={{ height: 1, width: ScreenWidth * 0.825, borderColor: "#E1EDFF", borderWidth: 1, alignSelf: "center", borderRadius: 10 }} />
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </MenuScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  loadingText: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 30,
    color: "white",
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    paddingBottom: 40,
  },
  searchButton: {
    alignSelf: "center",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    width: "50%",
    height: 50,
    backgroundColor: "#2D89DD",
    justifyContent: "center",
  },
  labelText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  listItemTitle: {
    color: "white",
  },
});

const mapStateToProps = (state) => {
  return {
    patientListStore: state.patientList,
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(watchPatientListUpdate());
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfMainMenu);
