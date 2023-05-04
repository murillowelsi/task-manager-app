"use client";
import { ITask } from "@/types/tasks";
import React from "react";
import { FiClipboard } from "react-icons/fi";
import AddTask from "./AddTask";

interface TodoListProps {
  tasks: ITask[];
}

const Greeting: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="text-center my-5 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-white flex gap-2">
          You dont have any tasks yet. Add a new task below!
          <FiClipboard className="text-white" size={30} />
        </h1>
        <AddTask />
      </div>
    </div>
  );
};

export default Greeting;
