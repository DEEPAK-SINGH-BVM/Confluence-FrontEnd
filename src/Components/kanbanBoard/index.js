import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SideBar from "./sideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getCanbanTasks,
  updateCanbanTask,
} from "../../redux/canban/canbanThunk";
import CreateTaskForm from "./createTaskForm";

function CanBanBoard() {
  const dispatch = useDispatch();
  const columnsFromRedux = useSelector((state) => state.task.tasks);
  const projects = useSelector((state) => state.task.projects);
  console.log("columnsFromRedux.todo.items", columnsFromRedux.todo.items);
  const [showForm, setShowForm] = useState(false);

  const [columns, setColumns] = useState({});
  console.log("columns", columns);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [cardData, setCardData] = useState(null);
  console.log("cardData", cardData);

  const [showSidebar, setShowSidebar] = useState(false);

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

    const newDestItems = destItems.map((item, index) => {
      console.log("newItems", item);
      console.log("newIndex", index);
      return {
        ...item,
        order: index,
      };
    });
    const newSourceItems =
      source.droppableId === destination.droppableId
        ? newDestItems
        : sourceItems.map((item, index) => ({
            ...item,
            order: index,
          }));
    console.log("newSourceItems", newSourceItems);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, items: newSourceItems },
      [destination.droppableId]: { ...destColumn, items: newDestItems },
    });

    dispatch(
      updateCanbanTask({
        id: updatedTask.id,
        status: updatedTask.status,
      }),
    );
  };
  const filterByProject = (items) => {
    if (!selectedProjectId) return items;
    return items.filter((task) => {
      console.log('Taskkkk',task);
      
      console.log(
        "TaskProjectid:",
        task.project.id,
        "selectProjectId",
        selectedProjectId,
      );
      return task.project?.id === selectedProjectId;
    });
  };

  return (
    <div className="antialiased w-full relative">
      <select
        className="border px-3 py-2 rounded"
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
      >
        <option value="">All Projects</option>
        {projects?.map((p) => {
          console.log('PId',p);
          
          return (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          );
        })}
      </select>
      <div
        className="py-4 gap-2 px-2"
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => {
            const filteredItems = filterByProject(column.items || []);
            return (
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
                        {filteredItems.map((item, index) => (
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
                                        <div className="p-1 bg-blue-100 w-16 border rounded text-center">
                                          <p className="text-sm font-semibold text-blue-900 mt-1 mb-2 ">
                                            {item.ticket}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        <button
                          onClick={() => setShowForm(true)}
                          className="mt-2 py-2 px-4 w-full text-black bg-gray-200 rounded"
                        >
                          + Add Task
                        </button>
                        {showForm && (
                          <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start pt-12">
                            <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6">
                              {/* Close button */}
                              <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 p-2 rounded-full"
                              >
                                ✕
                              </button>

                              {/* Task creation form */}
                              <CreateTaskForm
                                onClose={() => setShowForm(false)}
                                projects={projects}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            );
          })}
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
