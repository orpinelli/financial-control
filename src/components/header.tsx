import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center justify-between z-40">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2x1 font-extrabold text-white">
          Coffee Next
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-px h-4 bg-zinc-700" />
        <Link href="/" className="flex items-center gap-2 hover:underline">
          <span className="text-sm">Account</span>
          <Image
            src="https://github.com/orpinelli.png"
            className="h-6 w-6 rounded-full"
            width={24}
            height={24}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}
