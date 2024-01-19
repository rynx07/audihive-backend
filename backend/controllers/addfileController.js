// controllers/addfileController.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { originalname } = req.file;

    // Save file details to the database using Prisma
    const newFile = await prisma.file.create({
      data: {
        originalname,
      },
    });

    res.json(newFile);
  } catch (error) {
    console.error("Error in addFile:", error);

    // Check if it's a Prisma error
    if (error.code === 'P2002' && error.meta?.target?.includes('originalname_unique')) {
      return res.status(400).json({ error: 'Duplicate filename. Please choose a different name.' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getLatestFile = async (req, res) => {
  try {
    // Fetch the latest uploaded file
    const latestFile = await prisma.file.findFirst({
      // No orderBy clause
    });

    if (!latestFile) {
      return res.status(404).json({ error: 'No file found' });
    }

    res.json(latestFile);
  } catch (error) {
    console.error('Error in getLatestFile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addfileController = { addFile, getLatestFile };

export default addfileController;
