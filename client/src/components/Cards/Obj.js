import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { api } from '../../services/api';

export default function MonthlyGoalsCard() {
  const [monthlySalesGoal, setMonthlySalesGoal] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      try {
        const response = await api.get('/obj?mes=?'); // Ajuste o endpoint conforme necessário
        setMonthlySalesGoal(response.data.monthlySalesGoal);
      } catch (error) {
        toast.current.show({
          severity: 'error',
          summary: 'Erro ao buscar metas mensais',
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
        title="Meta mensal de Vendas"
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
            aria-label="Carregando metas mensais"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}
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
              {monthlySalesGoal !== null ? monthlySalesGoal : '—'}
            </p>
            <p style={{ fontSize: '1rem', color: '#6B7280', marginTop: '-0.2rem', fontWeight: 500 }}>
            </p>
          </div>
        )}
      </Card>
    </>
  );
}
