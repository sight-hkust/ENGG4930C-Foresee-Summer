import React, { Component ,useState} from 'react';
import { StyleSheet, Text, View, Button,ScrollView,Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Formik} from 'formik';
import moment from 'moment';
import { TextInput } from 'react-native-gesture-handler';
import {database} from '../src/config/config';
import {number, object,string} from 'yup';


const ReviewSchema = object({
    L_SPH: string().required('此項必填')
            .matches('^[0-9]*$','請輸入大過或等於0的整數')
            .max(4, '球面度數(SPH)應在4個數字以內')
            .test('divisible by 25','球面度數(SPH)應為0或以00, 25, 50或75作尾', value=>value%25 == 0),
    R_SPH : string().required('此項必填')
            .matches('^[0-9]*$','請輸入大過或等於0的整數')
            .max(4, '球面度數(SPH)應在4個數字以內')
            .test('divisible by 25','球面度數(SPH)應為0或以00, 25, 50或75作尾', value=>value%25 == 0),
    L_VA : number()
            .test('range','視力(Visual Acuity)應在 0 和 1 之間', value=>value>=0||value<=1)
            .max(1.0, '視力(Visual Acuity)應在 0 和 1 之間'),
    R_VA : number()
            .test('range','視力(Visual Acuity)應在 0 和 1 之間', value=>value>=0||value<=1)
            .max(1.0, '視力(Visual Acuity)應在 0 和 1 之間'),
    L_CYL : string().required('此項必填')
            .matches('^[0-9]*$','請輸入大過或等於0的整數')
            .max(4, '散光度數(CYL)應在4個數字以內')
            .test('divisible by 25','散光度數(CYL)應為0或以00, 25, 50或75作尾', value=>value%25 == 0),    
    R_CYL : string().required('此項必填')
            .matches('^[0-9]*$','請輸入大過或等於0的整數')
            .max(4, '散光度數(CYL)應在4個數字以內')
            .test('divisible by 25','散光度數(CYL)應為0或以00, 25, 50或75作尾', value=>value%25 == 0),
    L_Axis: string()
            .when('L_CYL', {
                is: (val)=>val>0,
                then: string().required('此項必填')
                        .test('between 0 and 180','散光軸度(Axis)應在 0 和 180 之間', value=>value>=0&&value<=180)
                        .matches('^[0-9]*$','請輸入整數'),
                otherwise: string().notRequired()
            }),
    R_Axis: string()
            .when('L_CYL', {
                is: (val)=>val>0,
                then: string().required('此項必填')
                        .test('between 0 and 180','散光軸度(Axis)應在 0 和 180 之間', value=>value>=0&&value<=180)
                        .matches('^[0-9]*$','請輸入整數'),
                otherwise: string().notRequired()
            }),
    PD : string()
            .matches('^[0-9]*$','請輸入大於0的整數')
            .test('check positive','瞳孔距離(PD)應大於0', value=>value>0 )
            
})


export default class Form extends Component{
    constructor(props){
        super(props);
    }

