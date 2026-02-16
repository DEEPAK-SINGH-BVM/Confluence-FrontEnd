// import React, { useState, useRef } from "react";
// import { ImSpinner3 } from "react-icons/im";
// import { CiCalendarDate } from "react-icons/ci";
// import {
//   MdNotes,
//   MdAttachFile,
//   MdAlternateEmail,
//   MdOutlinePeople,
// } from "react-icons/md";
// import { AiOutlineUpload, AiOutlineCloudUpload } from "react-icons/ai";
// import PropTypes from "prop-types";

// export default function SideBar({ showSidebar, setShowSidebar, cardData }) {
//   console.log('CARD-DATA',cardData);

//   const [imageUrl, setImageUrl] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleImageUpload = () => {
//     const files = fileInputRef.current?.files;
//     if (!files || files.length === 0) return;

//     const formData = new FormData();
//     formData.append("file", files[0]);
//     formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

//     fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
//       {
//         method: "POST",
//         body: formData,
//       },
//     )
//       .then((res) => res.json())
//       .then((res) => {
//         setImageUrl((prev) => [...prev, res.secure_url]);
//       })
//       .catch((err) => console.error("Upload error:", err));
//   };

//   if (!showSidebar) return null;

//   return (
//     <div
//       id="drawer-navigation"
//       className="fixed top-0 right-0 p-4 shadow-2xl w-2/5 h-screen overflow-y-auto bg-white z-50 transition-all"
//       tabIndex={-1}
//       aria-labelledby="drawer-navigation-label"
//     >
//       <h5
//         id="drawer-navigation-label"
//         className="text-base font-semibold text-gray-500 uppercase"
//       >
//         Menu
//       </h5>
//       <button
//         type="button"
//         onClick={() => setShowSidebar(false)}
//         aria-controls="drawer-navigation"
//         className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center"
//       >
//         <svg
//           aria-hidden="true"
//           className="w-5 h-5"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fillRule="evenodd"
//             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//         <span className="sr-only">Close menu</span>
//       </button>

//       <div className="mr-36">
//         <div id="menu" className="rounded-lg p-4">
//           <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white to-transparent bg-clip-text">
//             {cardData?.title || "No title"}
//           </h1>

//           <div className="py-4 overflow-y-auto space-y-3">
//             <div className="flex gap-12">
//               <span className="flex ml-3 items-center gap-2">
//                 <ImSpinner3 />
//                 Status
//               </span>
//               <span className="font-bold">{cardData?.status || "N/A"}</span>
//             </div>

//             <div className="flex gap-12">
//               <span className="flex ml-3 gap-2 items-center">
//                 {/* <MdOutlinePeople /> */}
//                 People
//               </span>
//               <div className="flex flex-wrap items-center justify-start">
//                 {(() => {
//                   const people = [];
//                   if (cardData?.assignedTo)
//                     people.push({
//                       name: cardData.assignedTo,
//                       url: cardData.image,
//                     });
//                   // if (cardData?.reporter)
//                   //   people.push({
//                   //     name: cardData.reporter,
//                   //     url: cardData.image,
//                   //   });
//                   if (people.length > 0) {
//                     return people.map((item, index) => (
//                       <div
//                         className={`flex items-center justify-start mt-1 ${index !== 0 ? "ml-2" : ""}`}
//                         key={index}
//                       >
//                         <img
//                           src={item.url || "https://via.placeholder.com/20"}
//                           className="w-5 mr-2 rounded-full"
//                           alt={`${item.name} avatar`}
//                         />
//                         <span className="text-gray-900">{item.name}</span>
//                       </div>
//                     ));
//                   } else {
//                     return (
//                       <span className="text-gray-500">No people assigned</span>
//                     );
//                   }
//                 })()}
//               </div>
//             </div>

//             <div className="flex gap-12">
//               <span className="flex ml-3 gap-2 items-center">
//                 <CiCalendarDate />
//                 Dates
//               </span>
//               <span className="font-bold">
//                 {cardData.dueDate
//                   ? new Date(Number(cardData.dueDate)).toLocaleDateString(
//                       "en-US",
//                       {
//                         weekday: "short",
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       },
//                     )
//                   : "N/A"}
//               </span>
//             </div>

