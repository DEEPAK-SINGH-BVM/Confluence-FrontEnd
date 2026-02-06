import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {
    requested: {
      name: "Requested",
      items: [
        {
          id: "1",
          title: "mvp-1",
          status: "Requested",
          people: [
            {
              name: "PersonA",
              url: "https://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097465/ja2lg74ud8p5xlraomiz.png",
            },
            {
              name: "PersonB",
              url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png",
            },
          ],
          date: "",
          description: "no description",
          body: "",
        },
        {
          id: "2",
          title: "mvp-2",
          status: "Requested",
          people: [
            {
              name: "PersonC",
              url: "http://res.cloudinary.com/dn0gbcq6x/image/upload/v1678097719/vcw5kjubw5gowhttblaq.png",
            },
          ],
          date: "",
          description: "no description",
          body: "",
        },
      ],
    },
    toDo: {
      name: "To do",
      items: [
        {
          id: "3",
          title: "mvp-3",
          status: "to do",
          people: [],
          date: "",
          description: "description",
          body: "",
        },
      ],
    },
    inProgress: {
      name: "In Progress",
      items: [],
    },
    done: {
      name: "Done",
      items: [
        {
          id: "4",
          title: "mvp-4",
          status: "done",
          people: [],
          date: "",
          description: "description",
          body: "",
        },
      ],
    },
  },
};

export const canbanTasks = createSlice({
  name: "user",
  initialState,
  reducers: {
    editTask: (state, action) => {
      state.tasks = action.payload;
    },
  },
});
export const { editTask } = canbanTasks.actions;
export default canbanTasks.reducer;
