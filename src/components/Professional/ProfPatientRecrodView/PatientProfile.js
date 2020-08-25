import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { displayName } from "../../../utils/displayName";
import moment from "moment";
import { ScreenHeight, ScreenWidth } from "../../../../constant/Constant";

export const PatientProfile = ({ info }) => {
  const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);

  console.log("info: ", info);

  const ListDisease = () => {
    if (info.disease) {
      const RecordsKey = info.records ? Object.keys(info.records) : [];
      const LatestRecordKey = info.records[RecordsKey[RecordsKey.length - 1]];
      const disease = LatestRecordKey.disease;
      var list = "";
      for (var key of disease) {
        list = list + key + " ";
      }
      return list;
    } else return "不適用";
  };

  return (
    <>
      <Text style={styles.patientName}>{displayName(info)}</Text>
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.profileText, styles.infoLabel]}>年齡:</Text>
          <Text style={[styles.profileText, styles.infoValues]}>{info.birthday ? Math.abs(moment(info.birthday).diff(moment(), "years")) : "不詳"}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.profileText, styles.infoLabel]}>職業:</Text>
          {info.job ? <Text style={[styles.profileText, styles.infoValues]}>{info.job}</Text> : <Text style={[styles.profileText, styles.infoValues]}>不詳</Text>}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.profileText, styles.infoLabel]}>家族病史:</Text>
          <Text style={[styles.profileText, styles.infoValues]}>{info.history ? info.history : "不適用"}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.profileText, styles.infoLabel]}>已知眼疾:</Text>
          <Text style={[styles.profileText, styles.infoValues]}>{ListDisease()}</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  patientName: {
    marginLeft: 20,
    fontSize: 31,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileText: {
    textAlign: "left",
    fontSize: 20,
    color: "white",
    marginBottom: ScreenHeight * 0.005,
  },
  infoLabel: {
    flex: 1,
  },
  infoValues: {
    paddingLeft: 20,
    textAlign: "left",
    flex: 1.7,
  },
});
