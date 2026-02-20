import { createAsyncThunk } from "@reduxjs/toolkit";
import { addSubtaskMutation, getSubTaskQuery } from "../../query/subTaskQuery";
import request from "../../request";

export const fetchSubTask = createAsyncThunk(
  "subTask/fetchSubTask",
  async (taskId) => {
    const response = await request({
      query: getSubTaskQuery,
      operationName: "getSubtasks",
      variables: { taskId },
    });
    console.log("responseSubtask", response);
    return response?.data?.getSubtasks;
  },
);

export const addSubTask = createAsyncThunk(
  "subTask/addSubTask",
  async ({ taskId, title }) => {
     const response = await request({
       query: addSubtaskMutation,
       operationName: "addSubtask",
       variables: { taskId, subtask: { title } },
     });
     console.log("responseAddSubtask", response);
     return response?.data?.addSubtask;
  },
);

