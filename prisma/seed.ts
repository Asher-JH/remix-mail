import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

const seed = async (): Promise<void> => {
  const passwordHash = await bcrypt.hash("123456", 10);

  try {
    await db.user.create({
      data: {
        email: "asher@whiteroom.work",
        name: "Asher",
        passwordHash,
      },
    });
  } catch (err) {
    console.log("Error occured");
  }
};

seed();
