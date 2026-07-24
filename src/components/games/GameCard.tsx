"use client";
import Image from "next/image";
import { Game, CartItem } from "@/types";
import Swal from "sweetalert2";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const handleAddToCart = () => {
    const storedCart = localStorage.getItem("cart");
    let cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const existingIndex = cart.findIndex((item) => item.game.id === game.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ game, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));

    Swal.fire({
      title: "Agregado",
      text: `${game.title} se añadió al carrito`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      background: "#1f2937",
      color: "#ffffff",
    });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md hover:border-indigo-500 transition-colors flex flex-col">
      <div className="relative w-full h-48 bg-gray-700">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            {game.category}
          </span>
          <h3 className="text-lg font-bold text-white mt-1">{game.title}</h3>
          <p className="text-sm text-gray-400 mt-2 line-clamp-2">
            {game.description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-white">
            ${game.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
