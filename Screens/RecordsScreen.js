import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import {database} from '../src/config/config';
import LineChart from '../helpers/line-chart';
import {LinearGradient} from 'expo-linear-gradient';

const LeftOpen = require('../assets/images/LeftOpen.png');
const RightOpen = require('../assets/images/RightOpen.png');
const BackArrow = require('../assets/images/BackArrow.png');
const NextArrow = require('../assets/images/NextArrow.png');
const Setting = require('../assets/images/setting.png')

export default class Main extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: null,
      Leye: true,
      dates : [],
      ddlSelectedValue: '0',
      index: '0',
      ddlSelectedDate : '0',
      username: ""
    }}
  
  componentDidMount(){
      const userid = '002';
    database.ref('users/'+ userid ).on('value', (snapshot)=>{
        var tempDate = [];

        for(var key in snapshot.child("records").val()){
          tempDate.push(key);
        }

        var tempName = snapshot.child("info/name").val();
       
        this.setState({data : snapshot.child("records").toJSON(), 
                      dates: tempDate,
                      ddlSelectedDate: tempDate[0],
                      username: tempName,
                      index: 0
                      });
    });
    
  }

  render(){
    const data = this.state.data;

    const pressHandler = ()=>{
      this.props.navigation.navigate('AddRecordScreen' ,{isProfessional: false})
    }
    const GetNext = ()=>{
      const length = this.state.dates.length;
      const value = (this.state.index+1) % length;
      //console.log('value',value)
      this.setState({index: value, ddlSelectedDate: this.state.dates[value]});
      //console.log('press',this.state.index)
    }
    const GetBack =()=>{
      if(this.state.index == 0){
        const length = this.state.dates.length - 1 ;
        this.setState({index:length, ddlSelectedDate:this.state.dates[length]});
      }
      else{
        const value = this.state.index;
        this.setState({index:value-1, ddlSelectedDate:this.state.dates[value-1]});
      }
    }
      
        return(
          
        <View style={RecordScreenStyle.background}>
          
          <LinearGradient
            colors={['#1872a7','#4e74c9','#a278ff']}
            start={[0, 0.9]}
            end={[1, 0]}
            locations={[0, 0.5, 1]}
            style={{
              height: '100%',
            }}
          >

          <View style={RecordScreenStyle.header}>
            <Text style={RecordScreenStyle.title}>視力趨勢</Text>
            <TouchableOpacity>
              <Image source={Setting}/>
            </TouchableOpacity>
          </View>

          <View style={RecordScreenStyle.secondaryContainer}>
      
              <View style={RecordScreenStyle.refractiveMenu}>
                <TouchableOpacity onPress={()=> this.setState({ddlSelectedValue:'1'})}>
                  <Text style={(this.state.ddlSelectedValue=='1')?RecordScreenStyle.selectedMenuText:RecordScreenStyle.unselectedMenuText}>遠視</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.setState({ddlSelectedValue:'0'})}>
                  <Text style={(this.state.ddlSelectedValue=='0')?RecordScreenStyle.selectedMenuText:RecordScreenStyle.unselectedMenuText}>近視</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.setState({ddlSelectedValue:'2'})}>
                  <Text style={(this.state.ddlSelectedValue=='2')?RecordScreenStyle.selectedMenuText:RecordScreenStyle.unselectedMenuText}>散光</Text>
                </TouchableOpacity>
              </View>
              
              <View style={RecordScreenStyle.linechart}>
                <RenderLineChart dataArr={data} dateArr={this.state.dates} refractive={this.state.ddlSelectedValue} isLeft={this.state.Leye} selectedIndex={this.state.index}/>
              
              <View style={RecordScreenStyle.contentContainer}>
                <View style={RecordScreenStyle.eyesButton}>
                  <TouchableOpacity  activeOpacity= {0.8} onPress={()=> this.setState({ Leye: !this.state.Leye})}> 
                    <Image source={this.state.Leye? LeftOpen : RightOpen}/>
                  </TouchableOpacity> 
                </View>

                <View style={RecordScreenStyle.datesButton}>
                  <TouchableOpacity onPress={GetBack}>
                    <Image source={BackArrow} />
                  </TouchableOpacity>
                  <Text style={RecordScreenStyle.dateText}>{this.state.ddlSelectedDate}</Text>
                  <TouchableOpacity onPress={GetNext}>
                    <Image source={NextArrow} />
                  </TouchableOpacity>
                </View>

                <View style={RecordScreenStyle.content}>
                  <RenderContent isLeft={this.state.Leye} ddlValue={this.state.ddlSelectedValue} data={data} selectedDate={this.state.ddlSelectedDate} index={this.state.index} dateArr={this.state.dates} />
                </View>

              </View>
                
                <View style={RecordScreenStyle.addRecordButton}>
                  <Button title="輸入數據" onPress={pressHandler}/>
                </View>
            
            </View>
          </View>
          </LinearGradient>
        </View>
        )

  }
}

