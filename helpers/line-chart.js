import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Defs, Stop, Circle, Rect, G, Path, LinearGradient, Text } from "react-native-svg";
import { scaleLinear, scaleTime } from "d3-scale";
import moment from "moment";
import { ScreenWidth, ScreenHeight } from "../constant/Constant";

export default class LineChart extends React.Component {
  x_scale = (val, dateArr, paddingRight) => {
    const x = scaleTime()
      .domain([moment(dateArr[0], "YYYY-MM-DD").toDate(), moment(dateArr[dateArr.length - 1], "YYYY-MM-DD").toDate()])
      .range([paddingRight / 2 + 25, ScreenWidth - paddingRight * 1.5 - 25]);

    return x(val);
  };

  y_scale = (val, paddingTop) => {
    //const min = Math.min(...data);
    //const max = Math.max(...data);
    //const y = scaleLinear().domain([0, 800]).range([170, 10]);
    const y = scaleLinear()
      .domain([0, 900, 1800])
      .range([ScreenHeight / 5, 15, 15]);
    return Math.floor((y(val) / 4) * 3 + paddingTop);
  };
  //alternative colour code: red: #FF676C, yellow: #FFDF4D, green: #5BC0AD
  //Alternative colour code: red: #fe7470, yellow: #ffdf54, green: #7be0a3
  CalColourScale = (refractive) => {
    switch (refractive) {
      case "0": //Myopia
        return scaleLinear().domain([0, 375, 600, 1000]).range(["#5BC0AD", "#FFDF4D", "#FF676C", "#FF676C"]);

      case "1":
        return scaleLinear().domain([0, 225, 525, 1000]).range(["#5BC0AD", "#FFDF4D", "#FF676C", "#FF676C"]);
      case "2":
        return scaleLinear().domain([0, 100, 200, 600]).range(["#5BC0AD", "#FFDF4D", "#FF676C", "#FF676C"]);
    }
  };

  renderStop = (data, dateArr, width, paddingRight, refractive) => {
    const colourScale = this.CalColourScale(refractive);

    const offsetScale = scaleLinear()
      .domain([paddingRight, width - paddingRight])
      .range([0, 1]);

    const output = [];
    dateArr.forEach((item, index) => {
      output.push(<Stop key={index} offset={offsetScale(this.x_scale(moment(item, "YYYY-MM-DD").toDate(), dateArr, paddingRight))} stopColor={colourScale(data[index])} />);
    });
    return output;
  };

  renderDefs = (config) => {
    const { dateArr, data, paddingRight, refractive } = config;

    return (
      <Defs>
        <LinearGradient id="fillGradient" x1={0} y1={0} x2={ScreenWidth} y2={0} gradientUnits="userSpaceOnUse">
          {this.renderStop(data, dateArr, ScreenWidth, paddingRight, refractive)}
        </LinearGradient>
      </Defs>
    );
  };

  getLinePoints = (datas, config) => {
    const { dateArr, height, paddingRight, paddingTop } = config;

    const x = (i) => {
      return this.x_scale(moment(dateArr[i], "YYYY-MM-DD").toDate(), dateArr, paddingRight);
    };

    const y = (i) => {
      return this.y_scale(datas[i], paddingTop);
    };
    const startingPoint = 2;
    const verticalPoint = y(0) + 13;
    const horizontalLine = ScreenWidth - config.paddingRight;
    const lastPoint = y(dateArr.length - 1);
    return [`M${startingPoint},750 V${verticalPoint} Q ${startingPoint}, ${y(0)}, ${x(0)}, ${y(0)} `]
      .concat(
        datas.slice(0, -1).map((_, i) => {
          const x_mid = (x(i) + x(i + 1)) / 2;

          return `Q ${x_mid}, ${y(i)}, ${x(i + 1)}, ${y(i + 1)}`;
        })
      )
      .join(" ")
      .concat(`Q ${horizontalLine}, ${lastPoint}, ${horizontalLine}, ${lastPoint + 13}  V750 `);
  };

  renderLine = (config) => {
    const result = this.getLinePoints(config.data, config);

    return <Path key={Math.random()} d={result} fill="url(#fillGradient)" stroke="none" strokewidth="0" />;
  };

  renderDots = (config) => {
    const { data, dateArr, full_dateArr, selectedIndex, height, paddingTop, paddingRight } = config;

    //const baseHeight = height;
    const output = [];
    const lastIndex = dateArr.length - 1;
    const firstIndex = 0;
    config.dateArr.forEach((item, index) => {
      //console.log("selected index:",full_dateArr[selectedIndex])
      //const cx = paddingRight/2 + (index * (width - paddingRight)) / (data.length-1);
      const cx = this.x_scale(moment(item, "YYYY-MM-DD").toDate(), dateArr, paddingRight);
      const cy = this.y_scale(data[index], paddingTop);

      //console.log(lastIndex);
      output.push(
        <G key={index}>
          <Circle
            key={item}
            cx={cx}
            cy={cy}
            r="9"
            stroke={item === full_dateArr[selectedIndex] ? "white" : "#00C2FF"}
            strokeWidth="2"
            fill={item === full_dateArr[selectedIndex] ? "#00C2FF" : "white"}
            opacity={item === full_dateArr[selectedIndex] ? "1" : "0.72"}
          />
          <Text x={cx} y={cy + 30} textAnchor="middle" fill="black" fontSize="19" fontWeight="bold">
            {moment(item).format("YYYY")}
          </Text>
          <Text x={cx} y={cy + 45} textAnchor="middle" fontSize="14" fill={item === full_dateArr[selectedIndex] ? "black" : "none"}>
            {moment(item).format("D[/]M")}
          </Text>
        </G>
      );
    });
    return output;
  };

  render() {
    const { data, dateArr, selectedIndex, refractive, full_dateArr } = this.props;
    //const height = "750";
    const height = ScreenHeight;
    if (data == null) {
      return null;
    } else {
      return (
        <View>
          <Svg height={height} width={ScreenWidth} position="absolute">
            <Rect width="100%" height="100%" fill="none" />
            <G>
              {this.renderDefs({
                data: data,
                paddingRight: 20,
                dateArr: dateArr,
                refractive: refractive,
              })}
            </G>
            <G>
              {this.renderLine({
                height: height,
                data: data,
                dateArr: dateArr,
                paddingRight: 20,
                paddingTop: 10,
              })}
            </G>
            <G>
              {this.renderDots({
                height: height,
                data: data,
                dateArr: dateArr,
                full_dateArr: full_dateArr,
                selectedIndex: selectedIndex,
                paddingRight: 20,
                paddingTop: 10,
              })}
            </G>
          </Svg>
        </View>
      );
    }
  }
}
