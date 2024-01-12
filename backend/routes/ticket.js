import express from "express";
import ticketController from "../controllers/ticketController.js";

const ticketRouter = express.Router();

ticketRouter.get("/", ticketController.getAllTickets);
ticketRouter.post("/addticket", ticketController.createTicket);
ticketRouter.post("/deleteticket/:id", ticketController.deleteTicket);
ticketRouter.put("/updateticket/:id", ticketController.updateTicket);
ticketRouter.get("/ticket/:id", ticketController.getTicketById);

export default ticketRouter;