export const RenderContent = props => {
    const{ isLeft, ddlValue, data, selectedDate,index,dateArr} = props;

    if(data == null){
      return(
        <Text style={RecordScreenStyle.contentText}>暫無數據</Text>
        );
    }
    
    switch(ddlValue){
        case '0':
            if(isLeft){
                if(data[selectedDate].L_Myopia!="0"){
                    return(
                    <View>
                      <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].L_Myopia}度</Text>
                      <RenderWarning degree={data[selectedDate].L_Myopia} refractive={'M'}/>
                      <RenderAmblyopiaWarning Ldegree={data[selectedDate].L_Myopia} Rdegree={data[selectedDate].R_Myopia}/>
                      
                    </View>
                    )
                }
                else{
                    return(
                      <View>
                        <Text style={RecordScreenStyle.degreeText}>你的左眼沒有近視</Text>
                        <RenderAmblyopiaWarning Ldegree={data[selectedDate].L_Myopia} Rdegree={data[selectedDate].R_Myopia}/>
                      </View>
                    )
                    
                }
            }
            else{
                if(data[selectedDate].R_Myopia!="0"){
                  return(
                  <View>
                    <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].R_Myopia}度</Text>
                    <RenderWarning degree={data[selectedDate].R_Myopia} refractive={'M'}/>
                    <RenderAmblyopiaWarning Ldegree={data[selectedDate].L_Myopia} Rdegree={data[selectedDate].R_Myopia}/>
                  </View>
                  )}
                else{
                    return(
                      <View>
                        <Text style={RecordScreenStyle.degreeText}>你的右眼沒有近視</Text>
                        <RenderAmblyopiaWarning Ldegree={data[selectedDate].L_Myopia} Rdegree={data[selectedDate].R_Myopia}/>
                      </View>
                    )
                }                
            }
        
        case '1':
            if(isLeft){
                if(data[selectedDate].L_Hyperopia!="0"){
                  return(
                  <View>
                    <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].L_Hyperopia}度</Text>
                    <RenderWarning degree={data[selectedDate].L_Hyperopia} refractive={'H'}/>
                  </View>
                  )}
                else{
                    return<Text style={RecordScreenStyle.degreeText}>你的左眼沒有遠視</Text>
                }
            }
            else{
                if(data[selectedDate].R_Hyperopia!="0"){
                    return(
                    <View>
                      <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].R_Hyperopia}度</Text>
                      <RenderWarning degree={data[selectedDate].R_Hyperopia} refractive={'H'}/>
                    </View>
                    )}
                else{
                    return<Text style={RecordScreenStyle.degreeText}>你的右眼沒有遠視</Text>
                }                
            }
        
        case '2':
            if(isLeft){
                if(data[selectedDate].L_CYL!="0"){
                    return(
                      <View>
                    <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].L_CYL}度</Text>
                    <RenderWarning degree={data[selectedDate].L_CYL} refractive={'A'}/>
                      </View>
                    )}
                else{
                    return<Text style={RecordScreenStyle.degreeText}>你的左眼沒有散光</Text>
                }
            }
            else{
                if(data[selectedDate].R_CYL!="0"){
                    return(
                    <View>
                      <Text style={RecordScreenStyle.degreeText}>{data[selectedDate].R_CYL}度</Text>
                      <RenderWarning degree={data[selectedDate].R_CYL} refractive={'A'}/>
                    </View>
                    )}
                else{
                    return<Text style={RecordScreenStyle.degreeText}>你的右眼沒有散光</Text>
                }                
            }
              
    }
}

