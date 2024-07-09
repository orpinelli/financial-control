// pages/api/transactions/create.ts
import { NextApiRequest, NextApiResponse } from "next";
import xata from "../../xata";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, amount, type, date } = req.body;

    try {
      const newTransaction = await xata.db.transactions.create({
        name,
        amount,
        type,
        date,
      });

      // Atualizar o valor total
      const total = await xata.db.total.read("total");
      const newValue =
        type === "income" ? total.value + amount : total.value - amount;
      await xata.db.total.update("total", { value: newValue });

      res.status(200).json(newTransaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
