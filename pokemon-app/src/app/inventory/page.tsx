import Link from "next/link";
import { getInventory } from "@/app/actions";
import { getCardById } from "@/lib/pokemonApi";
import RemoveButton from "./RemoveButton";

export default async function InventoryPage() {
  const inventoryRecords = await getInventory();
  
  // Obtenemos los detalles de la API para cada carta que tenemos en DB
  const inventoryCards = await Promise.all(
    inventoryRecords.map(async (record) => {
      try {
        const details = await getCardById(record.cardId);
        return { ...record, details };
      } catch (e) {
        return { ...record, details: null };
      }
    })
  );

  const formatPrice = (price?: number) => {
    if (!price) return "N/A";
    return `$${price.toFixed(2)}`;
  };

  const totalValue = inventoryCards.reduce((total, card) => {
    if (!card.details) return total;
    const marketPrice = card.details.tcgplayer?.prices?.normal?.market 
                      || card.details.tcgplayer?.prices?.holofoil?.market
                      || card.details.cardmarket?.prices?.averageSellPrice || 0;
    return total + (marketPrice * card.quantity);
  }, 0);

  const totalCards = inventoryCards.reduce((total, card) => total + card.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Mi Colección</h1>
          <Link href="/" className="text-blue-400 hover:underline">Volver al inicio</Link>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8 flex gap-8">
          <div>
            <p className="text-slate-400 text-sm">Total de cartas</p>
            <p className="text-3xl font-bold">{totalCards}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Valor estimado de la colección</p>
            <p className="text-3xl font-bold text-green-400">${totalValue.toFixed(2)} USD</p>
          </div>
        </div>

        {inventoryCards.length === 0 ? (
          <div className="text-center text-slate-500 mt-12">
            Tu colección está vacía. <Link href="/explore" className="text-blue-400 hover:underline">¡Busca algunas cartas!</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {inventoryCards.map((item) => {
              const card = item.details;
              if (!card) return null;

              const marketPrice = card.tcgplayer?.prices?.normal?.market 
                                || card.tcgplayer?.prices?.holofoil?.market
                                || card.cardmarket?.prices?.averageSellPrice;

              return (
                <div key={item.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col relative">
                  <div className="absolute top-2 right-2 bg-blue-600 text-white font-bold px-3 py-1 rounded-full text-sm z-10 shadow-lg border border-blue-400">
                    x{item.quantity}
                  </div>
                  <img src={card.images.small} alt={card.name} className="w-full h-auto object-contain p-2" />
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-lg mb-1">{card.name}</h3>
                    <div className="mt-auto">
                      <div className="text-green-400 font-bold mb-3">
                        {formatPrice(marketPrice)} c/u
                      </div>
                      <RemoveButton cardId={item.cardId} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
