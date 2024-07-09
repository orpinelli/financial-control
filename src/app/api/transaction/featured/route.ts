import data from "../data.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const featureTransaction = data.transaction.filter((transaction) => transaction.featured);
  return Response.json(featureTransaction);
}
