import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { api } from '../../services/api'; 

export default function ProdutosCard() {
  const [totalProducts, setTotalProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/allProducts'); 
        setTotalProducts(response.data.totalProducts);
      } catch (error) {
        toast.current.show({
          severity: 'error',
          summary: 'Erro ao buscar produtos',
          detail: error.response?.data?.message || error.message,
          life: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <Card title="Produtos" className="mb-4">
        {loading ? (
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
        ) : (
          <p className="m-0" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {totalProducts !== null ? totalProducts : '—'}
          </p>
        )}
      </Card>
    </>
  );
}
