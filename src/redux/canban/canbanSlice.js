import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {
  requested: {
    name: "Requested",
    items: [
      { id: "1", title: "mvp-1", status: "Requested", people: [{ name: "Alice", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Initial request", body: "" },
      { id: "2", title: "mvp-2", status: "Requested", people: [{ name: "Bob", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "no description", body: "" },
      { id: "3", title: "mvp-3", status: "Requested", people: [], date: "", description: "Pending approval", body: "" },
    ],
  },
  toDo: {
    name: "To do",
    items: [
      { id: "4", title: "mvp-4", status: "to do", people: [{ name: "Carol", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "New feature request", body: "" },
      { id: "5", title: "mvp-5", status: "to do", people: [], date: "", description: "Needs review", body: "" },
      { id: "6", title: "mvp-6", status: "to do", people: [{ name: "Dave", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Start ASAP", body: "" },
      { id: "7", title: "mvp-7", status: "to do", people: [], date: "", description: "no description", body: "" },
      { id: "8", title: "mvp-8", status: "to do", people: [{ name: "Eve", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "High priority", body: "" },
      { id: "9", title: "mvp-9", status: "to do", people: [], date: "", description: "Needs design", body: "" },
      { id: "10", title: "mvp-10", status: "to do", people: [], date: "", description: "Follow up required", body: "" }
    ],
  },
  inProgress: {
    name: "In Progress",
    items: [
      { id: "11", title: "mvp-11", status: "in progress", people: [{ name: "Frank", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Working on it", body: "" },
      { id: "12", title: "mvp-12", status: "in progress", people: [{ name: "Grace", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Halfway done", body: "" },
    ],
  },
  done: {
    name: "Done",
    items: [
      { id: "13", title: "mvp-13", status: "in progress", people: [], date: "", description: "Blocked by dependency", body: "" },
      { id: "14", title: "mvp-14", status: "in progress", people: [{ name: "Heidi", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Testing phase", body: "" },
      { id: "15", title: "mvp-15", status: "in progress", people: [], date: "", description: "Design review ongoing", body: "" },
      { id: "16", title: "mvp-16", status: "in progress", people: [{ name: "Ivan", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Completed successfully", body: "" },
      { id: "17", title: "mvp-17", status: "in progress", people: [], date: "", description: "Reviewed and approved", body: "" },
      { id: "18", title: "mvp-18", status: "done", people: [{ name: "Judy", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "Deployment done", body: "" },
      { id: "19", title: "mvp-19", status: "done", people: [], date: "", description: "Finished with testing", body: "" },
      { id: "20", title: "mvp-20", status: "done", people: [{ name: "Karl", url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png" }], date: "", description: "All set", body: "" }
    ],
  },
}
//    tasks: {
//   requested: {
//     name: "Requested",
//     items: [],
//   },
//   toDo: {
//     name: "To do",
//     items: [],
//   },
//   inProgress: {
//     name: "In Progress",
//     items: [],
//   },
//   done: {
//     name: "Done",
//     items: [],
//   },
// }
}
// createSlice is a Redux tool that lets you define the state, reducers, and actions all in one place.
export const canbanTasks = createSlice({
  name: "user",
  initialState,
  reducers: {
    // func to changes the state like editTask , addTask
    editTask: (state, action) => {
      console.log("action-payload",action.payload);
    // replace all task with new data
      state.tasks = action.payload;
    },
    addTask:(state,action) => {
      const {status,task} = action.payload
    // add new task specif column
      console.log("action-payload",action.payload);
      state.tasks[status].items.push(task)
    }
  },
});
export const { editTask ,addTask } = canbanTasks.actions;
    // This exports the reducer function for store.
export default canbanTasks.reducer;
