import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import ProdutoForm from './ProductForm';

const AdicionarProduto = ({ visible, onHide, onSalvar }) => {
  const [produto, setProduto] = useState({
    nome: '',
    preco: 0,
    peso: 0,
    pesoTipo: '',
    descricao: '',
    categoria: '',
  });

  const handleChange = (novoProduto) => {
    setProduto(novoProduto);
  };

  const salvar = () => {
    onSalvar(produto);
    setProduto({
      nome: '',
      preco: 0,
      peso: 0,
      pesoTipo: '',
      descricao: '',
      categoria: '',
    });
  };

  return (
    <Dialog
      header="Adicionar Produto"
      visible={visible}
      style={{ width: '450px' }}
      modal
      onHide={onHide}
      footer={
        <div>
          <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={onHide} />
          <Button label="Salvar" icon="pi pi-check" className="p-button-primary" onClick={salvar} />
        </div>
      }
    >
      <ProdutoForm produto={produto} onChange={handleChange} />
    </Dialog>
  );
};

export default AdicionarProduto;
