import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from "../../Logo/Logo";
import { styles } from "./styles";
import { Button } from 'react-native-elements';
import { ScreenHeight } from '../../../../constant/Constant';

class RegisterOptions extends Component {
  render() {
    return (
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
          <Logo />
          <View style={styles.optionsContainer}>
            <Text style={styles.title}>你的角色是什麼？</Text>
            <Button
              type={"outline"}
              buttonStyle={[styles.button, { marginTop: ScreenHeight * 0.06 }]}
              titleStyle={styles.buttonTitle}
              title={'眼科專業人員'}
              onPress={() =>
                this.props.navigation.navigate('Professional Register', {
                  isProfessional: true,
                })}
            />
            <Button
              type={"outline"}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              title={'普通用戶'}
              onPress={
                () =>
                  this.props.navigation.navigate('Patient Register', {
                    isProfessional: false,
                  })
              }
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}


export default RegisterOptions;
