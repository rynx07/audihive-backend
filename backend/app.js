// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
import merchRouter from './routes/merch.js';
import ticketRouter from './routes/ticket.js';
import ecommerceRouter from './routes/ecommerce.js';
import chatRouter from './routes/chat.js';
import dashboardRouter from './routes/dashboard.js';
import filesRouter from './routes/addfile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(morgan('dev')); // Logging middleware
app.use(cors()); // CORS middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Cookie parsing middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/merch', merchRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/ecommerce', ecommerceRouter);
app.use('/api/file', filesRouter); // Mount your file routes here
app.use('/api/chats', chatRouter); // Mount your chat routes here
app.use('/api/dashboard', dashboardRouter);

// Start server
const server = app.listen(port, () =>
  console.log(`🚀 Server is running. Port: ${port}`)
);

export default server;
