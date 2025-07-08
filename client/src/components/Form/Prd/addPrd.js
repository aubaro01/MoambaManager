import React, { useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import ProdutoForm from './ProductForm';
import { api } from '../../../services/api/api';

const AdicionarProduto = ({ visible, onHide, onProdutoAdicionado }) => {
  const [produto, setProduto] = useState({
    nome: '',
    preco: 0,
    peso: 0,
    pesoTipo: '',
    descricao: '',
    categoria: '',
  });

  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const handleChange = (novoProduto) => {
    setProduto(novoProduto);
  };

  const salvar = async () => {
    setLoading(true);
    try {
      const response = await api.post('/product', produto);

      toast.current.show({
        severity: 'success',
        summary: 'Produto salvo',
        detail: 'Produto adicionado com sucesso!',
        life: 3000,
      });

      onProdutoAdicionado(response.data);
      setProduto({
        nome: '',
        preco: 0,
        peso: 0,
        pesoTipo: '',
        descricao: '',
        categoria: '',
      });

      onHide(); 

    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Erro ao salvar',
        detail: error.response?.data?.message || 'Erro inesperado',
        life: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Adicionar Produto"
        visible={visible}
        style={{ width: '450px' }}
        modal
        onHide={onHide}
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-text"
              onClick={onHide}
              disabled={loading}
            />
            <Button
              label="Salvar"
              icon="pi pi-check"
              className="p-button-primary"
              onClick={salvar}
              loading={loading}
            />
          </div>
        }
      >
        <ProdutoForm produto={produto} onChange={handleChange} />
      </Dialog>
    </>
  );
};

export default AdicionarProduto;
