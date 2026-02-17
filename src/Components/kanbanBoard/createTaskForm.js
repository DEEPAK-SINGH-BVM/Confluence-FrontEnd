import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createCanbanTask } from "../../redux/canban/canbanThunk";

export default function CreateTaskForm({ onClose }) {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.task.projects) || [];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("requested");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [reporter, setReporter] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [issueType, setIssueType] = useState("TASK");
  const [project, setProject] = useState("");
  console.log('createTaskProject',project);
  
  const [sprint, setSprint] = useState("");
  const [epic, setEpic] = useState("");
  const [labels, setLabels] = useState([]);
  const [subtasks, setSubtasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [image, setImage] = useState("");

 const handleSubmit = async (e) => {
   e.preventDefault();

   // Basic validation
   if (!title || !status || !project) {
     console.log("Title, Status, and Project are required");
     return;
   }

   // Prepare task payload
   const taskPayload = {
     title,
     description,
     status,
     priority,
     assignedTo,
     reporter,
     dueDate,
     issueType,
     project,
     sprint,
     epic,
     labels,
     subtasks,
     comments,
     image,
   };
    console.log("CreateTaskPayload", taskPayload);
    dispatch(createCanbanTask(taskPayload));

   console.log("Task created successfully!");
   onClose();
 };

  return (
    <form className="space-y-4 p-4 w-full max-w-2xl" onSubmit={handleSubmit}>
      <div>
        <div>
          <label className="block mb-1 font-semibold">Title*</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            className="w-full border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Status*</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="requested">Requested</option>
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Priority</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Project*</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Issue Type</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
          >
            <option value="TASK">Task</option>
            <option value="BUG">Bug</option>
            <option value="STORY">Story</option>
            <option value="EPIC">Epic</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Due Date</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Sprint</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={sprint}
            onChange={(e) => setSprint(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Epic</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={epic}
            onChange={(e) => setEpic(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Assigned To</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div>
          <label className="block mb-1 font-semibold">Reporter</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={reporter}
            onChange={(e) => setReporter(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Labels (comma separated)
          </label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={labels.join(",")}
            onChange={(e) => setLabels(e.target.value.split(","))}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Image URL</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Create Task
      </button>
    </form>
  );
}
