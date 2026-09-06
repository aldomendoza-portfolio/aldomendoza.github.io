"use client";

import { useTransition } from "react";
import { removeCardFromInventory } from "@/app/actions";

export default function RemoveButton({ cardId }: { cardId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      await removeCardFromInventory(cardId);
    });
  };

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-medium text-sm transition disabled:opacity-50"
    >
      {isPending ? "Quitando..." : "Quitar una copia"}
    </button>
  );
}
