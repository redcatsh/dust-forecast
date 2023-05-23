import axios from "axios";
import useGeolocation from "../hooks/useGeolocation";
import { useState } from "react";

export default function Current() {
  const [center, setCenter] = useState("");
  const [dusty, setDusty] = useState();

  const kakao_key = process.env.REACT_APP_KAKAO_KEY;

  const location = useGeolocation();
  // async/await 를 활용하는 수정된 방식

  const TestApiCall = async () => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${location.coordinates.lng}&y=${location.coordinates.lat}&input_coord=WGS84&output_coord=TM`,
        {
          headers: {
            Authorization: "KakaoAK " + kakao_key,
          },
        }
      );
      const coord = response.data.documents[0];

      const response2 = await axios.get(
        `http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${Number(
          coord.x
        )}&tmY=${Number(coord.y)}&returnType=json&serviceKey=${
          process.env.REACT_APP_DUST_KEY
        }`
      );
      const station = response2.data.response.body.items[0].stationName;
      console.log(station);
      setCenter(station);

      const response3 = await axios.get(
        `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?dataTerm=month&pageNo=1&numOfRows=100&returnType=json&stationName=${station}&serviceKey=${process.env.REACT_APP_DUST_KEY}`
      );
      const dust = response3.data.response.body.items[0].pm10Value;
      console.log(dust);
      setDusty(dust);
    } catch (err) {
      console.log("Error >>", err);
    }
  };
  TestApiCall();
  return (
    <div>
      측정소: {center} 농도: {dusty}
    </div>
  );
}