    render(){

    const { isProfessional, professional_id, patient_id } = this.props.route.params;

    return(
        <ScrollView>
        <View style={styles.container}>
            <Formik initialValues={{
                        date:moment().format('YYYY-MM-DD'),
                        L_SPH : "", Lsymbol:"+",
                        R_SPH : "", Rsymbol: "+",
                        L_VA : "0", R_VA: "0",
                        L_CYL: "",   R_CYL: "", 
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
                                    "L_CYL":  parseInt(values.L_CYL), "R_CYL":  parseInt(values.R_CYL),
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
                        console.log(values);
                        
                        if(isProfessional) {
                            database.ref('professionals/' + professional_id + '/patients/' + patient_id + '/records/' + values.date).set(data).catch((error)=>console.log(error));
                        }else{
                            database.ref('users/001/records/'+ values.date).set(data).catch((error)=>console.log(error));
                            this.props.navigation.navigate('RecordsScreen')
                        }
                        }}>

            {({handleSubmit,values,setFieldValue,handleChange, errors})=>(  
                <View>
                    <View>
                        
                        <DateSelect values={values} setFieldValue={setFieldValue}/>
                    
                        <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft = {true}/>
                        <Text style={styles.errortext}>{errors.L_SPH}</Text>
                        <SPHInput handleChange={handleChange} setFieldValue={setFieldValue} isLeft = {false}/>
                        <Text style={styles.errortext}>{errors.R_SPH}</Text>

                        <CYLInput handleChange={handleChange}  setFieldValue={setFieldValue} isLeft={true} errorA={errors.L_CYL} errorB={errors.L_Axis}/>
                        <CYLInput handleChange={handleChange}  setFieldValue={setFieldValue} isLeft={false} errorA={errors.R_CYL} errorB={errors.R_Axis}/>

                        <VAInput handleChange={handleChange} isLeft={true}/>
                        <Text style={styles.errortext}>{errors.L_VA}</Text>
                        <VAInput handleChange={handleChange} isLeft={false}/>
                        <Text style={styles.errortext}>{errors.R_VA}</Text>

                        
                        <PDInput handleChange={handleChange}/>
                        <Text style={styles.errortext}>{errors.PD}</Text>
                        <View style={{paddingTop:24}}>

                        <Button title='提交' color='lightpink' onPress={handleSubmit} disabled={Object.keys(errors).length>0}/> 

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
        <Text>請輸入日期</Text>
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
        <Text>請輸入 {isLeft? "左眼的(O.S.)" : "右眼的(O.D.)"} 球面度數(SPH) (e.g. 125)</Text>
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
        <Text>請輸入兩眼瞳孔距離(Pupillary Distance)(mm)</Text>
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
        <Text>請輸入{isLeft? "左眼的(O.S.)" : "右眼的(O.D.)"}視力(VA)</Text>
        
            
            <TextInput onChangeText={ handleChange(isLeft? 'L_VA':'R_VA')}
                        keyboardType='numeric'
                        style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
        
    </View>
    );
} 


export const CYLInput = props=>{
    const{ handleChange,setFieldValue, isLeft, errorA, errorB} = props;
    const [isable, setIsable] = useState(false);
    return(
        <View style={{paddingBottom:5}}>
        <Text>請輸入{isLeft? "左眼的(O.S.)" : "右眼的(O.D.)"}散光度數(CYL) (e.g. 125)</Text>
        <View style={{flexDirection:'row', paddingBottom:5}}>
            <Text>-</Text>
            
            <TextInput onChangeText={text=>{
                                    if(isLeft){
                                        setFieldValue('L_CYL',text); 
                                        if(text>0){setIsable(true)}else{setIsable(false)}}
                                    else{setFieldValue('R_CYL',text)}
                                    }}
                        keyboardType='numeric'
                        style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
        </View>
        <View>
            <Text style={styles.errortext}>{errorA}</Text>
            {isable && (
                <AxisInput handleChange={handleChange} isLeft={isLeft} error={errorB}/>
            )}
                
            
            
        </View>
    </View>
    );
} 

export const AxisInput = props=>{
    const{ handleChange, isLeft, error} = props;
    
        return(

        <View style={{paddingBottom:5}}>
            <Text>請輸入 {isLeft? "左眼的(O.S.)" : "右眼的(O.D.)"} 散光軸度(Axis)</Text>
                <TextInput onChangeText={ 
                                        handleChange(isLeft? 'L_Axis':'R_Axis')
                                        }
                            keyboardType='numeric'
                            style={{backgroundColor:'white', borderColor:'lightgray', borderWidth:1, width:75, textAlign:'center'}}/>
            <Text style={styles.errortext}>{error}</Text>
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
    errortext: {
        fontSize: 12,
        color: 'red'
    }
  });