export const RenderWarning = props=>{
  const {degree, refractive} = props;
  switch(refractive){
    case 'M':
      if(degree < 100){
        return(
        <View >
          <Text style={RecordScreenStyle.contentText}>您有很淺的近視</Text>
          <Text style={RecordScreenStyle.contentText}>距離淺近視還有{100-degree}度</Text>
        </View>
        );
      }
      if(degree<300){
        return(
        <View>
          <Text style={RecordScreenStyle.contentText}>您有淺近視</Text>
          <Text style={RecordScreenStyle.contentText}>距離中度近視還有{300-degree}度</Text>
        </View>
        );
      }
      else if(degree<575){
        return(
        <View>
          <Text style={RecordScreenStyle.contentText}>您有中度近視</Text>
          <Text style={RecordScreenStyle.contentText}>距離深近視還有{575-degree}度</Text>
        </View>
        
        )
      }
      else{
        return(<Text style={RecordScreenStyle.contentText}>您有深近視</Text>)
      }
  
    case 'H':
      if(degree<200){
        return(
          <View>
          <Text style={RecordScreenStyle.contentText}>您有淺遠視</Text>
          <Text style={RecordScreenStyle.contentText}>距離中度遠視還有{200-degree}度</Text>
        </View>
          )
      }
      else if(degree<500){
        return(
          <View>
          <Text style={RecordScreenStyle.contentText}>您有中度遠視</Text>
          <Text style={RecordScreenStyle.contentText}>距離深遠視還有{500-degree}度</Text>
        </View>
          )
      }
      else {
      <View>
        <Text style={RecordScreenStyle.contentText}>您有深遠視</Text>
      </View>
      }
    case 'A':
      if(degree<75){
        return(<Text style={RecordScreenStyle.contentText}>您有淺散光</Text>)
      }
      else if(degree<175){
        return(<Text style={RecordScreenStyle.contentText}>您有中度散光</Text>)
      }
      else{
        return(
        <View>
          <Text style={RecordScreenStyle.contentText}>您有深散光</Text>
          <Text style={RecordScreenStyle.contentText}>有形成弱視的風險</Text>
        </View>
        );
      }

  }
}

export const RenderAmblyopiaWarning = props=>{
  const {Ldegree, Rdegree} = props;
  if(Math.abs(Ldegree - Rdegree) >= 300){
    return(
      <Text style={RecordScreenStyle.warningText}>雙眼近視度數偏差超過300度，有形成弱視的風險! </Text>
    );
  }
  else return null;

}


export const RenderLineChart = props=>{
  const {dataArr,dateArr,refractive,isLeft,selectedIndex} = props;

  if(dataArr == null){
    return(
      <Text>暫無數據</Text>
      );
  }

  var output = [];
  switch(refractive){
    case '0':{
      for (const date of dateArr){
        output.push (isLeft? dataArr[date].L_Myopia : dataArr[date].R_Myopia);
      }
      break;
    }
  
    case '1':{
      for (const date of dateArr){
        output.push (isLeft? dataArr[date].L_Hyperopia : dataArr[date].R_Hyperopia);
      }
      break;
    }
    case '2':{
        for (const date of dateArr){
          output.push (isLeft? dataArr[date].L_CYL : dataArr[date].R_CYL);
        }
        break;
    }
  } 

  if(output.length>0){
    return(
      <LineChart data={output} dateArr={dateArr} selectedIndex={selectedIndex} refractive={refractive}/>
      );
  }
  else{
    return(null);
  }
}


const RecordScreenStyle = StyleSheet.create({

  background: {
    height:"100%",
    backgroundColor: '#24559E',
  },
  title: {
    fontSize:30,
    color: "white",
    fontWeight: '600',
  },
  header: {
    paddingTop:25,
    marginRight:18,
    marginLeft:18,
    flexDirection:'row',
    justifyContent: 'space-between',
    
  },
  secondaryContainer:{
    marginTop:20,
    marginLeft:10,
    marginRight:10,
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  refractiveMenu:{
    paddingTop: 6,
    flexDirection:'row', 
    justifyContent:'space-around',
  },
  selectedMenuText:{
    fontSize: 18,
    color:"#3CA1B7",
    paddingLeft:10,
    paddingRight:10,
    paddingTop:4,
    paddingBottom: 4,
    backgroundColor:"#FFFFFF",
    borderRadius: 10,

  },
  unselectedMenuText:{
    fontSize: 18,
    color:"#FFFFFF",
    paddingLeft:1,
    paddingRight:1,
    marginLeft:8,
    marginRight:8,
    paddingTop:3,
    paddingBottom: 3,
    borderBottomWidth:1.5,
    borderColor: "#B8CAE4"

  },
  contentContainer:{
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft:40,
    marginRight:40,
    marginTop:200,
    paddingBottom:10,
  },
  eyesButton:{
    paddingLeft: 40 ,
    paddingBottom:10,
    paddingTop:15,
  },
  datesButton:{
    flexDirection:'row',
    paddingLeft:40,
    paddingTop:8,
    paddingBottom: 5
  },
  dateText:{
    color: "#2D9CDB",
    fontSize: 18,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:1,
  },
  content:{
    paddingTop:5,
    paddingBottom: 5,
    alignItems: 'center',
  },
  degreeText:{
    color: "#2D9CDB",
    fontSize: 20,
    textAlign:'center',
  },
  contentText:{
    textAlign:'center',
    color: "#2D9CDB",
    fontSize: 16
  },
  warningText:{
    fontSize: 16,
    color: "#FE7171",
    textAlign:'center',
  },
  addRecordButton:{
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:100,
    paddingRight: 100
  },
  linechart:{
    height:"100%"
  }
});