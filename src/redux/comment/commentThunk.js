import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCommentMutation, getCommentQuery } from "../../query/commentQuery";
import request from "../../request";

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await request({
        query: getCommentQuery,
        operationName: "getComment",
        variables: { taskId },
      });

      return response?.data?.getComment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addComment = createAsyncThunk(
  "comment/addComment",
  async ({ taskId, comment }) => {
    const response = await request({
      query: addCommentMutation,
      operationName: "addComment",
      variables: { taskId, comment },
    });
    console.log("responseAddComment", response);
    return response?.data?.addComment;
  },
);



