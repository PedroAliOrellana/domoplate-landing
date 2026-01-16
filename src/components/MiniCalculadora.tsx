import React, { useState, useEffect } from 'react';

const MiniCalculadora = () => {
  const [ordersPerDay, setOrdersPerDay] = useState(20);
  const [avgTicket, setAvgTicket] = useState(15);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [potentialSavings, setPotentialSavings] = useState(0);

  useEffect(() => {
    // Basic math: 30 days. Assume Domoplate saves 10% in efficiency/waste.
    const monthly = ordersPerDay * avgTicket * 30;
    setMonthlyRevenue(monthly);
    setPotentialSavings(monthly * 0.10); // 10% efficiency gain
  }, [ordersPerDay, avgTicket]);

  return (
    <div className="bg-surface-variant text-on-surface-variant rounded-[16px] p-6 shadow-md w-full max-w-md mx-auto">
      <h3 className="text-headline-small font-bold mb-4 text-primary">Calculadora de Impacto</h3>
      <p className="text-body-medium mb-6">Descubre cuánto podrías ahorrar optimizando tu operación.</p>

      <div className="space-y-4">
        <label className="block">
          <span className="text-label-large block mb-1">Pedidos por día</span>
          <input
            type="range"
            min="10"
            max="500"
            value={ordersPerDay}
            onChange={(e) => setOrdersPerDay(Number(e.target.value))}
            className="w-full accent-primary h-2 bg-surface rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-right text-title-medium font-bold text-primary">{ordersPerDay}</div>
        </label>

        <label className="block">
          <span className="text-label-large block mb-1">Ticket Promedio ($)</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={avgTicket}
              onChange={(e) => setAvgTicket(Number(e.target.value))}
              className="w-full p-2 rounded-md bg-surface text-on-surface border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        </label>
      </div>

      <div className="mt-8 pt-4 border-t border-outline/20 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-body-large">Ingresos Mensuales Est.</span>
          <span className="text-title-medium font-bold">${monthlyRevenue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-primary">
          <span className="text-body-large font-bold">Ahorro Potencial (10%)</span>
          <span className="text-headline-medium font-bold">${potentialSavings.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default MiniCalculadora;