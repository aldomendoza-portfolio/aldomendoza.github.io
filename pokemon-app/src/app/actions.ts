"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addCardToInventory(cardId: string) {
  const existing = await prisma.inventoryCard.findUnique({
    where: { cardId }
  });

  if (existing) {
    await prisma.inventoryCard.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 }
    });
  } else {
    await prisma.inventoryCard.create({
      data: { cardId, quantity: 1 }
    });
  }
  
  revalidatePath('/inventory');
  return { success: true };
}

export async function removeCardFromInventory(cardId: string) {
  const existing = await prisma.inventoryCard.findUnique({
    where: { cardId }
  });
  
  if (existing) {
    if (existing.quantity > 1) {
      await prisma.inventoryCard.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity - 1 }
      });
    } else {
      await prisma.inventoryCard.delete({
        where: { id: existing.id }
      });
    }
  }
  revalidatePath('/inventory');
  return { success: true };
}

export async function getInventory() {
  return await prisma.inventoryCard.findMany({
    orderBy: { addedAt: 'desc' }
  });
}
