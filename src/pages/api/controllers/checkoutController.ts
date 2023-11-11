import { NextApiRequest, NextApiResponse } from "next";
import { createCheckoutSession } from "../repositories/checkoutRepository";

export const createCheckoutSessionController = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({
      error: "Invalid cart items",
    });
  }

  try {
    const checkoutSession = await createCheckoutSession(cartItems);

    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

