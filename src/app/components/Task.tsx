"use client";

import { ITask } from "@/types/tasks";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { deleteTodo, editTodo } from "../api/api";
import Modal from "./Modal";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [taskComplete, setTaskComplete] = useState<boolean>(task.completed);
  const [characterCount, setCharacterCount] = useState<number>(task.text.length);


  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await editTodo({
      id: task.id,
      text: taskToEdit,
      completed: taskComplete,
    });

    setTaskToEdit("");
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);

    setOpenModalDeleted(false);
    router.refresh();
  };

  const handleToggleComplete = async () => {
    await editTodo({
      id: task.id,
      text: task.text,
      completed: !taskComplete,
    });

    setTaskComplete(!taskComplete);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td>
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={taskComplete}
          onChange={handleToggleComplete}
        />
      </td>
      <td
        className={`w-full font-mono text-2xl max-w-1/2 break-words whitespace-normal ${
          task.completed ? "decoration-blue-700 line-through decoration-4" : ""
        }`}
      >
        {task.text}
      </td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className={`hover:text-warning`}
          size={30}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action flex flex-col">
              <textarea
                value={taskToEdit}
                onChange={(e) => {
                  setTaskToEdit(e.target.value)
                  setCharacterCount(e.target.value.length)
                }}
                maxLength={280}
                placeholder="Type here..."
                className={`
                textarea textarea-lg placeholder:italic placeholder:text-slate-400 
                block w-full h-40 border border-slate-600 rounded-xl py-2 pl-9 pr-3 shadow-sm 
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 
                focus:ring-1 sm:text-sm
              `}
              ></textarea>
              <div className="m-5 text-sm text-right">{characterCount}/280</div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500 hover:text-warning"
          size={30}
        />

        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">Are you sure you want to delete?</h3>
          <div className="modal-action">
            <button className="btn" onClick={() => handleDeleteTask(task.id)}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
