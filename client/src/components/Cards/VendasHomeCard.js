import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { api } from '../../services/api/api';

export default function VendasCard() {
  const [totalVendas, setTotalVendas] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const fetchVendas = async () => {
      setLoading(true);
      try {
        const response = await api.get('/allsells');
        setTotalVendas(response.data.totalSells);
      } catch (error) {
        toast.current.show({
          severity: 'error',
          summary: 'Erro ao buscar vendas',
          detail: error.response?.data?.message || error.message,
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVendas();
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <Card
        title="Total de Vendas"
        className="mb-4"
        style={{
          borderRadius: 12,
          boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)',
          textAlign: 'center',
          padding: '2rem 1rem',
          maxWidth: 320,
          margin: 'auto',
        }}
      >
        {loading ? (
          <div
            aria-label="Carregando vendas"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}
          >
            <i className="pi pi-spin pi-dollar" style={{ fontSize: '3rem', color: '#10B981' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <i
              className="pi pi-shopping-cart"
              style={{
                fontSize: '3rem',
                color: '#10B981',
              }}
            />
            <p
              style={{
                fontSize: '3.5rem',
                fontWeight: '700',
                color: '#059669',
                margin: 0,
              }}
            >
              {totalVendas !== null ? totalVendas : '—'}
            </p>
            <p style={{ fontSize: '1rem', color: '#4B5563', marginTop: '-0.2rem', fontWeight: 500 }}>
            </p>
          </div>
        )}
      </Card>
    </>
  );
}
