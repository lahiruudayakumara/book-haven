"use client";

import { Gift, Menu, Search, ShoppingBag, Truck, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { ScreenContainer } from "./screen-container";
import ThemeToggle from "./thems/them-toggle";
import { categories } from "@/data/category";
import { menuItems } from "@/data/menu";
import { useCart } from "@/context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const { state } = useCart();

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = () => {
    if (search.trim() !== "") {
      router.push(`/search?category=${encodeURIComponent(selectedCategory)}&keyword=${encodeURIComponent(search)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={`shadow-md flex flex-col items-center justify-center bg-white dark:bg-gray-800`}
    >
      <div className="w-full  divide-y-2">
        <ScreenContainer>
          <div className="flex justify-between p-2 md:p-0 dark:text-white">
            <p>Telephone:- +94 (123) 456-7891</p>
            <p className="text-primary">White List</p>
          </div>
        </ScreenContainer>
        <ScreenContainer>
          <div className="w-full md:flex justify-between p-4 py-4 items-center">
            <Image
              src="/logo.png"
              width={250}
              height={100}
              alt="logo"
              className="mx-auto md:mx-0"
            />
            <div className="flex md:w-[40%] bg-primary text-white p-[2px] rounded-lg">
              <div>
                <select
                  name="cars"
                  id="cars"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-14 sm:w-24 md:w-40 h-full bg-primary outline-none rounded-l-md text-center flex items-center justify-between cursor-pointer"
                >
                  {categories.map((item) => (
                    <option
                      key={item.id}
                      value={item.name}
                      className="bg-white text-black w-full"
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 outline-none py-2 px-3 text-black"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                onKeyDown={handleKeyDown}
              />
              <button
                disabled
                onClick={handleSearch}
                className={`bg-white rounded-r-md text-slate-700 px-2 ${
                  search === "" ? "" : "hover:text-primary"
                }`}
              >
                <Search />
              </button>
            </div>
            <div className="flex justify-between items-center gap-8 pt-4 md:pt-0">
              <div
                onClick={() => setActiveMenu(!activeMenu)}
                className="flex gap-2 md:hidden dark:text-primary"
              >
                {activeMenu ? <X size={28} /> : <Menu size={28} />}
              </div>
              <Link href="/delivery">
                <div className="flex gap-2 dark:text-primary">
                  <Truck size={28} />
                  <span className="hidden md:block">Delivery</span>
                  <div className="absolute text-white text-sm -mt-2 ml-3 bg-red-500 rounded-full w-6 h-6 text-center">
                    11
                  </div>
                </div>
              </Link>
              <Link href="offers">
                <div className="flex gap-2 dark:text-primary">
                  <Gift size={28} />
                  <span className="hidden md:block">Offers</span>
                  <div className="absolute text-white text-sm -mt-2 ml-3 bg-red-500 rounded-full w-6 h-6 text-center">
                    11
                  </div>
                </div>
              </Link>
              <Link href="/cart">
                <div className="flex gap-2 dark:text-primary">
                  <ShoppingBag size={28} />
                  <div className="hidden md:block">My Cart</div>
                  <div
                    className={`absolute text-white text-sm -mt-2 ml-3 bg-red-500 rounded-full w-6 h-6 text-center ${
                      state.items.length === 0 ? "hidden" : ""
                    }`}
                  >
                    {state.items.length}
                  </div>
                </div>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </ScreenContainer>
        <ScreenContainer>
          <div
            className={`${
              activeMenu ? "block duration-300 transition-all" : "hidden"
            } gap-4 md:gap-0 md:flex md:justify-between sticky`}
          >
            <div className="px-4 md:w-[250px] p-2 md:bg-primary dark:text-white md:text-center">
              ALL Categories
            </div>
            <ul className="md:flex space-y-2 md:text-center text-left mb-4 md:mb-0 md:space-y-0 w-full px-4 items-center justify-between dark:text-white">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(false);
                  }}
                  href={item.link}
                >
                  <li className="hover:text-primary mb-2 md:mb-0">{item.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </ScreenContainer>
        <div></div>
      </div>
    </div>
  );
}
