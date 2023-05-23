import useGeolocation from "../hooks/useGeolocation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Current() {
  const location = useGeolocation();
  // 위도(lat): y, 경도(lng): x

  const kakao_key = process.env.REACT_APP_KAKAO_KEY;
  const {
    isLoading,
    error,
    data: coords,
  } = useQuery(
    ["coords", location.coordinates.lng, location.coordinates.lat],
    () => {
      return axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${location.coordinates.lng}&y=${location.coordinates.lat}&input_coord=WGS84&output_coord=TM`,
          {
            headers: {
              Authorization: "KakaoAK " + kakao_key,
            },
          }
        )
        .then((res) => res.data.documents[0]);
    }
  );

  console.log(coords);
  console.log(location.coordinates.lng);
  console.log(location.coordinates.lat);
  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      {coords.x}
      <br />
      {coords.y}
    </div>
  );
}
