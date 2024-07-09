import Link from "next/link";
import { api } from "@/data/api";
import { Transaction } from "@/data/types/transaction";
import type { Metadata } from "next";
import TransactionsList from "@/components/TransactionsList";

async function getFeaturedtransactions(): Promise<Transaction[]> {
  const response = await api("/transaction/featured", {
    cache: "no-cache",
  });
  const transaction = await response.json();

  return transaction;
}

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const [...otherTransaction] = await getFeaturedtransactions();

  return (
    <div className="">
      <TransactionsList otherTransactions={otherTransaction} />
    </div>
  );
}
