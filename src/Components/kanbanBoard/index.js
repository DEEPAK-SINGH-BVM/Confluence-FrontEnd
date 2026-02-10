import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SideBar from "./sideBar";
import { useDispatch, useSelector } from "react-redux";
import { getCanbanTasks } from "../../redux/canban/canbanThunk";

function CanBanBoard() {
  const dispatch = useDispatch();
  const tasksFromRedux = useSelector((state) => state.task.tasks);

  const [columns, setColumns] = useState({});
  console.log('COLUMN',columns);
  
  const [cardData, setCardData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // Open sidebar with task details
  const handleSidebar = (item) => {
    setShowSidebar(true);
    setCardData(item);
  };

  useEffect(() => {
    const staticColumns = {
      requested: { name: "Requested", items: [] },
      todo: { name: "To Do", items: [] },
      inprogress: { name: "In Progress", items: [] },
      done: { name: "Done", items: [] },
    };

    if (!tasksFromRedux) {
      setColumns(staticColumns);
      return;
    }

    let updatedColumns = { ...staticColumns };

    const statusKeyMap = {
      Pending: "requested",
      Requested: "requested", 
      ToDo: "todo", 
      InProgress: "inprogress",
      Done: "done", 
    };


    if (Array.isArray(tasksFromRedux)) {
      tasksFromRedux.forEach((task) => {
        const statusRaw = task.status?.toLowerCase() || "requested";
        const key = statusKeyMap[statusRaw] || "requested";
        updatedColumns[key].items.push(task);
      });
    } else if (typeof tasksFromRedux === "object") {
      Object.keys(staticColumns).forEach((key) => {
        if (tasksFromRedux[key]?.items) {
          updatedColumns[key].items = tasksFromRedux[key].items;
        }
      });
    }

    setColumns(updatedColumns);
  }, [tasksFromRedux]);


  // Fetch tasks from backend on mount
  useEffect(() => {
    dispatch(getCanbanTasks());
  }, [dispatch]);

  // Drag & Drop handler
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destItems =
      source.droppableId === destination.droppableId
        ? sourceItems
        : [...destColumn.items];

    // Create a copy of the task before changing status
    const [removed] = sourceItems.splice(source.index, 1);
    const updatedTask = { ...removed, status: destination.droppableId };

    destItems.splice(destination.index, 0, updatedTask);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items:
          source.droppableId === destination.droppableId
            ? destItems
            : sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  };

  return (
    <div className="antialiased w-full relative">
      <div
        className="py-4 gap-2 px-2"
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className="w-1/4"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="flex">
                <h1 className="font-medium font-black group-hover:text-indigo-400 leading-4">
                  <span className="text-indigo-400 mr-1.5 font-bold text-lg lg:text-3xl">
                    .
                  </span>
                  {column.name}
                </h1>
              </div>
              <div className="w-full" style={{ margin: 8 }}>
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="rounded-lg bg-white/10 p-4 w-full"
                    >
                      {column.items &&
                        column.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => handleSidebar(item)}
                                className="w-full mb-3"
                                style={{ ...provided.draggableProps.style }}
                                data-drawer-target="drawer-navigation"
                                data-drawer-show="drawer-navigation"
                                aria-controls="drawer-navigation"
                              >
                                <div className="group p-4 transition-all duration-300 bg-white shadow-lg lg:p-5">
                                  <div className="flex items-center gap-x-2">
                                    <div className="flex items-start">
                                      <div>
                                        <div className="flex items-center justify-between">
                                          <h2 className="text-lg font-semibold text-gray-900 mt-1 mb-2">
                                            {item.title}
                                          </h2>
                                        </div>
                                        <div className="flex flex-wrap">
                                          {item.image && (
                                            <img
                                              src={item.image}
                                              className="w-7 mr-2 rounded-full"
                                              alt="Avatar"
                                            />
                                          )}
                                          {item?.people?.map((p, i) => (
                                            <div
                                              className={`flex items-center justify-start mt-1 ${
                                                i && "ml-2"
                                              }`}
                                              key={i}
                                            >
                                              <span className="text-gray-900">
                                                {p.name}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                        <p className="mt-3 text-gray-700 text-sm">
                                          {item?.description}
                                        </p>
                                        <div className="mt-4 flex items-center">
                                          <div className="flex mr-2 text-gray-700 text-sm mr-8">
                                            <svg
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              className="w-4 h-4 mr-1"
                                              stroke="currentColor"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                              />
                                            </svg>
                                            <span>
                                              {item?.comment?.length || 0}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
      </div>

      {/* Sidebar for task details */}
      <SideBar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        cardData={cardData}
      />
    </div>
  );
}

export default CanBanBoard;
