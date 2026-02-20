import { createSlice } from "@reduxjs/toolkit";
import { addSubTask, fetchSubTask } from "./subTaskThunk";
import { toast } from "react-toastify";

const initialState = {
    subTasks:[],
    loading:false,
    error:null
};
const subTaskSlice = createSlice({
    name:"subTask",
    initialState,

    extraReducers:(builder)=>{
        builder
          .addCase(fetchSubTask.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchSubTask.fulfilled, (state, action) => {
            state.loading = false;
            state.subTasks = action.payload;
            // toast.success("SubTask Add Successfully")
          })
          .addCase(fetchSubTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error in SubTask";
            toast.error(state.error);
          })
          //
          .addCase(addSubTask.pending, (state) => {
            state.loading = true;
          })
          .addCase(addSubTask.fulfilled, (state, action) => {
            state.loading = false;
            state.subTasks.push(action.payload);
            // toast.success("SubTask Add Successfully")
          })
          .addCase(addSubTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error in SubTask";
            toast.error(state.error);
          });
    }
});
export default subTaskSlice.reducer