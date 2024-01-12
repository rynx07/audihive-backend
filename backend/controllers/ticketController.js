import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new ticket
async function createTicket(req, res) {
  const { ticketName, ticketType, ticketCost, ticketQty } = req.body;

  try {
    const newTicket = await prisma.tickets.create({
      data: {
        ticketName,
        ticketType,
        ticketCost,
        ticketQty,
      },
    });

    res.status(201).json(newTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create ticket." });
  }
}

// Retrieve all tickets
async function getAllTickets(req, res) {
  try {
    const allTickets = await prisma.tickets.findMany();
    res.json(allTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve tickets." });
  }
}

// Retrieve a single ticket by ID
async function getTicketById(req, res) {
  const { id } = req.params;

  try {
    const ticket = await prisma.tickets.findUnique({
      where: {
       id: parseInt(id),
      },
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve ticket." });
  }
}

// Update a ticket by ID
async function updateTicket(req, res) {
  const { id } = req.params;
  const { ticketName, ticketType, ticketCost, ticketQty } = req.body;

  try {
    const updatedTicket = await prisma.tickets.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ticketName,
        ticketType,
        ticketCost,
        ticketQty,
      },
    });

    res.json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update ticket." });
  }
}

// Delete a ticket by ID
async function deleteTicket(req, res) {
  const { id } = req.params;

  try {
    const deletedTicket = await prisma.tickets.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json(deletedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete ticket." });
  }
}

const ticketController = { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket,
};

export default ticketController;