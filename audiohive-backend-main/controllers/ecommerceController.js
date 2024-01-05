import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new merch for the logged-in user
async function addMerch(req, res) {
  const { userId } = req.user; // Assuming you have user information in the request
  const { merchName, merchType, merchCost, merchQty } = req.body;

  try {
    const newMerch = await prisma.merch.create({
      data: {
        merchName,
        merchType,
        merchCost,
        merchQty,
        profile: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(newMerch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add merch." });
  }
}

// Retrieve all merch for the logged-in user
async function getUserMerch(req, res) {
  const { userId } = req.user; // Assuming you have user information in the request

  try {
    const userMerch = await prisma.merch.findMany({
      where: {
        profileId: userId,
      },
    });

    res.json(userMerch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user merch." });
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

// Update a merch by ID for the logged-in user
async function updateMerch(req, res) {
  const { userId } = req.user; // Assuming you have user information in the request
  const { id } = req.params;
  const { merchName, merchType, merchCost, merchQty } = req.body;

  try {
    const updatedMerch = await prisma.merch.update({
      where: {
        id: parseInt(id),
        profileId: userId,
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

// Delete a merch by ID for the logged-in user
async function deleteMerch(req, res) {
  const { userId } = req.user; // Assuming you have user information in the request
  const { id } = req.params;

  try {
    const deletedMerch = await prisma.merch.delete({
      where: {
        id: parseInt(id),
        profileId: userId,
      },
    });

    res.json(deletedMerch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete merch." });
  }
}

// Function to handle buying a merch
async function buyMerch(req, res) {
  const { userId } = req.user; // Assuming you have user information in the request
  const { id, quantity } = req.body;

  try {
    const merch = await prisma.merch.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!merch) {
      return res.status(404).json({ error: "Merch not found." });
    }

    if (merch.merchQty < quantity) {
      return res.status(400).json({ error: "Not enough quantity available." });
    }

    // Assuming you have a `Order` model to track orders
    const newOrder = await prisma.order.create({
      data: {
        userId,
        merchId: parseInt(id),
        quantity,
        totalPrice: quantity * merch.merchCost,
      },
    });

    // Update merch quantity after purchase
    await prisma.merch.update({
      where: {
        id: parseInt(id),
      },
      data: {
        merchQty: merch.merchQty - quantity,
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to buy merch." });
  }
}

const ecommerceController = {
  addMerch,
  getUserMerch,
  getMerchById,
  updateMerch,
  deleteMerch,
  buyMerch,
};

export default ecommerceController;
