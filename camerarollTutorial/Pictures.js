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

import base64 from "react-native-base64"

export default class Pictures extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      status: "rest",
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

    function changeTime(time) {
      const tempTime = time.split(' ')
      const toDate = tempTime[0].split('-')
      const toTime = tempTime[1].split(':')
      return new Date(toDate[0],toDate[1]-1,toDate[2],toTime[0].slice(1),toTime[1],toTime[2]).getTime()
    }

    const dayRecs = {
      dr_id : 1,
      dr_date : "2021-05-15",
      dr_start_time : "2021-05-15 T08:30:30",
      dr_end_time : "2021-05-15 T15:00:00",
      routeRecs: [
        { "rr_id": 1, "rr_name": "처음 여행지", "rr_memo": "처음 여행지 메모다", "rr_time": "2021-05-15 T08:30:30", "imgRecs": [] },
        { "rr_id": 2, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:16:25", "imgRecs": [] },
        { "rr_id": 3, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:17:25", "imgRecs": [] },
        { "rr_id": 4, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:18:25", "imgRecs": [] },
        { "rr_id": 5, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:19:25", "imgRecs": [] },
        { "rr_id": 6, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:20:25", "imgRecs": [] },
        { "rr_id": 7, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:21:25", "imgRecs": [] },
        { "rr_id": 8, "rr_name": "중간 여행지", "rr_memo": "중간 여행지 메모다", "rr_time": "2021-05-15 T10:22:25", "imgRecs": [] },
        { "rr_id": 9, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:33:25", "imgRecs": [] },
        { "rr_id": 10, "rr_name": null, "rr_memo": null, "rr_time": "2021-05-15 T10:34:25", "imgRecs": [] },
        { "rr_id": 11, "rr_name": "마지막 여행지", "rr_memo": "마지막 여행지 메모다", "rr_time": "2021-05-15 T10:35:25", "imgRecs": [] },
      ]
    }

    // console.log(changeTime(dayRecs.routeRecs[0].rr_time))


    const tempPictures = []

    const unsortedSet = {
      id: "도로",
      title: "도로",
      fromTime: dayRecs.dr_start_time,
      toTime: dayRecs.dr_end_time,
      data: [{
        id: "도로",
        list: []
      }]
    }

    for ( var index in dayRecs.routeRecs) {

      var route = dayRecs.routeRecs[index]
      var fromTime = route.rr_time
      var toTime = dayRecs.dr_end_time
      if ( index < dayRecs.routeRecs.length - 1 ) {
        var toTime = dayRecs.routeRecs[Number(index)+1].rr_time
      } 

      // console.log("#",Number(index)+1,"   from: ", fromTime, "///to: ",toTime)
      
      if ( route.rr_name !== null) {
        const pictureSet = {
          id: route.rr_id,
          title: route.rr_name,
          fromTime: fromTime,
          toTime: toTime,
          data: [{
            id: route.rr_name,
            list: []
          }]
        }
        tempPictures.push(pictureSet)
      } else if ( unsortedSet.id === "도로") {
        unsortedSet.id = route.rr_id
      }
    }

    tempPictures.push(unsortedSet)

    // console.log(tempPictures)

    await CameraRoll.getPhotos({
      first: 10000,
      assetType: 'Photos',
      include: [
        'location', 'imageSize'
      ],
      fromTime: changeTime(dayRecs.dr_start_time),
      toTime: changeTime(dayRecs.dr_end_time)
    })
    .then(res => {
      for (let picture of res.edges) {
        // console.log(picture)
        const pictureForm = {
          id: picture.node.timestamp,
          rr_id: 0,
          timestamp : picture.node.timestamp * 1000, // s 단위로 오는거 ms 단위로 바꿔줘야한다
          location : picture.node.location,
          uri: picture.node.image.uri,
          imageSize: {
            height : picture.node.image.height,
            width : picture.node.image.width
          },
          type: picture.node.type
        }
        for ( var tempPicture of tempPictures) {
          if ( pictureForm.timestamp >= changeTime(tempPicture.fromTime) && pictureForm.timestamp <= changeTime(tempPicture.toTime) ) {
            pictureForm.rr_id = tempPicture.id
            tempPicture.data[0].list.unshift(pictureForm)
            break
          } 
        }
      } 
      for ( var tempPicture of tempPictures) {
        this.setState({ ...this.state, data: [ ...this.state.data, tempPicture]})
        // console.log(JSON.stringify(this.state.data,null,2))
      }
    })
    .catch(error => {
      console.log("하루에 대한 사진불러오기 에러", error)
    })

    
  }


  toFormData = async (item) => {
    
    // const data = new FormData()
    const encode = await base64.encode(item.uri)
    console.log(item.rr_id)
    console.log(item.imageSize)
    console.log(item.uri)
    const form = {
      'rr_id': item.rr_id,
      'height': item.imageSize.height,
      'width': item.imageSize.width,
      'irImage': encode
    }
    // data.append(form)
    console.log(JSON.stringify(form,null,2))
  }

  render(){

    const renderdata = ({ item }) => (
      <View>
      <TouchableOpacity onPress={() => this.toFormData(item)} style={{margin:1}}>
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
        <SectionList
          sections={this.state.data}
          keyExtractor = {(data) => data.id}
          renderItem={({ item }) => (
            <FlatList
              data={item.list}
              numColumns={3}
              renderItem={renderdata}
            />
          )}
          renderSectionHeader={({ section : { title }}) => (
            <Text> { title } </Text>
          )}
        />
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

