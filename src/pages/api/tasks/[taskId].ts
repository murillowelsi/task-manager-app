import { NextApiHandler } from "next";
import { prismaClient } from "../../../../prisma/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PUT") {
    const taskId = req.query.taskId as string;
    const payload = req.body;

    if (taskId) {
      const newTodo = await prismaClient.task.update({
        where: {
          id: taskId,
        },
        data: {
          text: payload.text,
          completed: payload.completed,
        },
      });

      res.status(201).json(newTodo);
    } else {
      res.status(400).end();
    }
  } else if (req.method === "DELETE") {
    const taskId = req.query.taskId as string;

    if (taskId) {
      await prismaClient.task.delete({
        where: {
          id: taskId,
        },
      });
      res.status(204).end();
    } else {
      res.status(400).end();
    }
  } else {
    res.status(405).end();
  }
};

export default handler;
