import Link from "next/link";
import { Logo } from "@/components/logo";

export const Navbar = () => {
  return (
    <nav className="bg-[#1e1e1e] border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              <Logo />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 