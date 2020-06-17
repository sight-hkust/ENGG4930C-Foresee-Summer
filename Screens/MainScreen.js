import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
    Image
} from 'react-native';
import React, {Component} from 'react';
import AppColors from '../Styles/colors';
import {Styles} from '../Styles/styles';
import { Col, Row, Grid } from "react-native-easy-grid";

import BottomModal from '../Utils/BottomModal'

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProfessional: false,
            userName: 'John Smith',
            isModalVisible: true,
        };
    }

    componentDidMount() {
        this.setState({
            isProfessional:
                'isProfessional' in this.props.route.params
                    ? this.props.route.params.isProfessional
                    : false,
            userName:
                'userName' in this.props.route.params
                    ? this.props.route.params.userName
                    : 'John Smith',
        });
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView style={MainStyles.mainView}>
                    <Text style={Styles.registerTitle}>
                        {'Hello, ' + global.realName}
                    </Text>
                    <Text style={MainStyles.helpText}>What can we do for you?</Text>
                    <View style={MainStyles.choicesContainer}>
                    <TouchableOpacity onPress={()=>this.toggleModal()}>
                        <Image style={MainStyles.menuButton} source={require('../assets/images/Icon.png')} />
                    </TouchableOpacity>
                    </View>

                    <BottomModal isVisible={this.state.isModalVisible}>
                        <View style={{alignSelf: 'center', width: '30%', height: 4, backgroundColor:'#1772A6'}}></View>
                        <Grid>
                            <Row>
                                <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <TouchableOpacity onPress={()=>console.log()}>
                                        <Image style={MainStyles.menuButton} source={require('../assets/images/Icon.png')} />
                                        <Text style={MainStyles.modalText}>Achievement</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <TouchableOpacity onPress={()=>this.toggleModal()}>
                                        <Image style={MainStyles.menuButton} source={require('../assets/images/Icon.png')} />
                                        <Text style={MainStyles.modalText}>Exercise</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                            <Row>
                            <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <TouchableOpacity onPress={()=>this.toggleModal()}>
                                        <Image style={MainStyles.menuButton} source={require('../assets/images/Icon.png')} />
                                        <Text style={MainStyles.modalText}>Read More</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <TouchableOpacity onPress={()=>this.toggleModal()}>
                                        <Image style={MainStyles.menuButton} source={require('../assets/images/Icon.png')} />
                                        <Text style={MainStyles.modalText}>Rewards</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </Grid>
                    </BottomModal>
                    
                </SafeAreaView>
            </View>
        );
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
    menuButton: {
        width: 60,
        height: 60,
        alignSelf: 'center'
    },
    content: {
        backgroundColor: 'white',
        padding: 150,
        borderRadius: 20,
        width: '100%',
        
    },
    modalText: {
        color: '#2D9CDB',
        fontSize: 16
    } 

});
