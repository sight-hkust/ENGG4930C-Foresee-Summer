import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Core component
 */
export default class ProfPatientViewScreen extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>                
                <Text style={styles.text}> This Screen is used for reviewing patient info. </Text>
            </View>
        );
    }
}

/**
 * The Styling part, you may edit the existing style
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    }, 
    text: {
        textAlign: 'center'
    }
});
