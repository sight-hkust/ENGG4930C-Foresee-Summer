import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {Styles} from '../Styles/styles';
import { Button } from 'react-native-elements'
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { database } from '../constant/Config';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const ProfCreateProfileScreen = ({ route, navigation }) => {
    return (
        <View style={{        
            backgroundColor: 'white',
            flex: 1,
            textAlign: 'center',
            alignContent: 'center',
            justifyContent: 'center'
        }}>
            <Formik initialValues={{
                date:moment().format('YYYY-MM-DD'),
                name: '',
                email: '',
                tel: ''
                }}

                onSubmit={(values)=>{
                    let data = {"name" : values.name, "email" : values.email, "tel" : values.tel}
                    database.ref('professionals/M001/patients/002/info').set(data).catch((error)=>console.log(error));
                    navigation.navigate('AddRecordScreen', {isProfessional: true, professional_id: 'M001', patient_id: '002'})
                }
            }>
            {({handleSubmit,values,setFieldValue,handleChange})=>(  //onsumbit form, close the record screen and go back to record
                <View>
                    <View>


                    <View style={DoctorsStyles.inputContainer}>
                        <Text style={DoctorsStyles.title}> 姓名（全名）</Text>
                        <TextInput onChangeText={handleChange('name')} setFieldValue={setFieldValue} style={DoctorsStyles.input}/>
                    </View>


                    <View style={DoctorsStyles.inputContainer}>
                        <Text style={DoctorsStyles.title}> 出生年份 </Text>
                        <DateSelect values={values} setFieldValue={setFieldValue}/>
                    </View>


                    <View style={DoctorsStyles.inputContainer}>
                        <Text style={DoctorsStyles.title}> 電子郵件 </Text>
                        <TextInput onChangeText={handleChange('email')} setFieldValue={setFieldValue} style={DoctorsStyles.input}/>
                    </View>


                    <View style={DoctorsStyles.inputContainer}>
                        <Text style={DoctorsStyles.title}> 電話號碼 </Text>
                        <TextInput onChangeText={handleChange('tel')} setFieldValue={setFieldValue} style={DoctorsStyles.input} keyboardType='numeric'/>
                    </View>

                    <Text>
                        職業：
                    </Text>

                    <Text>
                        家庭病史：
                    </Text>

                    <Text>
                        已知眼疾：
                    </Text>
                        
                    <View style={{paddingTop:24}}>
                        <Button title='確認創建' color='lightpink' onPress={handleSubmit} /> 
                    </View>

                    </View>
                </View>
            )}

            </Formik>
        </View>       
    );
}

export const DateSelect = props => {
    const { values, setFieldValue } = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = date => {
        hideDatePicker();
      setFieldValue('date', moment(date).format('YYYY-MM-DD'))
      
    };
  
    return (
      <View style={{paddingBottom:12}}>
        <Button onPress={showDatePicker} title="請選擇你的出生日期" type="clear" containerStyle={DoctorsStyles.input}/>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={moment(values.date).toDate()}
          maximumDate= {new Date()}
        />
        
      </View>
    );
  }



const DoctorsStyles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    inputContainer: {
        paddingBottom:5, 
        alignSelf: 'center'
    },
    title: {
        fontSize: 25
    },
    input: {
        backgroundColor:'white', 
        borderColor:'lightgray', 
        borderWidth:1, 
        textAlign:'center', 
        width: 300,
        height: 50
    }

})

export default ProfCreateProfileScreen