import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const ProdutoForm = ({ produto, onChange }) => {
  const onFieldChange = (field, value) => {
    onChange({ ...produto, [field]: value });
  };

  return (
    <div className="p-fluid">
      <div className="field mb-3">
        <label htmlFor="nome">Nome do produto</label>
        <InputText
          id="nome"
          value={produto.nome || ''}
          onChange={e => onFieldChange('nome', e.target.value)}
        />
      </div>
      <div className="field mb-3">
        <label htmlFor="preco">Preço</label>
        <InputNumber
          id="preco"
          value={produto.preco ?? null}
          mode="currency"
          currency="EUR"
          locale="pt-PT"
          placeholder="0,00 €"
          onValueChange={e => onFieldChange('preco', e.value ?? null)}
          className="w-full"
        />
      </div>

      <div className="field mb-3">
        <label htmlFor="descricao">Descrição</label>
        <InputText
          id="descricao"
          value={produto.descricao || ''}
          onChange={e => onFieldChange('descricao', e.target.value)}
        />
      </div>

      <div className="field mb-3">
        <label htmlFor="peso">Peso</label>
        <InputNumber
          id="peso"
          value={produto.peso || 0}
          onValueChange={e => onFieldChange('peso', e.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div className="field mb-3">
        <label htmlFor="pesoTipo">Tipo de Peso</label>
        <InputText
          id="pesoTipo"
          value={produto.pesoTipo || ''}
          onChange={e => onFieldChange('pesoTipo', e.target.value)}
        />
      </div>

      <div className="field mb-3">
        <label htmlFor="categoria">Categoria</label>
        <InputText
          id="categoria"
          value={produto.categoria || ''}
          onChange={e => onFieldChange('categoria', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProdutoForm;
