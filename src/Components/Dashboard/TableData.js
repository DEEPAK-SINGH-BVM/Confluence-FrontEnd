import React, { useState } from "react";
const TableData = () => {
  const [tableData] = useState([
    { members: "mno", gender: "male", role: "TL", number: "98332332488" },
    { members: "jkl", gender: "male", role: "Trainee", number: "98332332488" },
    { members: "xyz", gender: "male", role: "Tester", number: "98332332488" },
    {
      members: "abc",
      gender: "female",
      role: "designer",
      number: "98332332488",
    },
    { members: "xyz", gender: "male", role: "Tester", number: "98332332488" },
    { members: "xyz", gender: "male", role: "Tester", number: "98332332488" },
    { members: "xyz", gender: "male", role: "Tester", number: "98332332488" },
    { members: "xyz", gender: "male", role: "Tester", number: "98332332488" },
  ]);
  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-white">
        <thead className="text-xs text-gray-100 dark:text-white bg-blue-500">
          <tr>
            <th scope="col" className="px-6 py-3">
              Members
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Mobile No.
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((ele) => (
              // eslint-disable-next-line react/jsx-key
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  {ele.members}
                </th>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {ele.role}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {ele.gender}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {ele.number}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
export default TableData;
