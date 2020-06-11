import React, { Component ,useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
//import {SpinPicker} from 'react-native-spin-picker';
import {Formik} from 'formik';
import moment from 'moment';
import { TextInput } from 'react-native-gesture-handler';
import {database} from '../constant/Config';

export default class Form extends Component{
    constructor(props){
        super(props);
    }
    render(){
  
    return(
        <View style={styles.container}>
            <Formik initialValues={{
                        date:moment().format('YYYY-MM-DD'),
                        L_SPH : "", symbol:"+"
                    }} 
                    onSubmit={(values)=>{
                        console.log(values);
                        database.ref('users/001').set(values);
                        }}>
            {({handleSubmit,values,setFieldValue,handleChange})=>(  //onsumbit form, close the record screen and go back to record
                <View>
                    <View>
                        <Text>Select a date</Text>
                        <DateSelect values={values} setFieldValue={setFieldValue}/>
                    </View>
                        <SPHInput values={values} handleChange={handleChange} setFieldValue={setFieldValue}/>
                    <View>
                    <Button title='submit' color='lightpink' onPress={handleSubmit}/> 
                    </View>
                    
                </View>
            )}

            </Formik>
        </View>

        )
    }
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
        <Button onPress={showDatePicker} title={moment(values.date).format('YYYY-MM-DD')}/>
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

export const SPHInput = props=>{
    const{values, handleChange,setFieldValue} = props;
    const [symbol, setsymbol] = useState('+')
    
    return(
        <View style={{paddingBottom:12}}>
        <Text>Input O.D. SPH</Text>
        <View style={{flexDirection:'row'}}>
            <DropDownPicker        //seperate it into its own component, reuse for OS
                    items = {[
                        {label: '+', value: '+'},
                        {label:'-', value:'-'}
                    ]}
                    containerStyle={{height: 40, width: 50}}
                    defaultValue = '+'
                    onChangeItem = {item=>{setFieldValue('symbol',item.label)}}
                    dropDownStyle={{backgroundColor: '#fafafa', height:85, width:50}}      
                />
            <TextInput onChangeText={handleChange('L_SPH')}  //reuse for R_SPH
                        value={values.L_SPH}
                        keyboardType='numeric'
                        style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
        </View>
    </View>
    );
} 

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      padding: 30,
      backgroundColor: 'powderblue'
    },  
  
  });