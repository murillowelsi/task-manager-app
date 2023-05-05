import { prismaClient } from "./prismaClient";

async function seed() {
  await prismaClient.task.createMany({
    data: [
      {
        text: "Hello",
        completed: false,
      },
      {
        text: "Hello 1",
        completed: false,
      },
    ],
  });
}

seed();
