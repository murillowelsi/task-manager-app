"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { ApiBroker } from "../brokers/ApiBroker";
import Modal from "./Modal";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [characterCount, setCharacterCount] = useState<number>(0);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await ApiBroker.addTodo({
      id: uuidv4(),
      text: newTaskValue,
      completed: false,
    });

    setNewTaskValue("");
    setCharacterCount(0);
    setModalOpen(false);
    router.refresh();
  };

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTaskValue(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  return (
    <div>
      <button
        onClick={() => {
          setNewTaskValue("");
          setModalOpen(true)}}
        className="btn btn-primary w-full"
      >
        Add new task
        <AiOutlinePlusCircle className="ml-1" size={15} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action flex flex-col">
            <textarea
              value={newTaskValue}
              onChange={handleNewTaskChange}
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
    </div>
  );
};

export default AddTask;
