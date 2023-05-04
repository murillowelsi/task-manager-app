"use client";
import { ITask } from "@/types/tasks";
import React, { useState } from "react";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const pendingTasks = tasks.filter((task) => !task.complete);
  const completedTasks = tasks.filter((task) => task.complete && showCompleted);
  const hasCompletedTasks = tasks.some((task) => task.complete);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
          {showCompleted &&
            completedTasks.map((task) => <Task key={task.id} task={task} />)}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>
              {hasCompletedTasks && (
                <button
                  className="btn btn-xs btn-outline btn-primary"
                  onClick={() => setShowCompleted(!showCompleted)}
                >
                  {showCompleted ? "Hide completed" : "Show all"}
                </button>
              )}
            </th>
            <th>
              {pendingTasks.length === 1
                ? `${pendingTasks.length} Item Left`
                : pendingTasks.length > 1
                ? `${pendingTasks.length} Items Left`
                : "No items left, Good Job!"}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TodoList;
