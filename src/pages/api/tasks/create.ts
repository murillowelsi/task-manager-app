import { NextApiHandler } from "next";
import { prismaClient } from "../../../../prisma/prismaClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const payload = req.body;

    const newTodo = await prismaClient.task.create({
      data: {
        text: payload.text,
        completed: payload.completed
      }
    });

    res.status(201).json(newTodo);
  }

  res.status(405)
}

export default handler;