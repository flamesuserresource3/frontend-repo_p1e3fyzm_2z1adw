import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Checkout from './components/Checkout';

const PRODUCTS = [
  {
    id: 'cuy-premium-1',
    name: 'Cuy Andino Premium',
    price: 39.99,
    rating: 4.9,
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1745169921154-235bd8c4e6b8?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjIzNDE2MTd8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    description: 'Genética seleccionada, ideal para crianza y reproducción. Certificado sanitario incluido.'
  },
  {
    id: 'cuy-bebes-2',
    name: 'Cuy Bebé (6-8 semanas)',
    price: 24.5,
    rating: 4.8,
    category: 'Juvenil',
    image: 'https://images.unsplash.com/photo-1571928276243-36b05c0cb83f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDdXklMjBCZWIlQzMlQTklMjAlMjg2LTglMjBzZW1hbmFzJTI5fGVufDB8MHx8fDE3NjIzNDE2MTh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    description: 'Pequeños y adorables, listos para integrarse a tu hogar con guía de cuidado.'
  },
  {
    id: 'cuy-reproductor-3',
    name: 'Reproductor Élite',
    price: 59.0,
    rating: 5.0,
    category: 'Élite',
    image: 'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?q=80&w=1200&auto=format&fit=crop',
    description: 'Excelente línea genética, alto rendimiento y comportamiento dócil.'
  },
  {
    id: 'kit-inicio-4',
    name: 'Kit de Inicio + Cuy',
    price: 79.0,
    rating: 4.7,
    category: 'Kit',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=1200&auto=format&fit=crop',
    description: 'Incluye jaula básica, bebedero, comedero y un cuy juvenil saludable.'
  },
  {
    id: 'cuy-gigante-5',
    name: 'Cuy Gigante',
    price: 72.0,
    rating: 4.6,
    category: 'Especial',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1200&auto=format&fit=crop',
    description: 'Variedad de gran tamaño, ideal para proyectos gastronómicos.'
  },
  {
    id: 'cuy-arlequin-6',
    name: 'Cuy Arlequín',
    price: 45.0,
    rating: 4.5,
    category: 'Color',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop',
    description: 'Pelaje tricolor llamativo y temperamento amigable para familias.'
  },
];

export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);

  // Hash-based navigation without external deps
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'shop', 'checkout'].includes(hash)) setPage(hash);
    };
    applyHash();
    const onHash = () => applyHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const setPageWithHash = (p) => {
    window.location.hash = p;
    setPage(p);
  };

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id, qty) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 to-white text-slate-900">
      <Navbar currentPage={page} setPage={setPageWithHash} cartCount={cartCount} />

      {page === 'home' && (
        <>
          <Hero onShop={() => setPageWithHash('shop')} />
          <ProductGrid products={PRODUCTS.slice(0, 3)} onAdd={addToCart} title="Destacados" />
        </>
      )}

      {page === 'shop' && (
        <ProductGrid products={PRODUCTS} onAdd={addToCart} title="Todos los productos" />
      )}

      {page === 'checkout' && (
        <Checkout cart={cart} onRemove={removeFromCart} onUpdateQty={updateQty} onPaid={() => { clearCart(); setPageWithHash('home'); }} />
      )}

      <footer className="mt-16 border-t border-slate-200 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} CuyMarket — Todos los derechos reservados</p>
          <div className="flex items-center gap-4">
            <a href="#home" onClick={(e) => { e.preventDefault(); setPageWithHash('home'); }} className="hover:text-slate-900">Inicio</a>
            <a href="#shop" onClick={(e) => { e.preventDefault(); setPageWithHash('shop'); }} className="hover:text-slate-900">Tienda</a>
            <a href="#checkout" onClick={(e) => { e.preventDefault(); setPageWithHash('checkout'); }} className="hover:text-slate-900">Pago</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
