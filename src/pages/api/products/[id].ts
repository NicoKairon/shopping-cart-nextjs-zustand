import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

  if (!PRINTFUL_API_KEY) {
    return res.status(500).json({ error: "Missing Printful API Key" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" }); // Ensure only GET is allowed
  }

  const { id } = req.query;

  try {
    const response = await axios.get(`https://api.printful.com/store/products/${id}`, {
      headers: {
        Authorization: `Bearer ${PRINTFUL_API_KEY}`,
      },
    });

    res.status(200).json(response.data); // Respond with the data structure as-is
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching product:", error.message);
      res
        .status(error.response?.status || 500)
        .json(error.response?.data || { error: "Internal Server Error" });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
