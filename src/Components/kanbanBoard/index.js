import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SideBar from "./sideBar";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../../redux/canban/canbanSlice";

function CanBanBoard() {
  const taskStatus = useSelector((state) => state.task.tasks);
  const [columns, setColumns] = useState(taskStatus);
  const [cardData, setCardData] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, [columns]);

  const handleSidebar = (item) => {
    setShowSidebar(true);
    setCardData(item);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      const data = {
        ...removed,
        status: result?.destination?.droppableId,
      };
      destItems.splice(destination.index, 0, data);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      const data = {
        ...removed,
        status: result?.destination?.droppableId,
      };
      copiedItems.splice(destination.index, 0, data);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  useEffect(() => {
    dispatch(editTask(columns));
  }, [columns]);

  return (
    <div className="antialiased w-full relative">
      <div
        className="py-4 gap-2 px-2"
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                className="w-1/4"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <div className="flex ">
                  <h1 className="font-medium font-black group-hover:text-indigo-400  leading-4 ">
                    <span className="text-indigo-400 mr-1.5 font-bold text-lg lg:text-3xl ">
                      .
                    </span>
                    {column.name}
                  </h1>
                </div>
                <div className="w-full" style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="rounded-lg bg-white/10 p-4 w-full"
                        >
                          {column.items &&
                            column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={() => handleSidebar(item)}
                                        className="w-full mb-3"
                                        style={{
                                          ...provided.draggableProps.style,
                                        }}
                                        data-drawer-target="drawer-navigation"
                                        data-drawer-show="drawer-navigation"
                                        aria-controls="drawer-navigation"
                                      >
                                        <div className="group p-4 transition-all duration-300  bg-white shadow-lg lg:p-5 ">
                                          <div className="flex items-center gap-x-2">
                                            <div className="flex items-start">
                                              <div className="">
                                                <div className="flex items-center justify-between">
                                                  <h2 className="text-lg font-semibold text-gray-900 mt-1 mb-2">
                                                    {item.title}
                                                  </h2>
                                                </div>
                                                <div className="flex flex-wrap">
                                                  {item?.people?.map(
                                                    (items, i) => {
                                                      return (
                                                        <div
                                                          className={`flex items-center justify-start mt-1  ${i && "ml-2"}`}
                                                          key={i}
                                                        >
                                                          <img
                                                            src={items.url}
                                                            className="w-5 mr-2 rounded-full"
                                                            alt="Avatar"
                                                          />
                                                          <span className="text-gray-900 ">
                                                            {items.name}
                                                          </span>
                                                        </div>
                                                      );
                                                    },
                                                  )}
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
                                                      {item?.comment?.length ||
                                                        0}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <SideBar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        cardData={cardData}
      />
    </div>
  );
}

export default CanBanBoard;
