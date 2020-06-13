import React, { Component ,useState} from 'react';
import { StyleSheet, Text, View, Button,ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Formik} from 'formik';
import moment from 'moment';
import { TextInput } from 'react-native-gesture-handler';
import {database} from '../constant/Config';
import {number, object,string} from 'yup';

const ReviewSchema = object({
    L_SPH: string()
            .matches('^[0-9]*$','Please enter positive integer value')
            .max(4, '球面度數(SPH) should be within 4 digits')
            .test('divisible by 25','球面度數(SPH) should be 0 or end with 00, 25, 50 or 75', value=>value%25 == 0),
    R_SPH : string()
            .matches('^[0-9]*$','Please enter positive integer value')
            .max(4, '球面度數(SPH) should be within 4 digits')
            .test('divisible by 25','球面度數(SPH) should be 0 or end with 00, 25, 50 or 75', value=>value%25 == 0),
    L_VA : number()
            .test('range','視力(Visual Acuity) should be between 0 and 1.0', value=>value>=0||value<=1)
            .max(1.0, '視力(Visual Acuity) should be between 0 and 1.0'),
    R_VA : number()
            .test('range','視力(Visual Acuity) should be between 0 and 1.0', value=>value>=0||value<=1)
            .max(1.0, '視力(Visual Acuity) should be between 0 and 1.0'),
    L_CYL : string()
            .matches('^[0-9]*$','Please enter positive integer value')
            .max(4, '散光度數(CYL) should be within 4 digits')
            .test('divisible by 25','散光度數(CYL) should be 0 or end with 00, 25, 50 or 75', value=>value%25 == 0),    
    R_CYL : string()
            .matches('^[0-9]*$','Please enter positive integer value')
            .max(4, '散光度數(CYL) should be within 4 digits')
            .test('divisible by 25','散光度數(CYL) should be 0 or end with 00, 25, 50 or 75', value=>value%25 == 0),
    L_Axis: string()
            .when('L_CYL', {
                is: (val)=>val>0,
                then: string().required('This field is required'),
                otherwise: string().notRequired()
            }),
    R_Axis: string()
            .when('R_CYL', {
                is: (val)=>val>0,
                then: string().required('This field is required'),
                otherwise: string().notRequired()
            }),    

    PD : string()
            .matches('^[0-9]*$','Please enter positive integer value')
            .test('check positive','瞳孔距離(PD) should be positive', value=>value>=0 )
            
})


