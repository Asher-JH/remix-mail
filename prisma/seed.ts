import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const seed = async (): Promise<void> => {
  try {
    await db.user.create({
      data: {
        email: "asher@whiteroom.work",
        name: "Asher",
        password: "123", // @todo: Hash password
      },
    });
  } catch (err) {
    console.log("Error occured");
  }
};

seed();
