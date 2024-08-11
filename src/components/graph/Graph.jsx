/** @jsxImportSource @emotion/react */
import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { css } from "@emotion/react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const chartContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default function Graph({ statuse }) {
  const options = {
    animationEnabled: true,
    title: {
      text: "Monthly Income",
    },
    axisY: {
      title: "Income",
      suffix: " $",
    },
    data: [
      {
        type: "splineArea",
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "#,##0.## $",
        showInLegend: true,
        legendText: "Income",
        dataPoints: (statuse?.monthlyBalance || []).map((item) => ({
          x: new Date(`${item.month} 1, ${new Date().getFullYear()}`),
          y: item.amount,
        })),
      },
    ],
  };

  return (
    <div css={chartContainerStyle}>
      <CanvasJSChart options={options} />
    </div>
  );
}
