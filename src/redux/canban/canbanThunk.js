import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProjectMutation,
  createTaskMutation,
  getCanbanTasksQuery,
  getProjectsQuery,
  updateCanbanMutation,
} from "../../query/canbanQuery";
import request from "../../request";

export const createCanbanTask = createAsyncThunk(
  "canban/createTask",
  async (taskData) => {
    try {
      const response = await request({
        query: createTaskMutation,
        variables: taskData,
      });
      console.log("createCanbanTask", response);

      return response.data.data.createCanbanTask;
    } catch (error) {
      console.log("Error get ", error);
      throw error;
    }
  },
);

export const updateCanbanTask = createAsyncThunk(
  "canban/updateTask",
  async ({ id, status }) => {
    try {
      const response = await request({
        query: updateCanbanMutation,
        variables: { id, status },
      });
      console.log("responseUpdate", response);

      // console.log('updateCanbanTask',response,data.data.updateCanbanTask);
      return response.data.data.updateCanbanTask;
    } catch (error) {
      console.log("Error get", error);
      throw error;
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

export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData) => {
    try {
      const response = await request({
        query: createProjectMutation,
        variables: projectData,
      });
      console.log("createProject", response);
      return response.data.data.createProject;
    } catch (error) {
      console.log("Error creating project:", error);
      throw error;
    }
  },
);

export const getCanbanProjects = createAsyncThunk(
  "canban/getProjects",
  async () => {
    try {
      const response = await request({ query: getProjectsQuery });
      return response.data.data.getProjects;
    } catch (error) {
      console.log("Error fetching projects", error);
      throw error;
    }
  },
);