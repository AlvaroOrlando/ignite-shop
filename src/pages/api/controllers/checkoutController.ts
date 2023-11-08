import { NextApiRequest, NextApiResponse } from "next";
import { createCheckoutSession } from "../repositories/checkoutRepository";

export const createCheckoutSessionController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { priceId } = req.body;

  if (!priceId) {
    return res.status(400).json({
      error: "Price not found",
    });
  }

  try {
    const checkoutSession = await createCheckoutSession(priceId);

    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
