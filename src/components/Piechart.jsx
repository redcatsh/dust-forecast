import { PieChart } from "react-minimal-pie-chart";

export const Chart = () => {
  return (
    <PieChart
      data={[
        {
          value: 20,
          color: "#f6cb44",
          name: "name1",
        },
      ]}
      reveal={20} // 퍼센트치수
      lineWidth={18} // 도넛 두께
      background="#f3f3f3"
      lengthAngle={360}
      rounded
      animate
      label={({ dataEntry }) => dataEntry.value + "%"}
      labelStyle={{
        fontSize: "26px",
        fill: "#33333",
      }}
      labelPosition={0}
    />
  );
};
