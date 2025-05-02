import React, { useState } from "react";
import CrudGrid from "./CrudGrid";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Crud = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [userId, setUserId] = useState(null);

  //ADD DATA IN TABLE:--
  const createMutation = useMutation({
    mutationFn: (user) => axios.post("http://localhost:4000/users", user),
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });

  //EDIT DATA IN TABLE:--
  const updateMutation = useMutation({
    mutationFn: (user) =>
      axios.put(`http://localhost:4000/users/${userId}`, user),
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: oldQueryData.data.map((u) =>
            u.id === data.data.id ? data.data : u
          ),
        };
      });
      resetForm();
    },
  });

  //DELETE DATA FROM TABLE:--
  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:4000/users/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["users"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: oldQueryData.data.filter((user) => user.id !== id),
        };
      });
    },
  });

  const handleFormData = () => {
    const user = { name, email, number };
    if (userId) {
      updateMutation.mutate({ ...user, id: userId });
    } else {
      createMutation.mutate(user);
    }
    resetForm();
  };

  const handleEditData = (n, e, num, id) => {
    setName(n);
    setEmail(e);
    setNumber(num);
    setUserId(id);
  };

  const handleDeleteData = (id) => {
    deleteMutation.mutate(id);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setNumber("");
    setUserId(null);
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">
            Add a new user
          </h2>
          <form action={handleFormData}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type user name"
                  required=""
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type user email"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Number
                </label>
                <input
                  type="number"
                  name="number"
                  id="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type user number"
                  required=""
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add user
            </button>
          </form>
        </div>
      </section>
      <CrudGrid
        handleEditData={handleEditData}
        handleDeleteData={handleDeleteData}
      />
    </>
  );
};

export default Crud;
