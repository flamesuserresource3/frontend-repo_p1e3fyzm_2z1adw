import React from 'react';
import { Star } from 'lucide-react';

export default function Hero({ onShop }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-white to-white pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-700 text-xs font-semibold">
              <Star size={14} /> Calidad Premium
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Los mejores cuys para tu familia o negocio
            </h1>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Criados con amor y bajo estándares de bienestar. Compra en línea y recibe en la puerta de tu casa con garantía de salud.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={onShop} className="rounded-full bg-amber-500 px-6 py-3 text-white font-semibold shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:ring-offset-2">
                Ver Tienda
              </button>
              <a href="#beneficios" className="rounded-full border border-slate-300 px-6 py-3 text-slate-700 font-semibold hover:bg-slate-50">
                ¿Por qué elegirnos?
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517844963-dbc50c5b6d83?q=80&w=1200&auto=format&fit=crop"
              alt="Guinea pig hero"
              className="w-full h-[380px] md:h-[460px] rounded-2xl object-cover shadow-xl"
            />
            <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 backdrop-blur px-4 py-3 shadow text-sm text-slate-700">
              Envíos a nivel nacional y soporte 24/7
            </div>
          </div>
        </div>
        <div id="beneficios" className="mt-16 grid sm:grid-cols-3 gap-4">
          {[{
            title: 'Salud Certificada', desc: 'Veterinario interno, vacunas y control sanitario.'
          },{
            title: 'Entrega Rápida', desc: 'Logística especializada en transporte de animales.'
          },{
            title: 'Pago Seguro', desc: 'Procesamos tus pagos con los más altos estándares.'
          }].map((b) => (
            <div key={b.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">{b.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
