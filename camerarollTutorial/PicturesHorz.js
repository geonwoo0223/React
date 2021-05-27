import React from 'react';
import {
  Platform,
  PermissionsAndroid,
  View,
  Image,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";


export default class Pictures extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data: []
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
        for (let picture of res.edges) {
          const pictureForm = {
            timestamp : picture.node.timestamp*1000,
            location : picture.node.location,
            uri: picture.node.image.uri
          }
          this.setState({ ...this.state, data: [ pictureForm, ...this.state.data ]})
        }
      })
      .catch((error) => {
         console.log(error);
      });
    
  }

  toFormData = (item) => {
    console.log(item)
    const time = new Date(item.timestamp)
    console.log("시간", time)
  }

  render(){



    const renderdata = ({ item }) => (
      <TouchableOpacity onPress={() => this.toFormData(item) }>
          <View>
            <Image 
              style={{ width: (screenWidth-6)/3, height: (screenWidth-6)/3, margin:1}} 
              source={{ uri: item.uri }} />
          </View>
      </TouchableOpacity>
    )

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    return(
      <View>
        <FlatList
          ListHeaderComponent = {
            <View>
                <Text style={{ fontSize: screenHeight/30 }}>제주공항 (09:15~09:50)</Text>
            </View>
          }
          data={this.state.data}
          numColumns={3}
          renderItem={renderdata}
          keyExtractor = {(data) => data.timestamp}
        />
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
