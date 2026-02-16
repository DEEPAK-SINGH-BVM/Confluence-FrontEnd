import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SideBar from "./sideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getCanbanTasks,
  updateCanbanTask,
} from "../../redux/canban/canbanThunk";

function CanBanBoard() {
  const dispatch = useDispatch();
  const columnsFromRedux = useSelector((state) => state.task.tasks);
  console.log("columnsFromRedux", columnsFromRedux);
  
  const [columns, setColumns] = useState({});
  console.log("columns", columns);
  
  // If you update Redux state directly during drag-and-drop, React re-renders asynchronously and
  // the array gets appended at the end, so the moved task appears last instead of its intended index.

  // useEffect(() => {
  //   if (columnsFromRedux && Object.keys(columns).length === 0) {
  //     setColumns(columnsFromRedux);
  //   }
  // }, [columnsFromRedux, columns]);

  // useEffect(() => {
  //   if (columnsFromRedux) {
  //     setColumns(columnsFromRedux);
  //   }
  // }, [columnsFromRedux]);

  const statusKeyMap = {
    requested: "Requested",
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
  };

  useEffect(() => {
    if (!columnsFromRedux) {
      return;
    }

    setColumns((prevColumns) => {
      // console.log("Columns", columnsFromRedux);

      const mergedColumns = { ...prevColumns };
      // console.log("mergedColumns", mergedColumns);
      
      for (const key in columnsFromRedux) {
        const prevItems = prevColumns[key]?.items?.length;
        // console.log("prevItemsCanban", prevItems);
        
        const reduxItems = columnsFromRedux[key].items?.length;
        // console.log("reduxItemsCanban", reduxItems);
        
        if (!prevItems && reduxItems) {
          mergedColumns[key] = {
            ...prevColumns[key],
            items: columnsFromRedux[key].items,
          };
          // console.log("Merged column ",key);
        }
      }
      if (Object.keys(prevColumns).length === 0) {
        return columnsFromRedux;
      }
      return mergedColumns;
    });
  }, [columnsFromRedux]);

  const [cardData, setCardData] = useState(null);
  console.log("cardData", cardData);

  const [showSidebar, setShowSidebar] = useState(false);
  // console.log('showSidebar',showSidebar);

  // Open sidebar with task details
  const handleSidebar = (item) => {
    setShowSidebar(true);
    setCardData(item);
  };

  useEffect(() => {
    dispatch(getCanbanTasks());
  }, [dispatch]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log("source", source);
    console.log("destination", destination);
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    console.log("sourceColumn", sourceColumn);
    const destColumn = columns[destination.droppableId];
    console.log("destColumn", destColumn);

    const sourceItems = [...sourceColumn.items];
    console.log("sourceItems", sourceItems);

    const destItems =
      source.droppableId === destination.droppableId
        ? sourceItems
        : [...destColumn.items];

    console.log("destItems", destItems);

    const [removed] = sourceItems.splice(source.index, 1);
    console.log("removed", removed);

    const updatedTask = {
      ...removed,
      status: destination.droppableId,
    };
    console.log("updatedTask", updatedTask);

    destItems.splice(destination.index, 0, updatedTask);

   setColumns({
     ...columns,
     [source.droppableId]: { ...sourceColumn, items: sourceItems },
     [destination.droppableId]: { ...destColumn, items: destItems },
   });


    dispatch(
      updateCanbanTask({
        id: updatedTask.id,
        status: updatedTask.status,
      }),
    );
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
              <div className="flex items-center">
                <h1 className="font-medium font-black group-hover:text-indigo-400 leading-4">
                  {statusKeyMap[columnId]}
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
                                        <p className="text-sm font-semibold text-gray-500 mt-1 mb-2">
                                          {item.description}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 mt-1 mb-2">
                                          Status : {item.status}
                                        </p>
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
