import React, { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { CiCalendarDate } from "react-icons/ci";
import {
  MdNotes,
  MdAttachFile,
  MdAlternateEmail,
  MdOutlinePeople,
} from "react-icons/md";
import { AiOutlineUpload, AiOutlineCloudUpload } from "react-icons/ai";
import PropTypes from "prop-types";

export default function SideBar(props) {
  const [imageUrl, setImageUrl] = useState([]);
  const { cardData } = props;
  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
    const options = {
      method: "POST",
      body: formData,
    };

    return (
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUND_NAME}/image/upload`,
        options,
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log('res', res);
          setImageUrl([...imageUrl, res.secure_url]);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err))
    );
  };

  return (
    props?.showSidebar && (
      <div
        id="drawer-navigation"
        className="fixed top-0 right-0 group p-4 transition-all duration-300  bg-white  lg:p-8 w-2/5  h-screen p-4 shadow-2xl bg-white z-50 transition-all  overflow-y-auto bg-white-900  "
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={() => props?.setShowSidebar(false)}
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="grid   mr-36">
          <div id="menu" className=" col-span-3 rounded-lg p-4 ">
            <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white  to-transparent bg-clip-text ">
              {cardData?.title}
            </h1>
            <div className="py-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex gap-12">
                  <span className="flex ml-3 items-center gap-2">
                    <ImSpinner3 />
                    Status
                  </span>
                  <span className="font-bold">{cardData?.status}</span>
                </div>
                <div className="flex gap-12">
                  <span className="flex ml-3 gap-2 items-center">
                    <MdOutlinePeople />
                    People
                  </span>
                  <div className="flex flex-wrap items-center justify-start">
                    {cardData?.people.map((items, index) => {
                      return (
                        <div
                          className={`flex items-center justify-start mt-1  ${index && "ml-2"}`}
                          key={index}
                        >
                          <img
                            src={items.url}
                            className="w-5 mr-2 rounded-full ml-2"
                            alt="Avatar"
                          />
                          <span className="text-gray-900 ">{items.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-12">
                  <span className="flex ml-3 gap-2 items-center">
                    <CiCalendarDate />
                    Dates
                  </span>
                  <span className="font-bold">{cardData?.date}</span>
                </div>
                <div className="flex gap-4">
                  <span className="flex ml-3 gap-2 items-center">
                    <MdNotes />
                    Description
                  </span>
                  <input
                    value={cardData?.description}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="flex gap-6">
                  <span className="flex ml-3 gap-2 items-center">
                    <AiOutlineUpload />
                    Upload
                  </span>
                  <input type="file" multiple />
                  <button
                    type="button"
                    className=""
                    onClick={handleImageUpload}
                  >
                    Submit
                  </button>
                </div>
                <div className="flex gap-3">
                  <div className="flex ml-3">
                    {" "}
                    <img
                      className="rounded-full w-6 h-6 relative object-cover mt-1"
                      src="https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=1800&t=st=1669749937~exp=1669750537~hmac=4c5ab249387d44d91df18065e1e33956daab805bee4638c7fdbf83c73d62f125"
                      alt=""
                    />
                  </div>
                  <div className="flex gap-5">
                    <input
                      placeholder="add a comment....."
                      className="w-full rounded-md border border-[#e0e0e0] bg-white  text-base font-medium text-[#6B7280] outline-none py-1 px-6 focus:border-[#6A64F1] focus:shadow-md"
                    />
                    <div className="flex">
                      {" "}
                      <MdAttachFile className="mt-2" />
                      <MdAlternateEmail className="mt-2 ml-5" />
                      <AiOutlineCloudUpload className="mt-2 ml-5" />
                    </div>
                  </div>
                </div>
                <div>
                  {imageUrl &&
                    imageUrl.map((img, index) => (
                      <img src={img} alt="" key={index} className="w-[500px]" />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
SideBar.propTypes = {
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
  cardData: PropTypes.array,
};
