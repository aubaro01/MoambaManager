import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import {api} from '../../services/api';

export default function ProdutosCard() {
  const [produtos, setProdutos] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
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

        setProdutos(response.data.totalProdutos);

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

    fetchProdutos();
  }, [navigate]);

  return (
    <>
      <Toast ref={toast} />
      <div className="card">
        <Card title="Total de Produtos">
          {loading ? (
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
          ) : (
            <p className="m-0" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {produtos !== null ? produtos : 'Sem dados'}
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
