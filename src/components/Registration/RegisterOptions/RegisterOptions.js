import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { Component } from 'react';
<<<<<<< Updated upstream
import { LinearGradient } from 'expo-linear-gradient';
import Logo from "../../Logo/Logo";
=======
import Logo from "../../../../Utils/Logo";
>>>>>>> Stashed changes
import { styles } from "./styles";
import { Button } from 'react-native-elements';
import { ScreenHeight } from '../../../../constant/Constant';
import { LinearGradientBackground } from '../../../../Utils/LinearGradientBackground';

class RegisterOptions extends Component {
  render() {
    return (
<<<<<<< Updated upstream
      <SafeAreaView>
        <LinearGradient
          colors={['#2D9CDB', '#48B3BA', '#0ED984']}
          start={[0, 0.3]}
          end={[1, 1]}
          locations={[0.25, 0.5, 1]}
          style={{
            height: '100%',
          }}
        >
=======
      <LinearGradientBackground>
        <View style={styles.content}>
>>>>>>> Stashed changes
          <Logo />
          <View style={styles.optionsContainer}>
            <Text style={styles.title}>你的角色是什麼？</Text>
            <TouchableOpacity onPress={() =>
<<<<<<< Updated upstream
              this.props.navigation.navigate('Professional Register', {
=======
              this.props.navigation.navigate('Register', {
>>>>>>> Stashed changes
                isProfessional: true,
              })}>
              <View style={[styles.button, { marginTop: ScreenHeight * 0.06 }]}>
                <Text style={styles.buttonTitle}>
                  眼科專業人員
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
<<<<<<< Updated upstream
              this.props.navigation.navigate('Patient Register', {
=======
              this.props.navigation.navigate('Register', {
>>>>>>> Stashed changes
                isProfessional: false,
              })}>
              <View style={[styles.button]}>
                <Text style={styles.buttonTitle}>
                  普通用戶
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
<<<<<<< Updated upstream
        </LinearGradient>
      </SafeAreaView>
=======
        </View>
      </LinearGradientBackground>
>>>>>>> Stashed changes
    );
  }
}


export default RegisterOptions;
