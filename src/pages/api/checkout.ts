import { createCheckoutSessionController } from "../api/controllers/checkoutController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return createCheckoutSessionController(req, res);
}
