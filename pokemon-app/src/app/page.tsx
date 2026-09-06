import Link from 'next/link';
import { Search, Library, PlusCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <main className="max-w-4xl mx-auto mt-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400 mb-4">
            Pokémon TCG Manager
          </h1>
          <p className="text-xl text-slate-400">
            Gestiona tu inventario, verifica precios de mercado y construye tus mazos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/explore" className="group">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:bg-slate-700 transition flex flex-col items-center text-center h-full">
              <Search className="w-16 h-16 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold mb-2">Buscador</h2>
              <p className="text-slate-400">Busca cartas en la base de datos mundial y revisa sus precios de mercado.</p>
            </div>
          </Link>

          <Link href="/inventory" className="group">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:bg-slate-700 transition flex flex-col items-center text-center h-full">
              <Library className="w-16 h-16 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold mb-2">Mi Colección</h2>
              <p className="text-slate-400">Administra las cartas que posees físicamente y lleva un control de tu inventario.</p>
            </div>
          </Link>

          <Link href="/decks" className="group">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:bg-slate-700 transition flex flex-col items-center text-center h-full">
              <PlusCircle className="w-16 h-16 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold mb-2">Constructor de Mazos</h2>
              <p className="text-slate-400">Crea nuevos mazos para jugar validando las reglas de 60 cartas.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
