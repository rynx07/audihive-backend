import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Record a purchase
async function recordPurchase(req, res) {
  const { buyerId, sellerId, amount } = req.body;

  try {
    // Deduct the amount from the buyer's account
    await prisma.profile.update({
      where: { id: buyerId },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    // Add the amount to the seller's earnings
    await prisma.profile.update({
      where: { id: sellerId },
      data: {
        earnings: {
          increment: amount,
        },
      },
    });

    // Record the purchase in the database
    const purchase = await prisma.purchase.create({
      data: {
        buyerId,
        sellerId,
        amount,
      },
    });

    res.status(201).json(purchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to record purchase." });
  }
}

// Retrieve earnings for a specific user
async function getUserEarnings(req, res) {
  const { userId } = req.params;

  try {
    const userEarnings = await prisma.profile.findUnique({
      where: { id: parseInt(userId) },
      select: { earnings: true },
    });

    if (!userEarnings) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ earnings: userEarnings.earnings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve earnings." });
  }
}

const dashboardController = { recordPurchase, getUserEarnings };

export default dashboardController;
