import React from 'react';
import { ShoppingCart, Store, Home, CreditCard } from 'lucide-react';

function NavButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:ring-offset-2 ${
        active ? 'bg-amber-500 text-white' : 'bg-white/70 text-slate-800 hover:bg-white'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

export default function Navbar({ currentPage, setPage, cartCount }) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur bg-white/70 border-b border-slate-200/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1533152162573-93ad94eb20f6?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDdXl8ZW58MHwwfHx8MTc2MjM0MTYxNnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Cuy" className="h-9 w-9 rounded-full object-cover" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900">CuyMarket</span>
        </div>
        <nav className="flex items-center gap-2">
          <NavButton icon={Home} label="Inicio" active={currentPage === 'home'} onClick={() => setPage('home')} />
          <NavButton icon={Store} label="Tienda" active={currentPage === 'shop'} onClick={() => setPage('shop')} />
          <NavButton icon={CreditCard} label="Pago" active={currentPage === 'checkout'} onClick={() => setPage('checkout')} />
          <button
            onClick={() => setPage('checkout')}
            className="relative inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:ring-offset-2"
          >
            <ShoppingCart size={18} />
            Carrito
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
