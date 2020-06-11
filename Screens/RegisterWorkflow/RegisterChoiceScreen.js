import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import AppColors from '../../Styles/colors';
import {Styles} from '../../Styles/styles';

export default class RegisterChoiceScreen extends Component {
  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={RegisterChoiceStyles.mainView}>
          <Text style={Styles.registerTitle}>What is your role?</Text>
          <View style={RegisterChoiceStyles.choicesContainer}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('RegisterName', {
                  isProfessional: true,
                })
              }
              style={RegisterChoiceStyles.choiceButton}>
              <Text style={RegisterChoiceStyles.choiceText}>
                Profesional (Doctor)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('RegisterName', {
                  isProfessional: false,
                })
              }
              style={RegisterChoiceStyles.choiceButton}>
              <Text style={RegisterChoiceStyles.choiceText}>Patient</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const RegisterChoiceStyles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  choiceButton: {
    width: '80%',
    height: 80,
    borderWidth: 4,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 50,
  },
  choicesContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  choiceText: {
    fontSize: 24,
    color: 'gray',
    fontWeight: 'bold',
  },
});
