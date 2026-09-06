"use client";

import { useState, useTransition } from "react";
import { addCardToInventory } from "@/app/actions";

export default function AddButton({ cardId }: { cardId: string }) {
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    startTransition(async () => {
      await addCardToInventory(cardId);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    });
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isPending || added}
      className={`w-full py-2 rounded font-medium text-sm transition ${
        added 
          ? "bg-green-600 hover:bg-green-700" 
          : "bg-slate-700 hover:bg-slate-600"
      }`}
    >
      {isPending ? "Añadiendo..." : added ? "¡Añadida!" : "Añadir a Colección"}
    </button>
  );
}
