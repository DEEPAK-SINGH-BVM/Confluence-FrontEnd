import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProjectMutation,
  createTaskMutation,
  getAllCanbanTasksQuery,
  getProjectsQuery,
  updateCanbanMutation,
} from "../../query/canbanQuery";
import request from "../../request";

export const getCanbanTasks = createAsyncThunk(
  "canban/getTasks",
  async () => {
    const response = await request({
      query: getAllCanbanTasksQuery,
      operationName: "getAllCanbanTask",
    });
    console.log('responsetask',response);
    
    return response.data.getAllCanbanTask;
  },
);

export const getCanbanProjects = createAsyncThunk(
  "canban/getProjects",
  async () => {
    const response = await request({
      query: getProjectsQuery,
      operationName: "getAllProjects",
    });
    console.log('responseProjects',response);
    
    // response.data now exists
    return response.data.getAllProjects.map((p) => ({
      id: p.id ,
      name: p.name,
    }));
  },
);

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

export const updateCanbanTask = createAsyncThunk(
  "canban/updateTask",
  async ({ id, status }) => {
    try {
      const response = await request({
        query: updateCanbanMutation,
        variables: { id, status },
      });
      console.log("responseUpdate", response);

      return response.data.data.updateCanbanTask;
    } catch (error) {
      console.log("Error get", error);
      throw error;
    }
  },
);

