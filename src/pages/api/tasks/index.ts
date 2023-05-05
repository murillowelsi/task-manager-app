import { NextApiHandler } from "next";
import { prismaClient } from "../../../../prisma/prismaClient";

const handler: NextApiHandler = async (req, res) => {

  if (req.method === "GET") {
    const todos = await prismaClient.task.findMany();
    res.status(200).json(todos);
  }

  res.status(405)
}

export default handler;