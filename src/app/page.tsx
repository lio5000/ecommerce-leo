"use client";

import { useState } from "react";
import GameCard from "@/components/games/GameCard";
import { games } from "@/data/games";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = [
    "Todos",
    ...Array.from(new Set(games.map((g) => g.category))),
  ];

  const filteredGames =
    selectedCategory === "Todos"
      ? games
      : games.filter((g) => g.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 border-b border-gray-800 pb-4">
          Catalogo de Juegos
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </main>
  );
}
