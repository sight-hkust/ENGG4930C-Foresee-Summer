import React, { Component ,useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
                        L_SPH : "", Lsymbol:"+",
                        R_SPH : "", Rsymbol: "+",
                        L_VA : "", R_VA: "",
                        L_CYL: "", R_CYL: "",
                        L_Axis: "", R_Axis: "",
                        PD : ""
                    }} 
                    onSubmit={(values)=>{
                        let data = {"L_SPH": "", "R_SPH": "",
                                    "L_VA" : values.L_VA, "R_VA": values.R_VA,
                                    "L_CYL": values.L_CYL, "R_CYL": values.R_CYL,
                                    "L_Axis": values.L_Axis , "R_Axis": values.R_Axis,
                                     "PD": values.PD}
                        if(values.Lsymbol === '+'){
                            data.L_SPH = '+' + values.L_SPH
                            }
                        else{
                            data.L_SPH = '-' + values.L_SPH
                            }
                        if(values.Rsymbol === '+'){
                            data.R_SPH = '+' + values.R_SPH
                            }
                        else{
                            data.R_SPH = '-' + values.R_SPH 
                            }            
                        console.log(values);
                        database.ref('users/001/'+ values.date).set(data);
                        }}>
            {({handleSubmit,values,setFieldValue,handleChange})=>(  //onsumbit form, close the record screen and go back to record
                <View>
                    <View>
                        <Text>Select a date</Text>
                        <DateSelect values={values} setFieldValue={setFieldValue}/>
                    
                        <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft = {true}/>
                        <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft = {false}/>

                        <VAInput handleChange={handleChange} isLeft={true}/>
                        <VAInput handleChange={handleChange} isLeft={false}/>

                        <CYLInput handleChange={handleChange} isLeft={true}/>
                        <AxisInput handleChange={handleChange} isLeft={true}/>
                        
                        <CYLInput handleChange={handleChange} isLeft={false}/>
                        <AxisInput handleChange={handleChange} isLeft={false}/>

                        <PDInput handleChange={handleChange}/>
                        <View style={{paddingTop:24}}>
                        <Button title='submit' color='lightpink' onPress={handleSubmit} /> 
                        </View>
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
    const{ handleChange,setFieldValue, isLeft} = props;
    
    return(
        <View style={{paddingBottom:5}}>
        <Text>Input {isLeft? "O.D." : "O.S."} SPH</Text>
        <View style={{flexDirection:'row', paddingBottom:12}}>
            <DropDownPicker        
                    items = {[
                        {label: '+', value: '+'},
                        {label:'-', value:'-'}
                    ]}
                    containerStyle={{height: 40, width: 50}}
                    defaultValue = '+'
                    onChangeItem = {item=>{
                                    if(isLeft){setFieldValue('Lsymbol',item.label)}
                                    else{setFieldValue('Rsymbol',item.label)}
                                    }}
                    dropDownStyle={{backgroundColor: '#fafafa', height:85, width:50}}      
                />
            <TextInput onChangeText={ handleChange(isLeft? 'L_SPH':'R_SPH')}
                        keyboardType='numeric'
                        style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
        </View>
    </View>
    );
} 

export const PDInput = props=>{
    const{ handleChange} = props;
    
    return(
    <View style={{paddingBottom:5}}>
        <Text>Input Pupil Distance(mm)</Text>
        <TextInput onChangeText={ handleChange('PD')}
                keyboardType='numeric'
                style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
    </View>
    );
} 

export const VAInput = props=>{
    const{ handleChange, isLeft} = props;
    
    return(
        <View style={{paddingBottom:5}}>
        <Text>Input {isLeft? "O.D." : "O.S."} VA</Text>
        
            
            <TextInput onChangeText={ handleChange(isLeft? 'L_VA':'R_VA')}
                        keyboardType='numeric'
                        style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
        
    </View>
    );
} 

export const CYLInput = props=>{
    const{ handleChange, isLeft} = props;
    
    return(
        <View style={{paddingBottom:5}}>
        <Text>Input {isLeft? "O.D." : "O.S."} CYL</Text>
            <TextInput onChangeText={ handleChange(isLeft? 'L_CYL':'R_CYL')}
                        keyboardType='numeric'
                        style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
        
    </View>
    );
} 

export const AxisInput = props=>{
    const{ handleChange, isLeft} = props;
    
    return(
        <View style={{paddingBottom:5}}>
        <Text>Input {isLeft? "O.D." : "O.S."} Axis</Text>
            <TextInput onChangeText={ handleChange(isLeft? 'L_Axis':'R_Axis')}
                        keyboardType='numeric'
                        style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
        
    </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
      justifyContent: 'center',
      padding: 30,
      backgroundColor: 'powderblue'
    },  
  
  });