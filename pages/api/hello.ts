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
  if (req.method === "GET") {
    const result = await prisma.resource.findMany();
    const formatedResult = JSON.parse(JSON.stringify(result));
    res.status(200).json(formatedResult);
  }
}
