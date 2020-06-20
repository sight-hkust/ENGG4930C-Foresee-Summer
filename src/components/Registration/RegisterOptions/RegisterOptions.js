import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { Component } from 'react';
import Logo from "../../../../Utils/Logo";
import { styles } from "./styles";
import { Button } from 'react-native-elements';
import { ScreenHeight } from '../../../../constant/Constant';
import { LinearGradientBackground } from '../../../../Utils/LinearGradientBackground';

class RegisterOptions extends Component {
  render() {
    return (
      <LinearGradientBackground>
        <View style={styles.content}>
          <Logo />
          <View style={styles.optionsContainer}>
            <Text style={styles.title}>你的角色是什麼？</Text>
            <TouchableOpacity onPress={() =>
              this.props.navigation.navigate('Register', {
                isProfessional: true,
              })}>
              <View style={[styles.button, { marginTop: ScreenHeight * 0.06 }]}>
                <Text style={styles.buttonTitle}>
                  眼科專業人員
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
              this.props.navigation.navigate('Register', {
                isProfessional: false,
              })}>
              <View style={[styles.button]}>
                <Text style={styles.buttonTitle}>
                  普通用戶
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradientBackground>
    );
  }
}


export default RegisterOptions;
