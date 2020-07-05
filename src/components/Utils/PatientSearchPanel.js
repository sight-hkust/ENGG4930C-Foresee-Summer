import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { watchPatientListUpdate } from "../../reducers/patientList";
import { Searchbar, Card } from "react-native-paper";
import {
  ScreenHeight,
  FontScale,
  ScreenWidth,
  Scale,
} from "../../../constant/Constant";
import { TouchableOpacity } from "react-native-gesture-handler";

const PatientSearchPanel = ({
  patientListStore,
  setFieldValue,
  hideFamilySearchDialog,
}) => {
  const { patientList } = patientListStore;
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const _handleSelection = (person) => {
    setFieldValue("parent", {
      name: person.lastName + person.firstName,
      uid: person.uid,
    });
    hideFamilySearchDialog();
  };

  const searchFilterFunction = (keyword) => {
    const newResult = patientList.filter((item) => {
      const { firstName, lastName, surName, givenName } = item;
      if (keyword === "") return null;
      return (
        (firstName &&
          (keyword.includes(firstName) || firstName.includes(keyword))) ||
        (lastName &&
          (keyword.includes(lastName) || lastName.includes(keyword))) ||
        (surName && (keyword.includes(surName) || surName.includes(keyword))) ||
        (givenName && keyword.includes(givenName))
      );
    });
    setResult(newResult);
    setSearch(keyword);
  };

  return (
    <View>
      <Searchbar
        placeholder={"搜尋病人家屬"}
        value={search}
        onChangeText={(text) => searchFilterFunction(text)}
        clearTextOnFocus
        onIconPress={() => searchFilterFunction("")}
      />
      {result.length > 0 && (
        <FlatList
          style={{
            paddingTop: ScreenHeight * 0.01,
            borderWidth: 0.21,
            borderRadius: Scale * 1,
          }}
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={[
                { borderBottomWidth: 0.37, borderBottomColor: "#00000070" },
                highlighted && { marginLeft: 0 },
              ]}
            />
          )}
          data={result}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                _handleSelection(item);
              }}
            >
              <View style={{ marginVertical: ScreenHeight * 0.01 }}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlignVertical: "center",
                    textAlign: "center",
                  }}
                >
                  {item.lastName + item.firstName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    patientListStore: state.patientList,
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(watchPatientListUpdate());
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientSearchPanel);
