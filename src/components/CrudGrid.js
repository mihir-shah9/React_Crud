import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CrudGrid = ({ handleEditData, handleDeleteData }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get("http://localhost:4000/users"),
  });

  if (isLoading) {
    return <h1 className="text-center font-bold text-3xl">Loading...</h1>;
  }

  return (
    <div className="container mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data &&
              data.data.map((user) => {
                return (
                  <tr
                    key={user.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.number}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleEditData(
                            user.name,
                            user.email,
                            user.number,
                            user.id
                          )
                        }
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-800 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteData(user.id)}
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-800 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ml-3"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudGrid;
