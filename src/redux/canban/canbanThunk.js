import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTaskMutation, getCanbanTasksQuery } from "../../query/canbanQuery";
import request from "../../request";

export const createCanbanTask = createAsyncThunk(
  "canban/createTask",
  async (taskData) => {
   try {
     const response = await request({
       query: createTaskMutation,
       variables: taskData,
     });
    console.log("createCanbanTask", response.data.data.createCanbanTask);
    
    return response.data.data.createCanbanTask;
   } catch (error) {
        console.log('Error get ',error);
        throw error
   }
  },
);

export const getCanbanTasks = createAsyncThunk("canban/getTasks", async () => {
  try {
    const response = await request({
      query: getCanbanTasksQuery,
    });
    console.log("Fetched tasks:", response.data.data.getCanbanTask);
    return response.data.data.getCanbanTask;
  } catch (error) {
    console.log("Error fetching tasks:", error);
    throw error;
  }
});
