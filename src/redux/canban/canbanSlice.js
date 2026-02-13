import { createSlice } from "@reduxjs/toolkit";
import {
  createCanbanTask,
  createProject,
  getCanbanProjects,
  getCanbanTasks,
  updateCanbanTask,
} from "./canbanThunk";
import { toast } from "react-toastify";
// const initialState = {
//   tasks: {
//   requested: {
//     name: "Requested",
//     items: [
//       { id: "1", title: "mvp-1", status: "Requested", people: [{ name: "Alice", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Initial request", body: "" },
//       { id: "2", title: "mvp-2", status: "Requested", people: [{ name: "Bob", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "no description", body: "" },
//       { id: "3", title: "mvp-3", status: "Requested", people: [], date: "", description: "Pending approval", body: "" },
//     ],
//   },
//   toDo: {
//     name: "To do",
//     items: [
//       { id: "4", title: "mvp-4", status: "to do", people: [{ name: "Carol", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "New feature request", body: "" },
//       { id: "5", title: "mvp-5", status: "to do", people: [], date: "", description: "Needs review", body: "" },
//       { id: "6", title: "mvp-6", status: "to do", people: [{ name: "Dave", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Start ASAP", body: "" },
//       { id: "7", title: "mvp-7", status: "to do", people: [], date: "", description: "no description", body: "" },
//       { id: "8", title: "mvp-8", status: "to do", people: [{ name: "Eve", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "High priority", body: "" },
//       { id: "9", title: "mvp-9", status: "to do", people: [], date: "", description: "Needs design", body: "" },
//       { id: "10", title: "mvp-10", status: "to do", people: [], date: "", description: "Follow up required", body: "" }
//     ],
//   },
//   inProgress: {
//     name: "In Progress",
//     items: [
//       { id: "11", title: "mvp-11", status: "in progress", people: [{ name: "Frank", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Working on it", body: "" },
//       { id: "12", title: "mvp-12", status: "in progress", people: [{ name: "Grace", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Halfway done", body: "" },
//     ],
//   },
//   done: {
//     name: "Done",
//     items: [
//       { id: "13", title: "mvp-13", status: "in progress", people: [], date: "", description: "Blocked by dependency", body: "" },
//       { id: "14", title: "mvp-14", status: "in progress", people: [{ name: "Heidi", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Testing phase", body: "" },
//       { id: "15", title: "mvp-15", status: "in progress", people: [], date: "", description: "Design review ongoing", body: "" },
//       { id: "16", title: "mvp-16", status: "in progress", people: [{ name: "Ivan", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Completed successfully", body: "" },
//       { id: "17", title: "mvp-17", status: "in progress", people: [], date: "", description: "Reviewed and approved", body: "" },
//       { id: "18", title: "mvp-18", status: "done", people: [{ name: "Judy", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Deployment done", body: "" },
//       { id: "19", title: "mvp-19", status: "done", people: [], date: "", description: "Finished with testing", body: "" },
//       { id: "20", title: "mvp-20", status: "done", people: [{ name: "Karl", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "All set", body: "" }
//     ],
//   },
// }
// //    tasks: {
// //   requested: {
// //     name: "Requested",
// //     items: [],
// //   },
// //   toDo: {
// //     name: "To do",
// //     items: [],
// //   },
// //   inProgress: {
// //     name: "In Progress",
// //     items: [],
// //   },
// //   done: {
// //     name: "Done",
// //     items: [],
// //   },
// // }
// }
// createSlice is a Redux tool that lets you define the state, reducers, and actions all in one place.
// export const canbanTasks = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     // func to changes the state like editTask , addTask
//     editTask: (state, action) => {
//       console.log("action-payload",action.payload);
//     // replace all task with new data
//       state.tasks = action.payload;
//     },
//     addTask:(state,action) => {
//       const {status,task} = action.payload
//     // add new task specif column
//       console.log("action-payload",action.payload);
//       state.tasks[status].items.push(task)
//     }
//   },
// });
// export const { editTask ,addTask } = canbanTasks.actions;
//     // This exports the reducer function for store.
// export default canbanTasks.reducer;
const initialState = {
  tasks: {
    requested: { items: [] },
    todo: { items: [] },
    inprogress: { items: [] },
    done: { items: [] },
  },
  projects: [],
  loading: false,
  error: null,
};
// initialState is the default structure and values of your Redux state before any data is added.
export const canbanTask = createSlice({
  name: "canban",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createCanbanTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCanbanTask.fulfilled, (state, action) => {
        state.loading = false;
        const task = action.payload;
        state.tasks[task.status].items.push(task);
        toast.success("Task Add Successfully ");
      })
      .addCase(createCanbanTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error in Add Task";
        toast.error(state.error);
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        const project = action.payload;
        if (!state.projects) state.projects = [];
        state.projects.push(project);
        toast.success("Project created successfully");
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error in creating project";
        toast.error(state.error);
      })
       .addCase(getCanbanProjects.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCanbanProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    })
    .addCase(getCanbanProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch projects";
    })
      .addCase(getCanbanTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCanbanTasks.fulfilled, (state, action) => {
        state.loading = false;

        const updatedColumns = {
          requested: { name: "Requested", items: [] },
          todo: { name: "To Do", items: [] },
          inprogress: { name: "In Progress", items: [] },
          done: { name: "Done", items: [] },
        };
        console.log("Action Payload:", action.payload);
        action.payload.forEach((task) => {
          const status = task.status?.toLowerCase() || "requested";
          console.log("statusgetCanban", status);

          if (!updatedColumns[status]) updatedColumns[status] = { items: [] };

          updatedColumns[status].items.push(task);
        });

        state.tasks = updatedColumns;
        console.log("stateTask", state.tasks);
      })

      .addCase(getCanbanTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error in Fetching Tasks";
      })

      .addCase(updateCanbanTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCanbanTask.fulfilled, (state, action) => {
        state.loading = false;

        const updateTask = action.payload;
        console.log("updateTask", updateTask);

        Object.keys(state.tasks).forEach((status) => {
          if (state.tasks[status].items) {
            state.tasks[status].items = state.tasks[status].items.filter(
              (task) => task.id !== updateTask.id,
            );
          }
        });
        if (!state.tasks[updateTask.status]) {
          state.tasks[updateTask.status] = { items: [] };
        }
        state.tasks[updateTask.status].items.push(updateTask);
      })
      .addCase(updateCanbanTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error in Update Task";
      });
  },
});

export default canbanTask.reducer;
