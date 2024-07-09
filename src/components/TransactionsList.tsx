"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit } from "lucide-react";

type TransactionListProps = {
  id: number;
  title: string;
  slug: string;
  price: number;
  type: string;
  image: string;
  description: string;
  featured: boolean;
};

type TransactionsListProps = {
  otherTransactions: TransactionListProps[];
};

export default function TransactionsList({
  otherTransactions,
}: TransactionsListProps) {
  const [transactions, setTransactions] =
    useState<TransactionListProps[]>(otherTransactions);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState<
    number | null
  >(null);
  const [newTransaction, setNewTransaction] = useState<TransactionListProps>({
    id: transactions.length + 1,
    slug: "",
    title: "",
    price: 0,
    type: "entrada",
    image: "",
    description: "",
    featured: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleAddTransaction = () => {
    setTransactions([
      ...transactions,
      {
        ...newTransaction,
        id: transactions.length + 1,
        slug: `new-transaction-${transactions.length + 1}`,
      },
    ]);
    setShowModal(false);
    resetNewTransaction();
  };

  const handleEditTransaction = () => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === currentTransactionId ? newTransaction : transaction
      )
    );
    setShowModal(false);
    resetNewTransaction();
  };

  const handleEditClick = (transaction: TransactionListProps) => {
    setNewTransaction(transaction);
    setCurrentTransactionId(transaction.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetNewTransaction = () => {
    setNewTransaction({
      id: transactions.length + 1,
      slug: "",
      title: "",
      price: 0,
      type: "entrada",
      image: "",
      description: "",
      featured: false,
    });
    setIsEditing(false);
    setCurrentTransactionId(null);
  };

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
          resetNewTransaction();
        }}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Transaction
      </button>

      {showModal && (
        <div className="fixed inset-0 flex z-10 items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl mb-4">
              {isEditing ? "Edit" : "Add New"} Transaction
            </h2>
            <input
              type="text"
              name="title"
              value={newTransaction.title}
              onChange={handleInputChange}
              placeholder="Descrição"
              className="mb-2 p-2 border rounded w-full text-black"
            />
            <input
              name="price"
              value={newTransaction.price}
              onChange={handleInputChange}
              placeholder="Valor"
              className="mb-2 p-2 border rounded w-full text-black"
            />
            <select
              name="type"
              value={newTransaction.type}
              onChange={handleInputChange}
              className="mb-2 p-2 border rounded w-full text-black"
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
            <button
              onClick={isEditing ? handleEditTransaction : handleAddTransaction}
              className="mb-2 p-2 bg-blue-500 text-white rounded w-full"
            >
              {isEditing ? "Save Changes" : "Add"}
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 bg-red-500 text-white rounded w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {transactions?.map((transaction) => (
          <div
            key={transaction.id}
            className="gap-2 rounded-lg bg-zinc-200 p-2"
          >
            <Link
              href={`/transaction/${transaction.slug}`}
              className="relative rounded-lg bg-zinc-900 overflow-hidden justify-center"
            >
              <div className="gap-2 grid justify-center items-center relative h-12 max-w-[300px] ">
                <span className="text-sm text-black">{transaction.title}</span>
                <span
                  className={`h-full px-4 font-semibold ${
                    transaction.type === "entrada"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </Link>
            <button
              onClick={() => handleEditClick(transaction)}
              className="mt-2 p-2 bg-yellow-500 text-white rounded flex items-center justify-center"
            >
              <Edit size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
