import React from 'react';
import styled from "styled-components";

/*global kakao*/ 

class App extends React.Component{

    componentDidMount() {
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=235ab8f9ec742697526d9636e171b0db&libraries=LIBRARY";
        document.head.appendChild(script);

      script.onload = () => {
        kakao.maps.load(() => {
          let container = document.getElementById("map");
          let options = {
            center: new kakao.maps.LatLng(37.506502, 127.053617),
            level: 7,
            
          };
  
          const map = new window.kakao.maps.Map(container, options);


          var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(37.56812, 126.97869), // 마커의 좌표
            map: map // 마커를 표시할 지도 객체
          });



        });
      };
    }
    render(){
        return(
            <Maps id="map">
            </Maps>
        )
    }
}
const Maps = styled.div`
width: 100%;
height: 100%;
`;

// const Head = styled.h1`
// text-align: center;
// `

export default App;