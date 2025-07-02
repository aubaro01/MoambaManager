import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import {api} from '../../services/api';

export default function VendasCard() {
  const [vendas, setVendas] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendas = async () => {
      setLoading(true);

      const token = localStorage.getItem('jwt_token');

      if (!token) {
        toast.current.show({
          severity: 'warn',
          summary: 'Não autenticado',
          detail: 'Faça login para acessar os dados',
          life: 3000
        });
        navigate('/');
        return;
      }

      try {
        const response = await api.get('/allProducts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVendas(response.data.totalVendas);

      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('jwt_token');
          toast.current.show({
            severity: 'error',
            summary: 'Sessão expirada',
            detail: 'Por favor, faça login novamente.',
            life: 4000
          });
          navigate('/');
        } else {
          toast.current.show({
            severity: 'error',
            summary: 'Erro ao buscar vendas',
            detail: error.message || 'Erro desconhecido',
            life: 4000
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVendas();
  }, [navigate]);

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <Card title="Total de vendas">
          {loading ? (
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
          ) : (
            <p className="m-0" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {vendas !== null ? vendas : 'Sem dados'}
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
