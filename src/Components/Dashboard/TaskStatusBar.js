import React, { useState } from "react";
import { CgGoogleTasks } from "react-icons/cg";
import { RiChatNewFill } from "react-icons/ri";
import { GrTest } from "react-icons/gr";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";

const TaskStatusBar = () => {
  const [taskData] = useState([
    {
      title: "Total tasks",
      value: "200",
      color: "red",
      icon: <CgGoogleTasks size="1.5rem" />,
    },
    {
      title: "New tasks",
      value: "50",
      color: "blue",
      icon: <RiChatNewFill size="1.5rem" />,
    },
    {
      title: "Active tasks",
      value: "50",
      color: "green",
      icon: <AiOutlineCheck size="1.5rem" />,
    },
    {
      title: "Testing",
      value: "50",
      color: "orange",
      icon: <GrTest size="1.5rem" />,
    },
    {
      title: "Closed",
      value: "50",
      color: "gray",
      icon: <AiOutlineCloseCircle size="1.5rem" />,
    },
  ]);
  return (
    <>
      <div className="flex flex-wrap mt-5 justify-between">
        {taskData.map((ele, index) => (
          <div
            className="mt-4 w-full lg:w-2/12 xl:w-4/20 px-5 mb-4"
            key={index}
          >
            <div className="relative flex flex-col min-w-0 break-words rounded mb-3 xl:mb-0 shadow-2xl">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      {ele.title}
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      {ele.value}
                    </span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div
                      className={`text-black p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-full bg-${ele?.color}-500`}
                    >
                      {ele.icon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskStatusBar;
