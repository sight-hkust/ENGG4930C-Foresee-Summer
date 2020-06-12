import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Header } from 'react-native-elements';


const list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: '中度遠視'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: '散光'
    },
    {
        name: 'Amy Farha',
        avatar_url: 'https://lh3.googleusercontent.com/proxy/UEbJBGp4PPWLDRmxbn8Z14xNTxC9CyGHKW78h0scaobZPrfJWsi46VGlVVu7GgIjv9GTXuQGpHq40eI2sFzPC4hoPy1UZgr0h53pf04YGPMWivoRJL0ZMlh-lYWlFsKJl_dSEDzvZpuZRAUcXBLlQBwLwTNzUl0eaS3WRXjISlNgc0wo',
        subtitle: '散光，輕微遠視'
      },
      {
        name: '木村 拓哉',
        avatar_url: 'https://girlstyle-tw.imgix.net/wp-content/uploads/2020/01/15793324522199o3d507707db4ba1f3ed0cba473ed48de9_33241298_200118_0001.jpg',
        subtitle: '中度近視'
      },
      {
        name: '馬車',
        avatar_url: 'https://i.ytimg.com/vi/Ip-qKHzjXkY/hqdefault.jpg',
        subtitle: '嚴重鬥雞眼'
      },
      {
        name: 'Johnny Deep',
        avatar_url: 'https://i.ytimg.com/vi/gaehfHmX6MA/maxresdefault.jpg',
        subtitle: '青光眼'
      },

  ]

const ProfSearchResultScreen = ({ route, navigation }) => {

    return (
        <ScrollView style={DoctorsStyles.content}>
            <Header
                centerComponent={{ text: '搜尋結果', style: { color: 'black', fontSize: 20} }}
                backgroundColor="white"
                barStyle="light-content"
            />
            <View>
                {
                    list.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.avatar_url } }}
                        title={l.name}
                        subtitle={l.subtitle}
                        bottomDivider
                    />
                    ))
                }
            </View>
        </ScrollView>        
    );
}

const DoctorsStyles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',

        alignContent: 'center'
    },
    searchButton: {
       paddingBottom: 100
    }

})

export default ProfSearchResultScreen