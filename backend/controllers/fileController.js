import multer from 'multer';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: './public/Images',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// Create a Multer upload instance using configured storage
const upload = multer({ storage }).single('file');

// Function to handle file upload
function handleFileUpload(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Multer error occurred', message: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    next();
  });
}

// Function to add file details to the database
async function addFileToDatabase(req, res) {
  const { filename, mimetype, path } = req.file;
  const profileId = req.body.profile_ID; // Assuming you have a way to get the user's profile ID

  try {
    // Read file content synchronously
    const fileContent = fs.readFileSync(path);

    // Convert file content to base64 encoding
    const encodedData = fileContent.toString('base64');

    const newFile = await prisma.file.create({
      data: {
        filename,
        mimetype,
        data: encodedData, // Store base64 encoded file content
        profile: { connect: { id: profileId } }, // Link file to the user's profile
      },
    });

    res.status(200).json({ message: 'File uploaded and added to database', file: newFile });
  } catch (error) {
    console.error('Error adding file:', error);
    res.status(500).json({ error: 'Failed to add file to database' });
  }
}

// Function to get all uploaded files
async function getAllFiles(req, res) {
  try {
    const uploadedFiles = await prisma.file.findMany();
    res.status(200).json({ files: uploadedFiles });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed fetching uploaded files' });
  }
}

const fileController = { getAllFiles, addFileToDatabase, handleFileUpload };

export default fileController;
