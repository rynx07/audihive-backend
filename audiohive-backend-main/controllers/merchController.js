import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new merch
async function createMerch(req, res) {
    const { merchName, merchType, merchCost, merchQty } = req.body;
  
    try {
      const newMerch = await prisma.merch.create({
        data: {
          merchName,
          merchType,
          merchCost,
          merchQty,
        },
      });
  
      res.status(201).json(newMerch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create merch." });
    }
  }
  
  // Retrieve all merch
  async function getAllMerch(req, res) {
    try {
      const allMerch = await prisma.merch.findMany();
      res.json(allMerch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve merch." });
    }
  }
  
  // Retrieve a single merch by ID
  async function getMerchById(req, res) {
    const { id } = req.params;
  
    try {
      const merch = await prisma.merch.findUnique({
        where: {
          id: parseInt(id),
        },
      });
  
      if (!merch) {
        return res.status(404).json({ error: "Merch not found." });
      }
  
      res.json(merch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve merch." });
    }
  }
  
  // Update a merch by ID
  async function updateMerch(req, res) {
    const { id } = req.params;
    const { merchName, merchType, merchCost, merchQty } = req.body;
  
    try {
      const updatedMerch = await prisma.merch.update({
        where: {
          id: parseInt(id),
        },
        data: {
          merchName,
          merchType,
          merchCost,
          merchQty,
        },
      });
  
      res.json(updatedMerch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update merch." });
    }
  }
  
  // Delete a merch by ID
  async function deleteMerch(req, res) {
    const { id } = req.params;
  
    try {
      const deletedMerch = await prisma.merch.delete({
        where: {
          id: parseInt(id),
        },
      });
  
      res.json(deletedMerch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete merch." });
    }
  }
  

const merchController = { createMerch, getAllMerch, getMerchById, updateMerch, deleteMerch };

export default merchController