import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../redux/canban/canbanSlice";

const ProjectForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  console.log('title',title);
  const [description, setDescription] = useState("");
  console.log('description',description);
  const [status, setStatus] = useState("requested");
  console.log('status',status);
  const [assignee, setAssignee] = useState("");
  console.log('assignee',assignee);
  const [image, setImage] = useState(null); 
  console.log('image',image);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newTask = {
      id: uuidv4(),
      title,
      status,
      people: assignee ? [{ name: assignee }] : [],
      date: new Date().toLocaleDateString(),
      description,
      image: image ? URL.createObjectURL(image) : null,
    };
    console.log('newTask',newTask);
    dispatch(addTask({ status, task: newTask }));

    // reset form
    setTitle("");
    setDescription("");
    setAssignee("");
    setStatus("requested");
    setImage(null);
  };

  return (
    <div className="flex justify-center mt-10">
    <div className=" p-4 border rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Create Canban Task</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Assignee name (optional)"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])} 
          className="border p-2 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="requested">Requested</option>
          <option value="toDo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
    </div>
  );
};

export default ProjectForm;
