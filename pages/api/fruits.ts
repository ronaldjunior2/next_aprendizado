// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  name: string;
};

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      await prisma.fruits.create({ data });
      res.status(200).json({ name: "OK" });
    } catch (e) {
      res.status(200).json({ name: "OK" });
    }
  }
}
