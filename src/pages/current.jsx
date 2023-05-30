import axios from "axios";
import useGeolocation from "../hooks/useGeolocation";
import { useEffect, useState } from "react";

export default function Current() {
  const [center, setCenter] = useState("");
  const [dusty, setDusty] = useState();
  const [address, setAddress] = useState("");
  const [grade, setGrade] = useState("");
  const [gradeLan, setGradeLan] = useState("");
  const [oz, setOz] = useState(""); // 오존
  const [ozGrade, setOzGrade] = useState(""); // 오존등급
  const [ozGradeLan, setOzGradeLan] = useState(""); // 오존등급
  const [co, setCo] = useState(""); // 일산화탄소
  const [coGrade, setCoGrade] = useState(""); // 일산화탄소등급
  const [coGradeLan, setCoGradeLan] = useState(""); // 일산화탄소등급
  const [so, setSo] = useState(""); // 아황산가스
  const [soGrade, setSoGrade] = useState(""); // 아황산가스등급
  const [soGradeLan, setSoGradeLan] = useState(""); // 아황산가스등급
  const [no, setNo] = useState(""); // 이산화질소
  const [noGrade, setNoGrade] = useState(""); // 이산화질소등급
  const [noGradeLan, setNoGradeLan] = useState(""); // 이산화질소등급
  const [khai, setKhai] = useState(""); // 통합대기
  const [khaiGrade, setKhaiGrade] = useState(""); // 통합대기등급
  const [khaiGradeLan, setKhaiGradeLan] = useState(""); // 통합대기등급

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
      const addr = response4.data.documents[0].address.region_2depth_name; // 원래는 road_address.region_2depth_name인데 왜 오류나지..?
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
      const oz = response3.data.response.body.items[0].o3Value;
      const ozGrade = response3.data.response.body.items[0].o3Grade;
      const co = response3.data.response.body.items[0].coValue;
      const coGrade = response3.data.response.body.items[0].coGrade;
      const so = response3.data.response.body.items[0].so2Value;
      const soGrade = response3.data.response.body.items[0].so2Grade;
      const no = response3.data.response.body.items[0].no2Value;
      const noGrade = response3.data.response.body.items[0].no2Grade;
      const khai = response3.data.response.body.items[0].khaiValue;
      const khaiGrade = response3.data.response.body.items[0].khaiGrade;
      setDusty(dust);
      setGrade(grade);
      setOz(oz); // 오존
      setOzGrade(ozGrade); // 오존등급
      setCo(co); // 일산화탄소
      setCoGrade(coGrade); // 일산화탄소등급
      setSo(so); // 아황산가스
      setSoGrade(soGrade); // 아황산가스등급
      setNo(no); // 이산화질소
      setNoGrade(noGrade); // 이산화질소등급
      setKhai(khai); // 통합대기
      setKhaiGrade(khaiGrade); // 통합대기등급
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
      document.documentElement.classList.add("dark");
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

  useEffect(() => {
    if (ozGrade === "1") {
      setOzGradeLan("좋음");
    } else if (ozGrade === "2") {
      setOzGradeLan("보통");
    } else if (ozGrade === "3") {
      setOzGradeLan("나쁨");
    } else if (ozGrade === "4") {
      setOzGradeLan("매우나쁨");
    } else {
      setOzGradeLan("-");
    }
  }, [ozGrade]);

  useEffect(() => {
    if (coGrade === "1") {
      setCoGradeLan("좋음");
    } else if (coGrade === "2") {
      setCoGradeLan("보통");
    } else if (coGrade === "3") {
      setCoGradeLan("나쁨");
    } else if (coGrade === "4") {
      setCoGradeLan("매우나쁨");
    } else {
      setCoGradeLan("-");
    }
  }, [coGrade]);

  useEffect(() => {
    if (soGrade === "1") {
      setSoGradeLan("좋음");
    } else if (soGrade === "2") {
      setSoGradeLan("보통");
    } else if (soGrade === "3") {
      setSoGradeLan("나쁨");
    } else if (soGrade === "4") {
      setSoGradeLan("매우나쁨");
    } else {
      setSoGradeLan("-");
    }
  }, [soGrade]);
  useEffect(() => {
    if (noGrade === "1") {
      setNoGradeLan("좋음");
    } else if (noGrade === "2") {
      setNoGradeLan("보통");
    } else if (noGrade === "3") {
      setNoGradeLan("나쁨");
    } else if (noGrade === "4") {
      setNoGradeLan("매우나쁨");
    } else {
      setNoGradeLan("-");
    }
  }, [noGrade]);

  useEffect(() => {
    if (khaiGrade === "1") {
      setKhaiGradeLan("좋음");
    } else if (khaiGrade === "2") {
      setKhaiGradeLan("보통");
    } else if (noGrade === "3") {
      setKhaiGradeLan("나쁨");
    } else if (khaiGrade === "4") {
      setKhaiGradeLan("매우나쁨");
    } else {
      setKhaiGradeLan("-");
    }
  }, [khaiGrade]);
  return (
    <div>
      현재위치: {address}
      <br />
      미세먼지: {dusty}
      <br />
      등급: {gradeLan}
      <br />
      오존: {oz} {ozGradeLan}
      <br />
      일산화탄소: {co} {coGradeLan}
      <br />
      아황산가스: {so} {soGradeLan}
      <br />
      이산화질소: {no} {noGradeLan}
      <br />
      통합대기: {khai} {khaiGradeLan}
    </div>
  );
}
