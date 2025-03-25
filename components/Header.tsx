import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = (): React.ReactElement => {
  return (
    <header className="w-full bg-white">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="PUCAR Logo"
              width={30}
              height={30}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex h-8 items-center rounded-md  px-2 text-xs font-medium text-gray-700">
            <span>EN</span>
          </button>
          <button className="flex h-8 items-center rounded-md  px-2 text-xs font-medium text-gray-700">
            <span>Support</span>
          </button>
          <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 text-white">
            <span className="text-xs font-medium">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};
