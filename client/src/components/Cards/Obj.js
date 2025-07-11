import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { api } from '../../services/api/api';

export default function MonthlyGoalsCard() {
  const [monthlySales, setMonthlySales] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      try {
        const response = await api.get('/objetivo');
        const rawValue = response.data.valor;

        const cleanedValue = typeof rawValue === 'string'
          ? rawValue.replace(/[^\d.-]/g, '')
          : rawValue;

        const numericValue = parseFloat(cleanedValue);

        if (isNaN(numericValue)) {
          throw new Error('Valor inválido recebido da API.');
        }

        const valorFormatado = numericValue.toLocaleString('pt-PT', {
          style: 'currency',
          currency: 'EUR',
        });

        setMonthlySales(valorFormatado);
      } catch (error) {
        toast.current.show({
          severity: 'error',
          summary: 'Erro ao buscar por meta mensal',
          detail: error.response?.data?.message || error.message,
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <Card
        title="Meta Mensal"
        className="mb-4"
        style={{
          borderRadius: 12,
          boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)',
          textAlign: 'center',
          padding: '2rem 1rem',
          maxWidth: 320,
          margin: 'auto',
        }}
      >
        {loading ? (
          <div
            aria-label="A carregar meta mensal"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
            }}
          >
            <i className="pi pi-spin pi-bullseye" style={{ fontSize: '3rem', color: '#6366F1' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <i
              className="pi pi-arrow-up-right"
              style={{
                fontSize: '3rem',
                color: '#6366F1',
                animation: 'pulse 2s infinite',
              }}
            />
            <p
              style={{
                fontSize: '3.5rem',
                fontWeight: '700',
                color: '#4F46E5',
                margin: 0,
              }}
            >
              {monthlySales !== null ? monthlySales : '—'}
            </p>
            <p
              style={{
                fontSize: '1rem',
                color: '#6B7280',
                marginTop: '-0.2rem',
                fontWeight: 500,
              }}
            >
              Meta para {new Date().toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        )}
      </Card>
    </>
  );
}
