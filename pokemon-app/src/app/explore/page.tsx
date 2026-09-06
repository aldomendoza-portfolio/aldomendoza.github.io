"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { searchCards, PokemonCard } from "@/lib/pokemonApi";
import AddButton from "./AddButton";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await searchCards(query);
      setCards(result.data);
    } catch (error) {
      console.error("Failed to search", error);
      alert("Hubo un error al buscar las cartas.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return "N/A";
    return `$${price.toFixed(2)} USD`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Buscador de Cartas</h1>
          <Link href="/" className="text-blue-400 hover:underline">Volver al inicio</Link>
        </div>

        <form onSubmit={handleSearch} className="flex gap-4 mb-12">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre (ej. Pikachu, Charizard...)"
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {cards.map((card) => {
            const marketPrice = card.tcgplayer?.prices?.normal?.market 
                              || card.tcgplayer?.prices?.holofoil?.market
                              || card.cardmarket?.prices?.averageSellPrice;

            return (
              <div key={card.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col">
                <img src={card.images.small} alt={card.name} className="w-full h-auto object-contain p-2" />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-lg mb-1">{card.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{card.supertype}</p>
                  
                  <div className="mt-auto">
                    <div className="text-green-400 font-bold text-xl mb-3">
                      {formatPrice(marketPrice)}
                    </div>
                    <AddButton cardId={card.id} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!loading && cards.length === 0 && query && (
          <div className="text-center text-slate-500 mt-12">
            No se encontraron resultados para "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
