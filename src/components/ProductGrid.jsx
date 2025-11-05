import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
        <div className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-slate-700 shadow">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 leading-tight">{product.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={16} fill="#F59E0B" className="text-amber-500" />
            <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
          </div>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-extrabold text-slate-900">${product.price.toFixed(2)}</div>
          <button
            onClick={() => onAdd(product)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:ring-offset-2"
          >
            <ShoppingCart size={18} /> Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ products, onAdd, title }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {title && <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">{title}</h2>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
