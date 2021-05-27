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
  ScrollView,
  SectionList,
  TouchableHighlightBase
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";

import { LogLevel, RNFFmpeg, RNFFmpegConfig, RNFFprobe } from 'react-native-ffmpeg'
export default class PicturesToVideo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
      first: 10,
      assetType: 'Photos',
      include: [
        'location', 'imageSize', 'filename','fileSize',
      ],
    })
    .then(res => {
      for (let picture of res.edges) {
        // console.log(picture)
        const pictureForm = {
          id: picture.node.timestamp,
          rr_id: 0,
          filename: picture.node.image.filename,
          fileSize: picture.node.image.fileSize,
          timestamp : picture.node.timestamp * 1000, // s 단위로 오는거 ms 단위로 바꿔줘야한다
          location : picture.node.location,
          uri: picture.node.image.uri,
          imageSize: {
            height : picture.node.image.height,
            width : picture.node.image.width
          },
          type: picture.node.type
        }
        this.setState({ data: [ ...this.state.data, pictureForm]})
      } 

    })
    .catch(error => {
      console.log("하루에 대한 사진불러오기 에러", error)
    })

    
  }

  toVideo() {

    RNFFmpeg.execute('-i file1.mp4').then(result => console.log(result))
    // RNFFmpegConfig.getLastReturnCode().then(returncode => console.log(returncode))
  }

  render(){

    const renderdata = ({ item }) => (
      <View>
        <TouchableOpacity onPress={() => console.log(item)} style={{ backgroundColor:'pink',margin:1}}>
          <Image 
            style={{ width: (screenWidth-6)/3, height: (screenWidth-6)/3}} 
            source={{ uri: item.uri }} />
        </TouchableOpacity>
      </View> 
    )

    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;

    return(
      <View >
        <Text>Hi</Text>
        <FlatList
          data={this.state.data}
          numColumns={3}
          renderItem={renderdata}
          keyExtractor={(data) => data.filename}
        />
        <TouchableOpacity style={{ height: 30, backgroundColor: 'green'}} onPress={() => this.toVideo()}>
          <Text> 돋영상 만들기 </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  selectContainer: {
    margin: Dimensions.get('window').width/50,
    position: "absolute",
    top: 0,
    right: 0,
    width: Dimensions.get('window').width/6,
    height: Dimensions.get('window').width/6,
  },
  selectArea: {
    height: Dimensions.get('window').width/6,
    width: Dimensions.get('window').width/6,
  },
  selectIcon1: {
    position: 'absolute', 
    right: 0,
  },
  selectIcon2: {
    position: 'absolute', 
    right: 0,
    opacity: 0.4,
  },
  selectIcon3: {
    position: 'absolute', 
    right: 0,
    opacity: 0.5,
  },
  selectedBorder: {
    borderWidth: 6,
    borderColor: 'black'
  }
});

