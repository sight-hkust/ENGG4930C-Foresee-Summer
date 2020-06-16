import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const sampleUser = {
    name: 'Jake Ki',
    age: 31,
    job: 'Student',
    history: 'IQ 200',
    disease: 'None',
}

/**
 * Core component
 */
export default class ProfPatientViewScreen extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <Text style={[styles.text, {fontSize: 30, color: '#000000'}]}>{sampleUser.name}</Text>
                    <Text style={styles.text}>年齡: {sampleUser.age}</Text>
                    <Text style={styles.text}>職業: {sampleUser.job}</Text>
                    <Text style={styles.text}>家庭病史: {sampleUser.history}</Text>
                    <Text style={styles.text}>已知眼疾: {sampleUser.disease}</Text>
                </View>
                <View style={[styles.container, 
                        {backgroundColor: '#56CCF2', 
                        flex: 2, 
                        justifyContent: 'center',
                        paddingBottom: 0,
                        paddingHorizontal: 30}]}>
                    <View style={{height: 50}}></View>
                    <View style={[styles.boxes, {flex: 6}]}></View>
                    <View style={{height: 10}}></View>
                    <View style={ 
                            {backgroundColor: 'transparent', 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1}}>
                        <TouchableOpacity
                            style={styles.boxes}
                            onPress={() => {}}
                        >
                            <Text style={styles.buttonText}>輸入數據</Text>
                        </TouchableOpacity>
                        <View style={{width: 10}}></View>
                        <TouchableOpacity
                            style={styles.boxes}
                            onPress={() => {}}
                        >
                            <Text style={styles.buttonText}>眼鏡度數</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 30}}></View>
                </View>
            </>
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
        textAlign: 'left',
        fontSize: 18,
        paddingHorizontal: 40,
        color: '#474747'
    },
    centretext: {
        textAlign: 'center'
    },
    boxes: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
    }
});
