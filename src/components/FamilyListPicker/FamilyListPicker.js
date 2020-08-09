import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Portal, Modal, Provider } from "react-native-paper";
import { ScreenWidth, ScreenHeight } from "../../../constant/Constant";
import { connect } from "react-redux";
import { watchUserInfoUpdate } from "../../reducers/user";
import {
  watchFamilyMembersUpdate,
  updateFamilyMembers,
} from "../../reducers/familyMembers";
import { displayName } from "../../utils/displayName";
import { Icon } from "react-native-elements";

const FamilyListPicker = ({
  containerStyle,
  textStyle,
  onSelectionUpdate,
  userStore,
  familyMembers,
}) => {
  const { user } = userStore;
  const [isFamilyListModalVisible, setFamilyListModalVisibility] = useState(
    false
  );
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);

  /* useEffect(() => {
    setSelectedFamilyMember(user);
  }, [user]); */

  useEffect(() => {
    if (selectedFamilyMember == null && familyMembers) {
      setSelectedFamilyMember(familyMembers[0]);
    }
  }, [familyMembers]);

  const _showFamilyListModal = () => {
    setFamilyListModalVisibility(true);
  };
  const _hideFamilyListModal = () => {
    setFamilyListModalVisibility(false);
  };
  const _selectFamily = (member) => {
    setSelectedFamilyMember(member);
    onSelectionUpdate(member);
    _hideFamilyListModal();
  };

  return (
    <>
      <TouchableOpacity
        style={[
          {
            width: "110%",
            flexDirection: "row",
          },
          containerStyle,
        ]}
        onPress={_showFamilyListModal}
      >
        {selectedFamilyMember && (
          <>
            <Text
              style={[
                selectedFamilyMember.lastName != ""
                  ? FamilyListPickerStyle.userNameChinese
                  : FamilyListPickerStyle.userNameEnglish,
                textStyle,
              ]}
            >
              {displayName(selectedFamilyMember)}
            </Text>
            <View
              style={{
                marginLeft: ScreenWidth * 0.02,
                justifyContent: "center",
              }}
            >
              <Icon
                name="caretdown"
                type="antdesign"
                size={ScreenWidth * 0.05}
                color={textStyle ? textStyle.color : "#FFFFFF"}
              />
            </View>
          </>
        )}
      </TouchableOpacity>

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
            <Text style={{ fontSize: 23 }}>選擇家庭成員</Text>
            <FlatList
              data={familyMembers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => _selectFamily(item)}>
                    <View
                      style={{
                        width: "100%",
                        paddingVertical: ScreenHeight * 0.02,
                      }}
                    >
                      <Text style={{ fontSize: 20, textAlign: "center" }}>
                        {displayName(item)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const mapStateToProps = (state) => {
  return { userStore: state.user, familyMembers: state.familyMembers };
};

const mapDispatchToProps = (dispatch) => {
  watchUserInfoUpdate(dispatch);
  watchFamilyMembersUpdate(dispatch);
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilyListPicker);

const FamilyListPickerStyle = StyleSheet.create({
  userNameChinese: {
    textAlignVertical: "center",
    fontSize: 46,
    fontWeight: "bold",
    color: "white",
  },
  userNameEnglish: {
    textAlignVertical: "center",
    fontSize: 33,
    fontWeight: "bold",
    color: "white",
  },
});
