import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    Switch
} from 'react-native';
import React, {Component} from 'react';
import AppColors from '../Styles/colors';
import {Styles} from '../Styles/styles';

export default class AskAnExpert extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.setState({
            question: '',
            checkBoxOne: false,
            checkBoxTwo: false
        });
    }

    sendQuestion() {
        /*
        fetch('https://se69teeec9.execute-api.us-east-1.amazonaws.com/api/add_question', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: global.email,
                question: this.state.question,
                sharing_data: this.state.checkBoxOne ? 1 : 0,
                is_private: this.state.checkBoxOne ? 1 : 0
            }),
        })
            .then(response => response.json())
            .then(json => {
                Alert.alert('We have delivered your question successful.')
            })
            .catch(error => {
                console.error(error);
                Alert.alert('A problem occured, please try again later.')
            });
    */
        }

    render() {
        return (

            <View>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView style={AskAnExpertStyles.mainView}>
                    <Text style={AskAnExpertStyles.helpText}>Ask An Expert</Text>
                    <View style={AskAnExpertStyles.choicesContainer}>
                        <TextInput style={AskAnExpertStyles.loginFieldsTextInput}
                                   onChangeText={(event) => this.setState({question: event})}
                        multiline={true}/>
                        <Text>I want to share my personal data with the doctor.</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={this.state.checkBoxOne ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => this.setState({checkBoxOne: !this.state.checkBoxOne})}
                            value={this.state.checkBoxOne}
                        />
                        <Text>The doctor can answer the question publicly</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={this.state.checkBoxTwo ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => this.setState({checkBoxTwo: !this.state.checkBoxTwo})}
                            value={this.state.checkBoxTwo}
                        />
                        <TouchableOpacity
                            style={AskAnExpertStyles.choiceButton}
                            onPress={() => this.sendQuestion()}>
                            <Text style={AskAnExpertStyles.choiceText}>Ask</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        )
            ;
    }
}

const AskAnExpertStyles = StyleSheet.create({
    loginFieldsTextInput: {
        height: 300,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 30,
    },
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
