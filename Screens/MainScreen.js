import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import React, {Component} from 'react';
import AppColors from '../Styles/colors';
import {Styles} from '../Styles/styles';

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isProfessional: false,
            userName: 'John Smith',
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
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('RecordsScreen', {
                                    isProfessional: true,
                                })
                            }
                            style={MainStyles.choiceButton}>
                            <Text style={MainStyles.choiceText}>View Records</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={MainStyles.choiceButton}>
                            <Text style={MainStyles.choiceText}>My Doctors</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={MainStyles.choiceButton}
                        onPress={()=>this.props.navigation.navigate("GetEducatedScreen")}>
                            <Text style={MainStyles.choiceText}>Get Educated</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={MainStyles.choiceButton}
                            onPress={()=>this.props.navigation.navigate("AskAnExpertScreen")}>
                            <Text style={MainStyles.choiceText}>Ask an Expert</Text>
                        </TouchableOpacity>
                    </View>
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
});
