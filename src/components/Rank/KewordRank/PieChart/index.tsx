import { Pie } from "react-chartjs-2";
import { Chart, ChartOptions, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { round, sum } from "lodash";
import { IRankKeywordsData } from "@type/rank";

export default function PieChart({ data }: { data: IRankKeywordsData[] }) {
  Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  const labels = data.map((item) => item.keyword);
  const values = data.map((item) => item.hits);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: [
          "#2f80ed",
          "#39726E",
          "#4AAAA5",
          "#00ADC3",
          "#007DAD",
        ],
        hoverBackgroundColor: [
          "#E6EFFF",
          "#E6EFFF",
          "#E6EFFF",
          "#E6EFFF",
          "#E6EFFF",
        ],
      },
    ],
  };

  // 퍼센트 표시 : round((value * 100) / sum(values), 1)
  const options: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value, context: any) => {
          const label = context.chart.data.labels[context.dataIndex];
          const percentage = round((value * 100) / sum(values), 1);
          return `${label}\n${percentage} %`;
        },
        color: "#FFFFFF",
        font: {
          size: 16,
        },
        align: "end",
        offset: 3,
        textShadowColor: "rgba(0, 0, 0, 1)", // 텍스트 주위에 그림자 효과를 주는 색상 지정
        textShadowBlur: 5, // 그림자 효과의 블러(blur) 정도
      },
    },
  };

  return (
    <div className=" bg-ma col-center w-full gap-4">
      <Pie data={chartData} options={options} />
      {/* <div>
        {labels.map((label, idx) => (
          <p key={idx}>
            {`"${label}" : ${values[idx]} 번 검색되었어요.`}
            <br />
          </p>
        ))}
      </div> */}
    </div>
  );
}
