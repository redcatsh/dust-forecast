import axios from "axios";
import useGeolocation from "../hooks/useGeolocation";
import { useEffect, useState } from "react";

export default function Current() {
  const [center, setCenter] = useState("");
  const [dusty, setDusty] = useState();
  const [address, setAddress] = useState("");
  const [grade, setGrade] = useState("");
  const [gradeLan, setGradeLan] = useState("");

  const kakao_key = process.env.REACT_APP_KAKAO_KEY;

  const location = useGeolocation();

  const ApiCall = async () => {
    try {
      const response4 = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&y=${location.coordinates.lat}&x=${location.coordinates.lng}`,
        {
          headers: {
            Authorization: "KakaoAK " + kakao_key,
          },
        }
      );
      const addr = response4.data.documents[0].address.region_2depth_name;
      setAddress(addr);

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
      setCenter(station);

      const response3 = await axios.get(
        `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?dataTerm=month&pageNo=1&numOfRows=100&returnType=json&stationName=${station}&serviceKey=${process.env.REACT_APP_DUST_KEY}`
      );
      const dust = response3.data.response.body.items[0].pm10Value;
      const grade = response3.data.response.body.items[0].pm10Grade;
      setDusty(dust);
      setGrade(grade);
    } catch (err) {
      console.log("Error >>", err);
    }
  };
  // ApiCall();

  useEffect(() => {
    ApiCall();
  }, [location]);

  useEffect(() => {
    if (grade === "1") {
      setGradeLan("좋음");
    } else if (grade === "2") {
      setGradeLan("보통");
    } else if (grade === "3") {
      setGradeLan("나쁨");
    } else if (grade === "4") {
      setGradeLan("매우나쁨");
    } else {
      setGradeLan("-");
    }
  }, [grade]);
  return (
    <div>
      현재위치: {address}
      <br />
      농도: {dusty}
      <br />
      등급: {gradeLan}
    </div>
  );
}
