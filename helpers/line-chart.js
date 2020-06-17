import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import Svg, { Defs,Stop, Circle, Rect,G,Path, LinearGradient,Text } from 'react-native-svg';
import {scaleLinear,scaleTime} from 'd3-scale';
import moment from 'moment';

export default class LineChart extends React.Component {

  x_scale = (val,dateArr,paddingRight,width) => {
    const x = scaleTime()
    .domain([moment(dateArr[0], 'YYYY-MM-DD').toDate(), moment(dateArr[dateArr.length-1], 'YYYY-MM-DD').toDate()])
    .range([paddingRight, width-paddingRight])
    
    return(x(val));
  }

  y_scale = (val,data,height,paddingTop ) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const y = scaleLinear()
    .domain([min,max])
    .range([height, 0]);
    return(Math.floor((( y(val)) / 4) * 3 + paddingTop));
  }

  renderStop = (data,dateArr,width,paddingRight)=>{
    const colourScale = scaleLinear()
    .domain([0,325,600])
    .range(["#9AFF98","#FFE353","#FE7171"]);

    const offsetScale = scaleLinear()
    .domain([paddingRight,width-paddingRight])
    .range([0,1]);

    const output = [];
    dateArr.forEach((item,index)=>{
      //console.log(offsetScale(this.x_scale(moment(item, 'YYYY-MM-DD').toDate(), dateArr,paddingRight,width)))
      //console.log((data[index]))
      output.push(
        <Stop
          key={index}
          offset = {offsetScale(this.x_scale(moment(item, 'YYYY-MM-DD').toDate(), dateArr,paddingRight,width))}
          stopColor = {colourScale(data[index])}
        />
      )
    })
    return output;
  }

  renderDefs = config=>{
    const {dateArr,width,data,paddingRight} = config;
    
    return(
      <Defs>
        <LinearGradient
          id="fillGradient"
          x1={0}
          y1={0}
          x2={width}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
        {this.renderStop(data,dateArr,width,paddingRight)}
        </LinearGradient>
      </Defs>
    )
  }

  getLinePoints = (datas, config) => {
    const {  dateArr, width, height,paddingRight, paddingTop } = config;

    const x = i => {
      return this.x_scale(moment(dateArr[i], 'YYYY-MM-DD').toDate(), dateArr,paddingRight, width);
    }

    const y = i => {
      return this.y_scale(datas[i],datas,height,paddingTop);
    };

    return [`M${x(0)},220 V${y(0)}`]
      .concat(
        datas.slice(0, -1).map((_, i) => {
          const x_mid = (x(i) + x(i + 1)) / 2;
          const cp_x1 = (x_mid + x(i)) / 2;
          return (
            `Q ${cp_x1}, ${y(i)}, ${x(i + 1)}, ${y(i + 1)}` 
          );
        })
      )
      .join(" ");
  };

  renderLine = config=>{
      const result = this.getLinePoints(config.data, config);
      return(
        <Path
          key={Math.random()}
          d={result.concat('V220')}
          fill="url(#fillGradient)"
          stroke="none"
          strokewidth="0"/>
      );
  
  };

  
  renderDots = config=>{
    const {
      data,
      dateArr,
      selectedIndex,
      width,
      height,
      paddingTop,
      paddingRight
    }=config;

    //const baseHeight = height;
    const output = [];
    config.dateArr.forEach((item, index)=>{
      
      //const cx = paddingRight/2 + (index * (width - paddingRight)) / (data.length-1);
      const cx = this.x_scale(moment(item, 'YYYY-MM-DD').toDate(), dateArr,paddingRight,width);
      const cy = this.y_scale(data[index], data, height,paddingTop);
      
      output.push(
        <>
        <Circle
          key={index}
          cx = {cx}
          cy = {cy}
          r="8"
          fill={index===selectedIndex? "blue": "white"}
          opacity='0.8'
          />
          <Text x={cx} y={cy+25} textAnchor="middle" fill="black">{item}</Text>
        </>
      );
        })
      return output;
  };


  render() {
    const{
      data, dateArr,selectedIndex
    } = this.props;
    return (
      <View >
        <Svg height="220" width= {Dimensions.get("window").width}>
          <Rect 
            width="100%" height="220" fill="salmon" />
          <G>
            {
              this.renderDefs({
                width: Dimensions.get("window").width,
                data: data,
                paddingRight: 20,
                dateArr: dateArr
              })
            }
          </G>
          <G>
            {this.renderLine({
              width:Dimensions.get("window").width,
              height:"220",
              data: data,
              dateArr: dateArr,
              paddingRight: 20,
              paddingTop: 10
            })}
          </G>
          <G>
          {
            this.renderDots({
              width: Dimensions.get("window").width,
              height: "220",
              data: data,
              dateArr:dateArr,
              selectedIndex:selectedIndex,
              paddingRight: 20,
              paddingTop: 10
            })
          }  
          </G>

        </Svg>
      </View>
    );
 }

}

