import { PrismaClient } from "@prisma/client";
import usersSeed from "./usersSeed";

const prisma = new PrismaClient();

async function runSeeds(){
  try {
    const seed1 = await usersSeed();

    if (seed1) {
      console.log("Seeding successful")
    }
  } catch (err) {
    console.log("error")
  }
}


runSeeds();