export default class Form extends Component{
    constructor(props){
        super(props);
    }
    render(){

    return(
        <ScrollView>
        <View style={styles.container}>
            <Formik initialValues={{
                        date:moment().format('YYYY-MM-DD'),
                        L_SPH : "0", Lsymbol:"+",
                        R_SPH : "0", Rsymbol: "+",
                        L_VA : "0", R_VA: "0",
                        L_CYL: "0", L_CYLsymbol:"+",  R_CYL: "0", R_CYLsymbol: "+",
                        L_Axis: "", R_Axis: "",
                        PD : "0",
                        L_Myopia:"0" , R_Myopia:"0" ,
                        L_Hyperopia:"0", R_Hyperopia :"0"
                    }} 
                    validationSchema={ReviewSchema}
                    onSubmit={(values)=>{
                        let data = {"L_Myopia": 0, "R_Myopia": 0,
                                    "L_Hyperopia": 0, "R_Hyperopia": 0,
                                    "L_VA" : parseFloat(values.L_VA), "R_VA": parseFloat(values.R_VA),
                                    "L_CYL": values.L_CYLsymbol + parseInt(values.L_CYL), "R_CYL": values.R_CYLsymbol + parseInt(values.R_CYL),
                                    "L_Axis": values.L_Axis , "R_Axis": values.R_Axis,
                                     "PD": parseInt(values.PD)}

                        if(values.Lsymbol === '+'){
                            data.L_Hyperopia = parseInt(values.L_SPH)
                            }
                        else{
                            data.L_Myopia = parseInt(values.L_SPH)
                            }
                        if(values.Rsymbol === '+'){
                            data.R_Hyperopia = parseInt(values.R_SPH)
                            }
                        else{
                            data.R_Myopia =  parseInt(values.R_SPH)
                            }            
                        database.ref('users/002/records/'+ values.date).set(data).catch((error)=>console.log(error));

                        this.props.navigation.navigate('RecordsScreen')
                        }}>

            {({handleSubmit,values,setFieldValue,handleChange, errors})=>(  
                <View>
                    <View>
                        <Text>Select a date</Text>
                        <DateSelect values={values} setFieldValue={setFieldValue}/>
                    
                        <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft = {true}/>
                        <Text style={styles.errortext}>{errors.L_SPH}</Text>
                        <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft = {false}/>
                        <Text style={styles.errortext}>{errors.R_SPH}</Text>

                        <VAInput handleChange={handleChange} isLeft={true}/>
                        <Text style={styles.errortext}>{errors.L_VA}</Text>
                        <VAInput handleChange={handleChange} isLeft={false}/>
                        <Text style={styles.errortext}>{errors.R_VA}</Text>

                        <CYLInput handleChange={handleChange}  setFieldValue={setFieldValue} isLeft={true}/>
                        <Text style={styles.errortext}>{errors.L_CYL}</Text>
                        <AxisInput handleChange={handleChange} isLeft={true}/>
                        <Text style={styles.errortext}>{errors.L_Axis}</Text>

                        <CYLInput handleChange={handleChange}  setFieldValue={setFieldValue} isLeft={false}/>
                        <Text style={styles.errortext}>{errors.R_CYL}</Text>
                        <AxisInput handleChange={handleChange} isLeft={false}/>
                        <Text style={styles.errortext}>{errors.R_Axis}</Text>

                        <PDInput handleChange={handleChange}/>
                        <Text style={styles.errortext}>{errors.PD}</Text>
                        <View style={{paddingTop:24}}>

                        <Button title='submit' color='lightpink' onPress={handleSubmit} /> 
                        </View>
                    </View>
                    
                </View>
            )}

            </Formik>
        </View>
        </ScrollView>
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
        <Text>Input {isLeft? "O.D." : "O.S."} SPH (e.g. 125)</Text>
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
    const{ handleChange,setFieldValue, isLeft} = props;
    
    return(
        <View style={{paddingBottom:5}}>
        <Text>Input {isLeft? "O.D." : "O.S."} CYL (e.g. 125)</Text>
        <View style={{flexDirection:'row', paddingBottom:5}}>
            <DropDownPicker        
                    items = {[
                        {label: '+', value: '+'},
                        {label:'-', value:'-'}
                    ]}
                    containerStyle={{height: 40, width: 50}}
                    defaultValue = '+'
                    onChangeItem = {item=>{
                                    if(isLeft){setFieldValue('L_CYLsymbol',item.label)}
                                    else{setFieldValue('R_CYLsymbol',item.label)}
                                    }}
                    dropDownStyle={{backgroundColor: '#fafafa', height:85, width:50}}      
                />
            <TextInput onChangeText={ handleChange(isLeft? 'L_CYL':'R_CYL')}
                        keyboardType='numeric'
                        style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
        </View>
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

/*
export class CYLInput extends Component {
    constructor(props){
        super(props)
        this.state = {isenabled: false};
    }
    render(){
        
        return(
            <View style={{paddingBottom:5}}>
            <Text>Input {this.props.isLeft? "O.D." : "O.S."} CYL</Text>
            <View style={{flexDirection:'row', paddingBottom:12}}>
                <DropDownPicker        
                    items = {[
                        {label: '+', value: '+'},
                        {label:'-', value:'-'}
                    ]}
                    containerStyle={{height: 40, width: 50}}
                    defaultValue = '+'
                    onChangeItem = {item=>{
                                    if(this.props.isLeft){this.props.setFieldValue('L_CYLsymbol',item.label)}
                                    else{this.props.setFieldValue('R_CYLsymbol',item.label)}
                                    }}
                    dropDownStyle={{backgroundColor: '#fafafa', height:85, width:50}}      
                />
                <TextInput  onChangeText ={ (text) => {this.props.handleChange(this.props.isLeft? 'L_CYL':'R_CYL');
                                                       if(text>0){this.setState({isenabled:true})}
                                                        else{this.setState({isenabled:false})}}}
                            keyboardType='numeric'
                            style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
            </View>
                
                    
        </View>
        );
    }

} 

export const AxisInput = props=>{
    const{ handleChange, isLeft, isenabled} = props;
    //console.log('here');
    //console.log(isenabled);
    if(isenabled){
        return(
        
            <View style={{paddingBottom:5}}>
            <Text>Input {isLeft? "O.D." : "O.S."} Axis</Text>
                <TextInput onChangeText={ handleChange(isLeft? 'L_Axis':'R_Axis')}
                            keyboardType='numeric'
                            style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
            
        </View>
        );
    }
    else{
        return null;
    }

} 
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
      justifyContent: 'center',
      padding: 30,
      backgroundColor: 'powderblue'
    },  
    errortext: {
        fontSize: 10,
        color: 'red'
    }
  });