import React, { useRef, useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import HeaderLogo from '../../assets/images/logo.png';
import { AiFillHome, AiOutlineTeam, AiFillProject, AiFillWechat } from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux";
import { getCanbanProjects, getCanbanTasks } from "../../redux/canban/canbanThunk";


const Header = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const sideBarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleOpen = () => setOpen((prev) => !prev);

  const handleSideBarOpen = () => setSideBarOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      setSideBarOpen(false);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    document.addEventListener("click", handleClickOutside, false);
  }, []);

  const handleMenu = (title) => {
    if (title === "profile") {
      setOpen(false);
    } else if (title === "settings") {
      setOpen(false);
    } else if (title === "sign-out") {
      localStorage.clear();
      setOpen(false);
    }
  };
  const projectsFromRedux = useSelector((state) => state.task.projects);
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState("");
  console.log("SelectProject",selectedProject);

  useEffect(() => {
    dispatch(getCanbanProjects());
  }, [dispatch]);


  return (
    <>
      <nav className="sticky top-0 z-0 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-[0_35px_50px_-15px_rgba(0,0,0,0.2)] z-10">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                ref={sideBarRef}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                onClick={handleSideBarOpen}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-100 rounded-lg md:hidden bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <button
                  type="button"
                  className="rounded-full bg-indigo-500 p-1 mr-3 text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <div>
                  <button
                    type="button"
                    onClick={handleOpen}
                    ref={wrapperRef}
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-blue-400 dark:focus:ring-black-600 focus:ring-offset-black-800"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed right-5 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${open ? "" : "hidden"}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex="-1"
      >
        <Link
          to="/"
          onClick={() => handleMenu("profile")}
          className="block px-4 py-2 hover:bg-indigo-600 hover:text-white text-sm text-gray-700"
          role="menuitem"
          tabIndex="-1"
          id="user-menu-item-0"
        >
          Your Profile
        </Link>
        <Link
          to="/login"
          onClick={() => handleMenu("sign-out")}
          className="block px-4 py-2 hover:bg-indigo-600 hover:text-white text-sm text-gray-700"
          role="menuitem"
          tabIndex="-1"
          id="user-menu-item-2"
        >
          Sign out
        </Link>
      </div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-56 h-screen  transition-transform -translate-x-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${sideBarOpen ? "translate-x-0" : "sm:translate-x-0"}`}
        aria-label="Sidebar"
      >
        <div className="flex items-center cursor-pointer">
          <Link to="/" className="flex ml-2">
            <img src={HeaderLogo} className="h-14 w-20" alt="Logo" />
          </Link>
          <span>Confilunce</span>
          <button
            type="button"
            onClick={handleSideBarOpen}
            className="bg-white rounded-md p-2 ml-14 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 min-[640px]:hidden"
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="min-h-screen flex flex-row bg-gray-100">
          <div className="flex flex-col w-56 bg-white ml-2 overflow-hidden">
            <ul className="flex flex-col py-4">
              <li>
                <Link
                  to="/"
                  className={`${window.location.pathname === "/" ? "translate-x-2 text-gray-800" : ""} flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <AiFillHome />
                  </span>
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/canban"
                  className={`${window.location.pathname === "/canban" ? "translate-x-2 text-gray-800" : ""} flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <AiOutlineTeam />
                  </span>
                  <span className="text-sm font-medium">Canban Board</span>
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/projects"
                  className={` ${window.location.pathname === "projects" ? "translate-x-2 text-gray-800" : ""} flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <AiFillProject />
                  </span>
                  <span className="text-sm font-medium">Add Projects</span>
                </Link>
              </li> */}
              <li>
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <AiFillProject />
                </span>
                <span className="text-sm font-medium text-gray-400">
                  Projects
                </span>
                {/* <select
                  className="w-full px-2 py-2 border rounded text-sm border-gray-400"
                  value={selectedProject}
                  //   onChange={(e) => setSelectedProject(e.target.value)}
                  onChange={handleProjectChange}
                >
                  <option value="" disabled>
                    Select Project
                  </option>
                  {projectsFromRedux &&
                    projectsFromRedux.map((project) => {
                      console.log(
                        "projectId",
                        project.id,
                        "projectName",
                        project.name,
                      );
                      return (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      );
                    })}
                </select> */}
                {/* <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-2 py-2 border rounded text-sm border-gray-400"
                >
                  <option value="">
                    Select Project
                  </option>
                  {projectsFromRedux.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select> */}
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <div className="md:ml-56">
        <Outlet />
      </div>
    </>
  );
};;
export default Header;
