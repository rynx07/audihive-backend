import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



// Create a new merch for the logged-in user - gagana na.
async function addProduct(req, res) {
  const { profileId } = req.body; // Assuming profileId is sent in the request body
  const { merchName, merchType, merchCost, merchQty } = req.body;

  try {
    const newProduct = await prisma.merch.create({
      data: {
        merchName,
        merchType,
        merchCost,
        merchQty,
        profileId: parseInt(profileId) // Assign the profileId to profileId to link the merchandise to a profile
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add merch.' });
  }
}

//get all product - gagana na.
async function getAllProducts (req, res) {

  try {
    const allProducts = await prisma.merch.findMany();
      res.json(allProducts);
}
  catch(error) {
    console.log(error);
    res.status(500).json({error: "Failed fecthing all products"});
  } 
}

// Retrieve all merch for the logged-in user - ✔ gagana na.
async function getUserProduct(req, res) {
  const { profileId } = req.body; // Assuming you have user information in the request

  try {
    const userMerch = await prisma.merch.findMany({
      where: {
        profileId: parseInt(profileId),
      },
    });

    res.json(userMerch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user merch." });
  }
}

// Retrieve a single merch by ID - ✔ gagana na.
async function getProductById(req, res) {
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

// Delete a merch by ID for the logged-in user ✔ gagana na.
async function deleteProduct(req, res) {
  const { userId } = req.body; // Assuming you have user information in the request
  const { id } = req.params;

  try {
    const deletedMerch = await prisma.merch.delete({
      where: {
        id: parseInt(id),
        profileId: userId,
      },
    });

    if (!deletedMerch) {
      return res.status(404).json({ error: "Merch not found or you don't have permission to delete." });
    }

    res.json(deletedMerch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete merch." });
  }
}


// Function to handle buying a merch
async function buyMerch(req, res) {
  const { userId } = req.body; // Assuming you have user information in the request
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

    // Assuming you have an Order model to track orders
    const newOrder = await prisma.order.create({
      data: {
        userId,
        merchId: parseInt(id),
        quantity,
        totalPrice: quantity * merch.merchCost,
      },
    });

    // Decrement the merchandise quantity based on the purchased quantity
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

// Function to confirm an order
// Function to confirm an order
async function confirmOrder(req, res) {
  const { orderID } = req.body; // Assuming orderId is sent in the request body

  try {
    // Find the order by its ID
    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(orderID),
      },
    });

    // If the order doesn't exist, return a "Order not found" error
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    // Update the order status to "Confirmed"
    const confirmedOrder = await prisma.order.update({
      where: {
        id: parseInt(orderID),
      },
      data: {
        status: "Confirmed",
      },
    });

    // Find the associated merchandise for the order
    const merch = await prisma.merch.findUnique({
      where: {
        id: order.merchId, // Assuming the order has a 'merchId' field
      },
    });

    // Decrement the merchandise quantity by the purchased quantity
    await prisma.merch.update({
      where: {
        id: order.merchId,
      },
      data: {
        merchQty: merch.merchQty - order.quantity, // Decrement by the purchased quantity
      },
    });

    // Respond with the updated order confirming it was successfully confirmed
    res.json({ message: "Order confirmed successfully.", order: confirmedOrder });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    res.status(500).json({ error: "Failed to confirm the order." });
  }
}


const ecommerceController = { addProduct, getAllProducts, getUserProduct, getProductById, updateMerch, deleteProduct, buyMerch, confirmOrder };

export default ecommerceController;




