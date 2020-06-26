import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Image, Dimensions } from 'react-native';
import React, { Component } from 'react';
import AppColors from '../Styles/colors';
import { Styles } from '../Styles/styles';
import { Col, Row, Grid } from 'react-native-easy-grid';

import BottomModal from '../Utils/BottomModal';
import { LinearGradientBackground } from '../Utils/LinearGradientBackground';
import MenuScreen from '../Utils/MenuScreen';
import PostQuestionScreen from '../src/components/AskAnExpert/PostQuestionScreen';
import AskAnExpertMainScreen from '../src/components/AskAnExpert/AskAnExpertMainScreen';

const windowHeight = Dimensions.get('window').height - 45;
const windowWidth = Dimensions.get('window').width;

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfessional: false,
      userName: 'John Smith',
      isModalVisible: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      isProfessional: 'isProfessional' in this.props.route.params ? this.props.route.params.isProfessional : false,
      userName: 'userName' in this.props.route.params ? this.props.route.params.userName : 'John Smith',
    });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return <AskAnExpertMainScreen />;
  }
}

const MainStyles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  button: {
    borderWidth: 2,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'gray',
  },
  buttonText: {
    fontSize: 24,
    color: 'gray',
    fontWeight: 'bold',
  },
  nextButton: {
    borderColor: AppColors.primaryDark,
  },
  nextText: {
    color: AppColors.primaryDark,
  },
  textInput: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '80%',
    marginBottom: 50,
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
  helpText: {
    textAlign: 'left',
    width: '80%',
    color: 'gray',
    fontSize: 18,
    marginBottom: 30,
    marginTop: -10,
    fontWeight: 'bold',
  },
  mainButton: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 150,
    borderRadius: 20,
    width: '100%',
  },
  modalText: {
    color: '#2D9CDB',
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 25,
  },
  roundedInput: {},
  roundedInputArea: {},
});
