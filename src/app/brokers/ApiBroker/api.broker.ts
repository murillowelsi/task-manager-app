import { ITask } from "@/types/tasks";

const baseUrl = "http://localhost:3000/api";

export const ApiBroker = {
  async getAllTodos(): Promise<ITask[]> {
    const res = await fetch(`${baseUrl}/tasks`, { method: 'get', cache: 'no-store' });
    const todos = await res.json();

    return todos;
  },

  async addTodo(todo: ITask): Promise<ITask> {
    const res = await fetch(`${baseUrl}/tasks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const newTodo = await res.json();
    return newTodo;
  },

  async editTodo(todo: ITask): Promise<ITask> {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const updatedTodo = await res.json();
    return updatedTodo;
  },

  async deleteTodo (id: string): Promise<void> {
    await fetch(`${baseUrl}/tasks/${id}`, {
      method: "DELETE",
    });
  },
}