import React, { useMemo } from 'react';
import { Trash2, CreditCard } from 'lucide-react';

export default function Checkout({ cart, onRemove, onUpdateQty, onPaid }) {
  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = cart.length > 0 ? 7.5 : 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [cart]);

  const handlePay = (e) => {
    e.preventDefault();
    // Demo payment simulation
    setTimeout(() => {
      alert('Pago procesado con éxito. ¡Gracias por tu compra!');
      onPaid();
    }, 400);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">Finalizar compra</h2>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Carrito</h3>
            {cart.length === 0 ? (
              <p className="text-slate-600">Tu carrito está vacío.</p>
            ) : (
              <ul className="divide-y divide-slate-200">
                {cart.map((item) => (
                  <li key={item.id} className="py-4 flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <button onClick={() => onRemove(item.id)} className="text-slate-500 hover:text-red-600">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-sm text-slate-600">${item.price.toFixed(2)}</p>
                      <div className="mt-2 inline-flex items-center gap-2">
                        <label className="text-sm text-slate-600">Cantidad</label>
                        <input
                          type="number"
                          min={1}
                          value={item.qty}
                          onChange={(e) => onUpdateQty(item.id, parseInt(e.target.value || '1', 10))}
                          className="w-20 rounded-md border border-slate-300 px-2 py-1 text-sm"
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={handlePay} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-900">Datos de envío y pago</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nombre completo</label>
                <input required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Ej: Ana Pérez" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Correo electrónico</label>
                <input type="email" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" placeholder="ana@email.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Dirección</label>
                <input required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Calle 123, Ciudad" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Ciudad</label>
                <input required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Código Postal</label>
                <input required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
              </div>
              <div className="sm:col-span-2 grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Número de tarjeta</label>
                  <input inputMode="numeric" pattern="[0-9 ]*" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" placeholder="1234 5678 9012 3456" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Expira</label>
                  <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" placeholder="MM/AA" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">CVC</label>
                  <input className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" placeholder="123" />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={cart.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-white shadow hover:bg-amber-600 disabled:opacity-60"
            >
              <CreditCard size={18} /> Pagar ahora
            </button>
            <p className="text-xs text-slate-500">Demostración: esta interfaz simula un pago. Para producción integraríamos una pasarela como Stripe o Culqi.</p>
          </form>
        </div>

        <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm h-fit">
          <h3 className="font-semibold text-slate-900 mb-4">Resumen</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-slate-600">Subtotal</dt><dd className="font-semibold">${totals.subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-600">Envío</dt><dd className="font-semibold">${totals.shipping.toFixed(2)}</dd></div>
            <div className="h-px bg-slate-200 my-2" />
            <div className="flex justify-between text-base"><dt className="text-slate-900 font-semibold">Total</dt><dd className="font-extrabold">${totals.total.toFixed(2)}</dd></div>
          </dl>
          <p className="mt-3 text-xs text-slate-500">Precios en USD, impuestos incluidos.</p>
        </aside>
      </div>
    </section>
  );
}
