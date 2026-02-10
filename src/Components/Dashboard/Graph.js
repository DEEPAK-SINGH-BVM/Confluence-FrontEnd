import React from "react";
import { useSelector } from "react-redux";
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
//   const data = [
//     {
//       name: "Total Tasks",
//       value: 20,
//     },
//     {
//       name: "New Tasks",
//       value: 4,
//     },
//     {
//       name: "Active Tasks",
//       value: 6,
//     },
//     {
//       name: "Testing",
//       value: 8,
//     },
//     {
//       name: "Closed",
//       value: 2,
//     },
//   ];
  const task = useSelector((state) => state.task.tasks);
  console.log("graph-taskkk:", task);

  const totalTasks = Object.values(task).reduce((total, column) => {
    total += column.items.length;
    console.log("column:", column);
    console.log("total:", total);
    return total;
  }, 0);
  console.log("graph-totalTasks:", totalTasks);

  const newTasks = task.requested.items.length;
  console.log("graph-newTask-requested", newTasks);
  const activeTasks = task.todo.items.length;
  console.log("graph-activeTasks-todo", activeTasks);

  const testingTasks = task.inprogress.items.length;
  console.log("graph-inProgress-testing", testingTasks);

  const closedTasks = task.done.items.length;
  console.log("graph-done-closed", closedTasks);

  const data = [
    {name:"Total Tasks", value: totalTasks },
    {name:"Requested",value:newTasks},
    {name:"To-Do",value:activeTasks},
    {name:"In Progress",value:testingTasks},
    {name:"Done",value:closedTasks}
  ]
  console.log("Graph-Data",data);
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
          <Line type="linear" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default Graph;
