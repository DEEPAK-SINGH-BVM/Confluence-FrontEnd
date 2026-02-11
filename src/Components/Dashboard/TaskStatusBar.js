
import { CgGoogleTasks } from "react-icons/cg";
import { RiChatNewFill } from "react-icons/ri";
import { GrTest } from "react-icons/gr";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

const TaskStatusBar = () => {
  // const [taskData] = useState([
  //   {
  //     title: "Total tasks",
  //     value: "20",
  //     color: "red",
  //     icon: <CgGoogleTasks size="1.5rem" />,
  //   },
  //   {
  //     title: "New tasks",
  //     value: "4",
  //     color: "blue",
  //     icon: <RiChatNewFill size="1.5rem" />,
  //   },
  //   {
  //     title: "Active tasks",
  //     value: "6",
  //     color: "green",
  //     icon: <AiOutlineCheck size="1.5rem" />,
  //   },
  //   {
  //     title: "Testing",
  //     value: "8",
  //     color: "orange",
  //     icon: <GrTest size="1.5rem" />,
  //   },
  //   {
  //     title: "Closed",
  //     value: "2 ",
  //     color: "gray",
  //     icon: <AiOutlineCloseCircle size="1.5rem" />,
  //   },
  // ]);
  const task = useSelector((state) => state.task.tasks);
  console.log("taskkk:", task);

  const totalTasks = Object.values(task).reduce((total, column) => {
    total +=column.items.length
    console.log("column:", column);
    console.log("total:", total); 
    return total;
  },0);
  console.log("totalTasks:", totalTasks);

  const newTasks = task.requested.items.length;
  console.log('newTask-requested',newTasks);
  const activeTasks = task.todo.items.length
  console.log('activeTasks-todo',activeTasks);

  const testingTasks = task.inprogress.items.length
  console.log('inProgress-testing',testingTasks);

  const closedTasks = task.done.items.length
  console.log('done-closed',closedTasks);  

  const taskData = [
    {
      title: "Total tasks",
      value: totalTasks,
      icon: <CgGoogleTasks size="1.5rem" />,
    },
    {
      title: "Requested",
      value: newTasks,
      icon: <RiChatNewFill size="1.5rem" />,
    },
    {
      title: "To-Do",
      value: activeTasks,
      icon: <AiOutlineCheck size="1.5rem" />,
    },
    {
      title: "In Progress",
      value: testingTasks,
      icon: <GrTest size="1.5rem" />,
    },
    {
      title: "Done",
      value: closedTasks,
      icon: <AiOutlineCloseCircle size="1.5rem" />,
    },
  ];
  console.log('TaskDatas:',taskData);
  
  return (
    <div>
      <div className="m-5 ">
        <p>Task Status Bar</p>
      </div>
      <div className="flex flex-wrap mt-5 justify-between">
        {taskData.map((ele, index) =>{
          console.log('DATAELE',ele);
          
          return (
          <div
            className="mt-4 w-full lg:w-2/12 xl:w-4/20 px-5 mb-4"
            key={index}
          >
            <div className="relative flex flex-col min-w-0 break-words rounded mb-3 xl:mb-0 shadow-md">
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
                      className={`text-black p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.08)] rounded-full `}
                    >
                      {ele.icon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)
        }
        )}
      </div>
    </div>
  );
};

export default TaskStatusBar;
