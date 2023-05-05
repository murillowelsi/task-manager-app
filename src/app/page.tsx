import { } from "next/font/google";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

import Image from "next/image";

import logo from "../../public/25friday_logo.svg";
import { ApiBroker } from "./brokers";
import Greeting from "./components/Greeting";

export default async function Home() {
  const tasks = await ApiBroker.getAllTodos();

  return (
    <>
      <header className="max-w-full bg-black h-20 text-white">
        <div className="max-w-3xl mx-auto h-full">
          <div className="flex flex-col justify-center h-full">
            <Image src={logo} alt="Friday logo" />
          </div>
        </div>
      </header>
      <div className="max-w-3xl mx-auto mt-8">
        <div className="text-center my-5 flex flex-col gap-8">
          {tasks.length > 0 ? (
            <>
              <h1 className="text-2xl font-bold text-white">
                What needs to be done?
              </h1>
              <AddTask />
              <TodoList tasks={tasks} />
            </>
          ) : (
            <Greeting tasks={[]} />
          )}
        </div>
      </div>
    </>
  );
}
