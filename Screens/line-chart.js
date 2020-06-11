import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';
import Svg, { Circle, Rect,G,Path } from 'react-native-svg';

export default class LineChart extends React.Component {
  calcScaler = data => {
      return Math.max(...data) - Math.min(...data) || 1;
  };

  calcBaseHeight = (data, height) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    if (min >= 0 && max >= 0) {
      return height;
    } else if (min < 0 && max <= 0) {
      return 0;
    } else if (min < 0 && max > 0) {
      return (height * max) / this.calcScaler(data);
    }
  };

  calcHeight = (val, data, height) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    if (min < 0 && max > 0) {
      return height * (val / this.calcScaler(data));
    } else if (min >= 0 && max >= 0) {
      return this.props.fromZero
        ? height * (val / this.calcScaler(data))
        : height * ((val - min) / this.calcScaler(data));
    } else if (min < 0 && max <= 0) {
      return this.props.fromZero
        ? height * (val / this.calcScaler(data))
        : height * ((val - max) / this.calcScaler(data));
    }
  };


  getLinePoints = (dataset, config) => {
    const { width, height } = config;

    const datas = dataset.data;
    const x = i =>
      Math.floor(
        (i * (width)) / datas.length
      );
    const baseHeight = this.calcBaseHeight(datas, height);
    const y = i => {
      const yHeight = this.calcHeight(datas[i], datas, height);
      return Math.floor(((baseHeight - yHeight) / 4) * 3);
    };

    return [`M${x(0)},${y(0)}`]
      .concat(
        dataset.data.slice(0, -1).map((_, i) => {
          const x_mid = (x(i) + x(i + 1)) / 2;
          const y_mid = (y(i) + y(i + 1)) / 2;
          const cp_x1 = (x_mid + x(i)) / 2;
          const cp_x2 = (x_mid + x(i + 1)) / 2;
          return (
            `Q ${cp_x1}, ${y(i)}, ${x_mid}, ${y_mid}` +
            ` Q ${cp_x2}, ${y(i + 1)}, ${x(i + 1)}, ${y(i + 1)}`
          );
        })
      )
      .join(" ");
  };

  renderLine = config=>{
    return config.data.map((dataset, index)=>{
      const result = this.getLinePoints(dataset, config);
      return(
        <Path
          key={index}
          d={result}
          fill="none"
          stroke="white"
          strokewidth="3"/>
      );
    });
  };

  render() {
    const{
      data
    } = this.props;
    return (
      <View style={borderRadius = 0,
                    paddingTop = 16,
                    paddingRight = 64,
                    margin = 0,
                    marginRight = 0,
                    paddingBottom = 0}>
        <Svg height="220" width= {Dimensions.get("window").width}>
          <Rect 
            width="100%" height="220" fill="salmon" />
          <G>
            {this.renderLine({
              width:Dimensions.get("window").width,
              height:"220",
              data: data.datasets
            })}
          </G>
        </Svg>
      </View>
    );
  }
}
