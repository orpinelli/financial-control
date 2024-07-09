import { api } from "@/data/api";
import { Transaction } from "@/data/types/transaction";
import Image from "next/image";

interface TransactionProps {
  params: {
    slug: string;
  };
}

const ONE_HOUR_FOR_REVALIDATION = 60 * 60;

async function getTransaction(slug: string): Promise<Transaction> {
  const response = await api(`/transaction/${slug}`, {
    next: {
      revalidate: ONE_HOUR_FOR_REVALIDATION,
    },
  });
  const transactions = await response.json();

  return transactions;
}

export async function generateMetadata({ params }: TransactionProps) {
  const transaction = await getTransaction(params.slug);
  return {
    title: transaction.title,
  };
}

export async function generateStaticParams() {
  const response = await api("/transaction/featured", {});
  const transaction: Transaction[] = await response.json();

  return transaction.map((transaction) => {
    return { slug: transaction.slug };
  });
}

export default async function ProductPage({ params }: TransactionProps) {
  const INSTALLMENT_AMOUT = 12;
  const transaction = await getTransaction(params.slug);

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={transaction.image}
          alt=""
          width={1200}
          height={1200}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12 ">
        <h1 className="text-3x1 font-bold leading-tight">
          {transaction.title}
        </h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {transaction.description}
        </p>
        <div className="mt-8 flex items-center gap-3 ">
          <span className="inline-block rounded-full bg-amber-400 font-semibold px-5 py-2.5">
            {transaction.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em ate 12x s/juros de{" "}
            {(transaction.price / INSTALLMENT_AMOUT).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanho</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              2kg
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              5kg
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              15kg
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              20kg
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
