import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../redux/canban/canbanThunk";
const ProjectForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    const projectPayload = { title }; 
    console.log("Submitting projectPayload:", projectPayload);

    // Dispatch the thunk to create project
    dispatch(createProject(projectPayload));

    // Reset form
    setTitle("");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="p-4 border rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Project</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
