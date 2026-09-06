const API_URL = "https://api.pokemontcg.io/v2";

export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes?: string[];
  images: {
    small: string;
    large: string;
  };
  cardmarket?: {
    prices: {
      averageSellPrice: number;
    }
  };
  tcgplayer?: {
    prices?: {
      normal?: { market: number };
      holofoil?: { market: number };
      reverseHolofoil?: { market: number };
    }
  }
}

export async function searchCards(query: string, page: number = 1): Promise<{ data: PokemonCard[], totalCount: number }> {
  // Búsqueda simple por nombre, si query está vacío trae los primeros
  const q = query ? `q=name:"*${query}*"` : "";
  const res = await fetch(`${API_URL}/cards?${q}&page=${page}&pageSize=20`, {
    // Si tuvieras API Key la pasarías aquí:
    // headers: { "X-Api-Key": process.env.POKEMON_TCG_API_KEY || "" }
  });
  
  if (!res.ok) throw new Error("Error al obtener las cartas");
  
  const data = await res.json();
  return {
    data: data.data,
    totalCount: data.totalCount
  };
}

export async function getCardById(id: string): Promise<PokemonCard> {
  const res = await fetch(`${API_URL}/cards/${id}`);
  if (!res.ok) throw new Error("Error al obtener la carta");
  const data = await res.json();
  return data.data;
}