//             <div className="flex gap-4">
//               <span className="flex ml-3 gap-2 items-center">
//                 <MdNotes />
//                 Description
//               </span>
//               <textarea
//                 value={cardData?.description || ""}
//                 readOnly
//                 className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md resize-none"
//                 rows={2}
//               />
//             </div>

//             <div className="flex gap-6 items-center">
//               <span className="flex ml-3 gap-2 items-center">
//                 <AiOutlineUpload />
//                 Upload
//               </span>
//               <input type="file" ref={fileInputRef} />
//               <button
//                 type="button"
//                 className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
//                 onClick={handleImageUpload}
//               >
//                 Submit
//               </button>
//             </div>

//             <div className="flex gap-3 items-center mt-4">
//               <img
//                 className="rounded-full w-6 h-6 object-cover"
//                 src="https://img.freepik.com/free-photo/no-problem-concept-bearded-man-makes-okay-gesture-has-everything-control-all-fine-gesture-wears-spectacles-jumper-poses-against-pink-wall-says-i-got-this-guarantees-something_273609-42817.jpg?w=1800&t=st=1669749937~exp=1669750537~hmac=4c5ab249387d44d91df18065e1e33956daab805bee4638c7fdbf83c73d62f125"
//                 alt="User avatar"
//               />
//               <input
//                 placeholder="Add a comment..."
//                 className="w-full rounded-md border border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] outline-none py-1 px-6 focus:border-[#6A64F1] focus:shadow-md"
//               />
//               <div className="flex space-x-4">
//                 <MdAttachFile className="mt-2 cursor-pointer" />
//                 <MdAlternateEmail className="mt-2 cursor-pointer" />
//                 <AiOutlineCloudUpload className="mt-2 cursor-pointer" />
//               </div>
//             </div>

//             <div>
//               {imageUrl.length > 0 &&
//                 imageUrl.map((img, index) => (
//                   <img
//                     src={img}
//                     alt={`Uploaded ${index + 1}`}
//                     key={index}
//                     className="w-full max-w-lg mt-4 rounded"
//                   />
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// SideBar.propTypes = {
//   showSidebar: PropTypes.bool.isRequired,
//   setShowSidebar: PropTypes.func.isRequired,
//   cardData: PropTypes.shape({
//     title: PropTypes.string,
//     status: PropTypes.string,
//     people: PropTypes.arrayOf(
//       PropTypes.shape({
//         url: PropTypes.string,
//         name: PropTypes.string,
//       }),
//     ),
//     date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
//     description: PropTypes.string,
//   }),
// };

// SideBar.defaultProps = {
//   cardData: {},
// };
import React, { useState, useRef } from "react";
import { ImSpinner3 } from "react-icons/im";
import { CiCalendarDate } from "react-icons/ci";
import {
  MdNotes,
  MdAttachFile,
  MdAlternateEmail,
  MdOutlinePeople,
  MdLabel,
} from "react-icons/md";
import { AiOutlineUpload, AiOutlineCloudUpload } from "react-icons/ai";
import PropTypes from "prop-types";

