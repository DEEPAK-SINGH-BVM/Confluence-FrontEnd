import React from "react";
import TaskStatusBar from "./TaskStatusBar";
import Graph from "./Graph";
import TableData from "./TableData";

const Dashboard = () => {
  return (
    <>
      <div>
        <TaskStatusBar />
        <div className="grid md:grid-cols-2 mt-5">
          <div className="bg-white shadow-md p-5 overflow-x-auto ml-5 mr-5">
            <Graph />
          </div>
          {/* <div className="relative max-h-[380px] max-[462px]:overflow-x-auto max-[768px]:mt-8 overflow-y-scroll shadow-2xl sm:rounded-lg ml-5 mr-5">
            <TableData />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
