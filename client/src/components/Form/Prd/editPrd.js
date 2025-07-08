import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';

const categorias = [
  { label: 'Alimentar', value: 'alimentar' },
  { label: 'Eletrônicos', value: 'eletronicos' },
  { label: 'Roupas', value: 'roupas' },
  // Adicione mais categorias aqui
];

export default function ProdutoForm({ produto, onChange }) {
  if (!produto) return null;

  const handleChange = (e, campo) => {
    const valor = e.target ? e.target.value : e.value;
    onChange({ ...produto, [campo]: valor });
  };

  return (
    <div className="p-fluid formgrid grid">
      <div className="field col-12">
        <label htmlFor="nome">Nome</label>
        <InputText
          id="nome"
          value={produto.nome}
          onChange={(e) => handleChange(e, 'nome')}
        />
      </div>

      <div className="field col-12">
        <label htmlFor="preco">Preço</label>
        <InputNumber
          id="preco"
          value={produto.preco}
          onValueChange={(e) => handleChange(e, 'preco')}
          mode="currency"
          currency="BRL"
          locale="pt-BR"
          min={0}
          max={100000}
          className="w-full"
        />
      </div>

      <div className="field col-12">
        <label htmlFor="descricao">Descrição</label>
        <InputTextarea
          id="descricao"
          value={produto.descricao}
          onChange={(e) => handleChange(e, 'descricao')}
          rows={3}
          autoResize
        />
      </div>

      <div className="field col-6">
        <label htmlFor="peso">Peso</label>
        <InputNumber
          id="peso"
          value={produto.peso}
          onValueChange={(e) => handleChange(e, 'peso')}
          min={0}
          max={1000}
          className="w-full"
        />
      </div>

      <div className="field col-6">
        <label htmlFor="pesoTipo">Tipo de Peso</label>
        <Dropdown
          id="pesoTipo"
          value={produto.pesoTipo}
          options={[
            { label: 'KG', value: 'KG' },
            { label: 'G', value: 'G' },
            { label: 'L', value: 'L' },
          ]}
          onChange={(e) => handleChange(e, 'pesoTipo')}
          placeholder="Selecione"
          className="w-full"
        />
      </div>

      <div className="field col-12">
        <label htmlFor="categoria">Categoria</label>
        <Dropdown
          id="categoria"
          value={produto.categoria}
          options={categorias}
          onChange={(e) => handleChange(e, 'categoria')}
          placeholder="Selecione"
          className="w-full"
        />
      </div>
    </div>
  );
}
