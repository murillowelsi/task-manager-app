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
  const [taskComplete, setTaskComplete] = useState<boolean>(task.complete);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await editTodo({
      id: task.id,
      text: taskToEdit,
      complete: taskComplete,
    });

    setTaskToEdit("");
    setTaskComplete(false);
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
      complete: !taskComplete,
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
      <td className={`w-full ${task.complete ? 'line-through' : ''}`}>{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500 hover:text-warning"
          size={30}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
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
          <h3 className="text-lg">
            Are you sure you want to delete this task?
          </h3>
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
