import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput, Alert,
} from 'react-native';
import React, {Component} from 'react';
import AppColors from '../../Styles/colors';
import {Styles} from '../../Styles/styles';

export default class RegisterIsParent extends Component {
    componentDidMount() {
        this.setState({
            userName: this.props.route.params.userName,
            email: this.props.route.params.email,
            password: this.props.route.params.password,
            phoneNumber: this.props.route.params.phoneNumber,
            isParent: 0,
        });
    }
    /*
    registerUser() {
        fetch(global.apiUrl + 'create_user', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                real_name: this.state.userName,
                password: this.state.password,
                phone_number: this.state.phoneNumber,
                is_parent: this.state.isParent
            }),
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.status === 'OK') {
                    global.realName = this.state.userName;
                    global.email = this.state.email;
                    global.password = this.state.password;
                    this.props.navigation.navigate('MainScreen', {});
                } else {
                    Alert.alert('Registration Error');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    */
    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content"/>
                <SafeAreaView style={RegisterNameStyles.mainView}>
                    <Text style={Styles.registerTitle}>Are you a parent?</Text>
                    <TouchableOpacity
                        style={Styles.smallButton}
                        //onPress={() => this.setState({isParent: 0}, () => this.registerUser())}
                        onPress={()=>this.setState({isParent:0}, ()=>this.props.navigation.navigate('MainScreen', {}))}
                        >
                        <Text style={RegisterNameStyles.buttonText}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[Styles.smallButton, Styles.aProgressionButton, {marginTop: 20}]}
                        //onPress={() => this.setState({isParent: 1}, () => this.registerUser())}
                        onPress={()=>this.setState({isParent:1}, ()=>this.props.navigation.navigate('MainScreen', {}))}
                        >
                        <Text
                            style={[
                                Styles.smallButtonText,
                                Styles.aProgressionText,
                            ]}>
                            Yes
                        </Text>
                    </TouchableOpacity>
                    <Text style={Styles.termsOfUseText} multiline={true}>
                        By continuing you agree to our Terms of Use and Privacy Policy.
                    </Text>
                </SafeAreaView>
            </View>
        );
    }
}

const RegisterNameStyles = StyleSheet.create({
    mainView: {
        alignItems: 'center',
        height: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
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
});
