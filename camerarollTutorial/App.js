import React from 'react';
import {
  Platform,
  PermissionsAndroid,
  View,
  Image,
  FlatList,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data:''
    };
  }

  async componentDidMount(){
    if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permission Explanation',
            message: 'ReactNativeForYou would like to access your photos!',
          },
        );
        if (result !== 'granted') {
          console.log('Access to pictures was denied');
          return;
        }
      }

      CameraRoll.getPhotos({
        first: 50,
        assetType: 'Photos',
      })
      .then(res => {
        console.log(res.edges)
        this.setState({ data: res.edges });
      })
      .catch((error) => {
         console.log(error);
      });
    
  }


  render(){
    return(
        <View>
          <Text>hello</Text>
          <FlatList
              data={this.state.data}
              numColumns={3}
              renderItem={({ item }) => <Image
                  style={{
                      width: '33%',
                      height: 150,
                  }}
                  source={{ uri: item.node.image.uri }}
              />}
          />
          {/* <ScrollView>
            {this.state.data.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{ uri: p.node.image.uri }}
              />
            );
          })}
          </ScrollView> */}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