export default function SideBar({ showSidebar, setShowSidebar, cardData }) {
  const [imageUrl, setImageUrl] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    )
      .then((res) => res.json())
      .then((res) => setImageUrl((prev) => [...prev, res.secure_url]))
      .catch((err) => console.error("Upload error:", err));
  };

  if (!showSidebar) return null;

  const formatDate = (timestamp) =>
    timestamp
      ? new Date(Number(timestamp)).toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  // Section card style for hover shadow
  const sectionClass =
    "bg-white/80 backdrop-blur-md rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start overflow-y-auto pt-12">
      <div className="relative max-w-6xl w-full bg-gradient-to-br from-white/80 to-gray-100/70 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        {/* Close Button */}
        <button
          onClick={() => setShowSidebar(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900  p-2 rounded-full"
        >
          ✕
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          {cardData?.title || "No Title"}
        </h1>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div
              className={`${sectionClass} flex justify-between items-center`}
            >
              <div className="flex items-center gap-2 text-gray-700">
                <ImSpinner3 /> Status
              </div>
              <span className="font-semibold">{cardData?.status || "N/A"}</span>
            </div>

            {cardData?.priority && (
              <div
                className={`${sectionClass} flex justify-between items-center`}
              >
                <div className="flex items-center gap-2 text-gray-700">
                  <MdLabel /> Priority
                </div>
                <span className="font-semibold">{cardData.priority}</span>
              </div>
            )}

            <div className={`${sectionClass}`}>
              <span className="flex items-center gap-2 text-gray-700 mb-2">
                <MdOutlinePeople /> People
              </span>
              <div className="flex flex-wrap gap-3">
                {cardData?.assignedTo && (
                  <div className="flex items-center gap-2">
                    <img
                      src={cardData.image || "https://via.placeholder.com/40"}
                      alt="Assignee"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{cardData.assignedTo}</span>
                  </div>
                )}
                {cardData?.reporter && (
                  <div className="flex items-center gap-2">
                    <img
                      src={cardData.image || "https://via.placeholder.com/40"}
                      alt="Reporter"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{cardData.reporter}</span>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`${sectionClass} flex justify-between items-center`}
            >
              <div className="flex items-center gap-2 text-gray-700">
                <CiCalendarDate /> Due Date
              </div>
              <span className="font-semibold">
                {formatDate(cardData?.dueDate)}
              </span>
            </div>

            {cardData?.labels?.length > 0 && (
              <div className={`${sectionClass}`}>
                <span className="flex items-center gap-2 text-gray-700 mb-2">
                  <MdLabel /> Labels
                </span>
                <div className="flex gap-2 flex-wrap">
                  {cardData.labels.map((label, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Description */}
            <div className={`${sectionClass}`}>
              <span className="flex items-center gap-2 text-gray-700 mb-2">
                <MdNotes /> Description
              </span>
              <textarea
                readOnly
                value={cardData?.description || ""}
                rows={5}
                className="w-full border border-gray-200 rounded-md p-2 text-gray-700 text-sm resize-none bg-white/60 backdrop-blur-sm"
              />
            </div>

            {/* Subtasks */}
            {cardData?.subtasks?.length > 0 && (
              <div className={`${sectionClass}`}>
                <span className="flex items-center gap-2 text-gray-700 mb-2">
                  Subtasks
                </span>
                <ul className="list-disc list-inside text-gray-700">
                  {cardData.subtasks.map((subtask, idx) => (
                    <li key={idx}>
                      {subtask.title} - <strong>{subtask.status}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comments */}
            {cardData?.comments?.length > 0 && (
              <div className={`${sectionClass}`}>
                <span className="flex items-center gap-2 text-gray-700 mb-2">
                  Comments
                </span>
                <div className="flex flex-col gap-3 max-h-52 overflow-y-auto">
                  {cardData.comments.map((comment, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <img
                        src={cardData.image || "https://via.placeholder.com/40"}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="bg-white/70 backdrop-blur-md p-2 rounded-md w-full shadow-sm hover:shadow-md transition-shadow">
                        <span className="font-semibold text-sm">
                          {comment.author}
                        </span>
                        <p className="text-sm">{comment.text}</p>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Section - Centered */}
        <div className="flex justify-center items-center gap-3 mt-6">
          <input type="file" ref={fileInputRef} />
          <button
            onClick={handleImageUpload}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Upload
          </button>
        </div>

        {/* Uploaded Images Preview */}
        {imageUrl.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {imageUrl.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Uploaded ${idx + 1}`}
                className="w-full rounded-lg shadow hover:shadow-lg transition-shadow"
              />
            ))}
          </div>
        )}

        {/* Additional Info at Bottom */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
          {cardData?.issueType && (
            <div>
              <strong>Type:</strong> {cardData.issueType}
            </div>
          )}
          {cardData?.project && (
            <div>
              <strong>Project:</strong>
              {cardData?.project?.name || "No Project"}
            </div>
          )}
          {cardData?.sprint && (
            <div>
              <strong>Sprint:</strong> {cardData.sprint}
            </div>
          )}
          {cardData?.epic && (
            <div>
              <strong>Epic:</strong> {cardData.epic}
            </div>
          )}
          {cardData?.createdAt && (
            <div>
              <strong>Created:</strong> {formatDate(cardData.createdAt)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
  cardData: PropTypes.object,
};

SideBar.defaultProps = {
  cardData: {},
};
