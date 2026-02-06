import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Graph = () => {
  const data = [
    {
      name: "Total Tasks",
      value: 200,
    },
    {
      name: "New Tasks",
      value: 90,
    },
    {
      name: "Active Tasks",
      value: 50,
    },
    {
      name: "Testing",
      value: 80,
    },
    {
      name: "Closed",
      value: 58,
    },
    {
      name: "Total Tasks",
      value: 200,
    },
    {
      name: "New Tasks",
      value: 90,
    },
    {
      name: "Active Tasks",
      value: 50,
    },
    {
      name: "Testing",
      value: 80,
    },
    {
      name: "Closed",
      value: 58,
    },
    {
      name: "Total Tasks",
      value: 200,
    },
    {
      name: "New Tasks",
      value: 90,
    },
    {
      name: "Active Tasks",
      value: 50,
    },
    {
      name: "Testing",
      value: 80,
    },
    {
      name: "Closed",
      value: 58,
    },
  ];
  return (
    <>
      <div className="ml-8 mb-4">
        <b>Summary Tasks</b>
      </div>
      <ResponsiveContainer height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign={"top"} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default Graph;
