import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Init Supabase client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const LeadForm = () => {
  const [email, setEmail] = useState('');
  const [tipoNegocio, setTipoNegocio] = useState('Restaurante');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      if (!email) throw new Error('El email es requerido');
      
      const { error } = await supabase
        .from('leads')
        .insert([{ email, tipo_negocio: tipoNegocio }]);

      if (error) throw error;

      setMessage({ type: 'success', text: '¡Gracias! Nos pondremos en contacto pronto.' });
      setEmail('');
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setMessage({ type: 'error', text: 'Hubo un error. Por favor intenta de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      {message && (
        <div className={`p-3 rounded-md text-sm font-medium ${message.type === 'success' ? 'bg-primary-container text-on-primary-container' : 'bg-error-container text-on-error-container'}`}>
          {message.text}
        </div>
      )}
      
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-label-large text-on-surface">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="p-3 rounded-md border border-outline bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="tipoNegocio" className="text-label-large text-on-surface">Tipo de Negocio</label>
        <select
          id="tipoNegocio"
          value={tipoNegocio}
          onChange={(e) => setTipoNegocio(e.target.value)}
          className="p-3 rounded-md border border-outline bg-surface text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
        >
          <option value="Restaurante">Restaurante</option>
          <option value="Dark Kitchen">Dark Kitchen</option>
          <option value="Cafetería">Cafetería</option>
          <option value="Bar">Bar</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 bg-primary text-on-primary py-2.5 px-4 rounded-full font-medium shadow-md hover:bg-opacity-90 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Enviando...' : 'Unirse a la lista de espera'}
      </button>
    </form>
  );
};

export default LeadForm;