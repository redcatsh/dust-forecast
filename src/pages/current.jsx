import axios from "axios";
import useGeolocation from "../hooks/useGeolocation";
import { useEffect, useState, useCallback } from "react";
import "../styles/current.css";
import { PieChart } from "react-minimal-pie-chart";
export default function Current() {
  const [, setCenter] = useState("");
  const [dusty, setDusty] = useState();
  const [address, setAddress] = useState("");
  const [grade, setGrade] = useState("");
  const [gradeLan, setGradeLan] = useState("");
  const [oz, setOz] = useState(""); // 오존
  const [ozGrade, setOzGrade] = useState(""); // 오존등급
  const [ozGradeLan, setOzGradeLan] = useState(""); // 오존등급
  const [ozGradeCol, setOzGradeCol] = useState(""); // 오존등급
  const [co, setCo] = useState(""); // 일산화탄소
  const [coGrade, setCoGrade] = useState(""); // 일산화탄소등급
  const [coGradeLan, setCoGradeLan] = useState(""); // 일산화탄소등급
  const [coGradeCol, setCoGradeCol] = useState(""); // 일산화탄소등급
  const [so, setSo] = useState(""); // 아황산가스
  const [soGrade, setSoGrade] = useState(""); // 아황산가스등급
  const [soGradeLan, setSoGradeLan] = useState(""); // 아황산가스등급
  const [soGradeCol, setSoGradeCol] = useState(""); // 아황산가스등급
  const [no, setNo] = useState(""); // 이산화질소
  const [noGrade, setNoGrade] = useState(""); // 이산화질소등급
  const [noGradeLan, setNoGradeLan] = useState(""); // 이산화질소등급
  const [noGradeCol, setNoGradeCol] = useState(""); // 이산화질소등급
  const [khai, setKhai] = useState(""); // 통합대기
  const [khaiGrade, setKhaiGrade] = useState(""); // 통합대기등급
  const [khaiGradeLan, setKhaiGradeLan] = useState(""); // 통합대기등급
  const [khaiGradeCol, setKhaiGradeCol] = useState(""); // 통합대기등급

  const kakao_key = process.env.REACT_APP_KAKAO_KEY;

  const location = useGeolocation();

  const ApiCall = useCallback(async () => {
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
      const addr2 = response4.data.documents[0].address.region_3depth_name;
      setAddress(`${addr} ${addr2}`);

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
  }, [location, kakao_key]);

  useEffect(() => {
    ApiCall();
  }, [ApiCall]);

  useEffect(() => {
    if (grade === "1") {
      document.documentElement.classList.add("good");
      setGradeLan("좋음");
    } else if (grade === "2") {
      document.documentElement.classList.add("soso");
      setGradeLan("보통");
    } else if (grade === "3") {
      document.documentElement.classList.add("bad");
      setGradeLan("나쁨");
    } else if (grade === "4") {
      document.documentElement.classList.add("verybad");
      setGradeLan("매우나쁨");
    } else {
      document.documentElement.classList.add("good");
      setGradeLan("-");
    }
  }, [grade]);

  useEffect(() => {
    if (ozGrade === "1") {
      setOzGradeLan("좋음");
      setOzGradeCol("#398fff");
    } else if (ozGrade === "2") {
      setOzGradeLan("보통");
      setOzGradeCol("#26cda1");
    } else if (ozGrade === "3") {
      setOzGradeLan("나쁨");
      setOzGradeCol("#e8af6a");
    } else if (ozGrade === "4") {
      setOzGradeLan("매우나쁨");
      setOzGradeCol("#ed6262");
    } else {
      setOzGradeLan("-");
      setOzGradeCol("#398fff");
    }
  }, [ozGrade]);

  useEffect(() => {
    if (coGrade === "1") {
      setCoGradeLan("좋음");
      setCoGradeCol("#398fff");
    } else if (coGrade === "2") {
      setCoGradeLan("보통");
      setCoGradeCol("#26cda1");
    } else if (coGrade === "3") {
      setCoGradeLan("나쁨");
      setCoGradeCol("#e8af6a");
    } else if (coGrade === "4") {
      setCoGradeLan("매우나쁨");
      setCoGradeCol("#ed6262");
    } else {
      setCoGradeLan("-");
      setCoGradeCol("#398fff");
    }
  }, [coGrade]);

  useEffect(() => {
    if (soGrade === "1") {
      setSoGradeLan("좋음");
      setSoGradeCol("#398fff");
    } else if (soGrade === "2") {
      setSoGradeLan("보통");
      setSoGradeCol("#26cda1");
    } else if (soGrade === "3") {
      setSoGradeLan("나쁨");
      setSoGradeCol("#e8af6a");
    } else if (soGrade === "4") {
      setSoGradeLan("매우나쁨");
      setSoGradeCol("#ed6262");
    } else {
      setSoGradeLan("-");
      setSoGradeCol("#398fff");
    }
  }, [soGrade]);

  useEffect(() => {
    if (noGrade === "1") {
      setNoGradeLan("좋음");
      setNoGradeCol("#398fff");
    } else if (noGrade === "2") {
      setNoGradeLan("보통");
      setNoGradeCol("#26cda1");
    } else if (noGrade === "3") {
      setNoGradeLan("나쁨");
      setNoGradeCol("#e8af6a");
    } else if (noGrade === "4") {
      setNoGradeLan("매우나쁨");
      setNoGradeCol("#ed6262");
    } else {
      setNoGradeLan("-");
      setNoGradeCol("#398fff");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noGrade]);

  useEffect(() => {
    if (khaiGrade === "1") {
      setKhaiGradeLan("좋음");
      setKhaiGradeCol("#398fff");
    } else if (khaiGrade === "2") {
      setKhaiGradeLan("보통");
      setKhaiGradeCol("#26cda1");
    } else if (noGrade === "3") {
      setKhaiGradeLan("나쁨");
      setKhaiGradeCol("#e8af6a");
    } else if (khaiGrade === "4") {
      setKhaiGradeLan("매우나쁨");
      setKhaiGradeCol("#ed6262");
    } else {
      setKhaiGradeLan("-");
      setKhaiGradeCol("#398fff");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [khaiGrade]);

  const OzChart = () => {
    return (
      <PieChart
        data={[
          {
            value: oz * 1000,
            color: ozGradeCol,
            name: "name1",
          },
        ]}
        style={{ width: "73%", height: "73%", display: "inline-block" }}
        reveal={Number(oz * 1000)} // 퍼센트치수
        lineWidth={18} // 도넛 두께
        background="#f2f2f2"
        lengthAngle={360}
        totalValue={40}
        startAngle={270}
        rounded
        animate
        // label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: "26px",
          fontWeight: "600",
          fill: ozGradeCol,
        }}
        labelPosition={0}
      />
    );
  };

  const CoChart = () => {
    return (
      <PieChart
        data={[
          {
            value: co * 100,
            color: coGradeCol,
            name: "name2",
          },
        ]}
        style={{ width: "73%", height: "73%", display: "inline-block" }}
        reveal={Number(co * 100)} // 퍼센트치수
        lineWidth={18} // 도넛 두께
        background="#f2f2f2"
        lengthAngle={360}
        totalValue={130}
        startAngle={270}
        rounded
        animate
        // label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: "26px",
          fontWeight: "600",
          fill: coGradeCol,
        }}
        labelPosition={0}
      />
    );
  };

  const SoChart = () => {
    return (
      <PieChart
        data={[
          {
            value: so * 10000,
            color: soGradeCol,
            name: "name3",
          },
        ]}
        style={{ width: "73%", height: "73%", display: "inline-block" }}
        reveal={Number(so * 10000)} // 퍼센트치수
        lineWidth={18} // 도넛 두께
        background="#f2f2f2"
        lengthAngle={360}
        totalValue={130}
        startAngle={270}
        rounded
        animate
        // label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: "26px",
          fontWeight: "600",
          fill: soGradeCol,
        }}
        labelPosition={0}
      />
    );
  };

  const NoChart = () => {
    return (
      <PieChart
        data={[
          {
            value: no * 1000,
            color: noGradeCol,
            name: "name4",
          },
        ]}
        style={{ width: "73%", height: "73%", display: "inline-block" }}
        reveal={Number(no) * 1000} // 퍼센트치수
        lineWidth={18} // 도넛 두께
        background="#f2f2f2"
        lengthAngle={360}
        totalValue={5}
        startAngle={270}
        rounded
        animate
        // label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: "26px",
          fontWeight: "600",
          fill: noGradeCol,
        }}
        labelPosition={0}
      />
    );
  };

  const KhaiChart = () => {
    return (
      <PieChart
        data={[
          {
            value: khai,
            color: khaiGradeCol,
            name: "name5",
          },
        ]}
        style={{ width: "73%", height: "73%", display: "inline-block" }}
        reveal={Number(khai)} // 퍼센트치수
        lineWidth={18} // 도넛 두께
        background="#f2f2f2"
        lengthAngle={360}
        totalValue={100}
        startAngle={270}
        rounded
        animate
        // label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          fontSize: "26px",
          fontWeight: "600",
          fill: khaiGradeCol,
        }}
        labelPosition={0}
      />
    );
  };
  return (
    <>
      <div className="vid">
        <video autoPlay="autoplay" muted="muted" loop>
          <source src="./dust.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="text-slate-100 gradient relative z-10">
        <div className="flex flex-col items-center text-center p-5 rounded-xl">
          <h3 className="text-xl mb-4">{address}</h3>
          <div>
            <p className="text-8xl font-thin font-['Poppins'] mb-2">{dusty}</p>
            <p className="text-3xl font-semibold">{gradeLan}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-center mt-5 rounded-xl ">
          <div className="relative">
            <OzChart />
            <p
              className="value"
              // className={
              //   "value" +
              //   (ozGradeLan === "좋음"
              //     ? " good"
              //     : ozGradeLan === "보통"
              //     ? " soso"
              //     : ozGradeLan === "나쁨"
              //     ? " bad"
              //     : ozGradeLan === "매우나쁨"
              //     ? " verybad"
              //     : "")
              // }
            >
              {oz}
            </p>
            <p className="grade mt-3">{ozGradeLan}</p>
            <p className="kind">오존</p>
          </div>
          <div className="relative">
            <CoChart />
            <p className="value">{co}</p>
            <p className="grade mt-3">{coGradeLan}</p>
            <p className="kind">일산화탄소</p>
          </div>
          <div className="relative">
            <SoChart />
            <p className="value">{so}</p>
            <p className="grade mt-3">{soGradeLan}</p>
            <p className="kind">아황산가스</p>
          </div>
          <div className="relative">
            <NoChart />
            <p className="value">{no}</p>
            <p className="grade mt-3">{noGradeLan}</p>
            <p className="kind">이산화질소</p>
          </div>
          <div className="relative">
            <KhaiChart />
            <p className="value">{khai}</p>
            <p className="grade mt-3">{khaiGradeLan}</p>
            <p className="kind">통합대기</p>
          </div>
        </div>
      </div>
    </>
  );
}
