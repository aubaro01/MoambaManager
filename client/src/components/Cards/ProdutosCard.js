import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import EditPrd from '../Form/Prd/editPrd';  
import AddPrd from '../Form/Prd/addPrd';    
import { api } from '../../services/api/api';

const PrdCards = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modalEditVisivel, setModalEditVisivel] = useState(false);
  const [modalAddVisivel, setModalAddVisivel] = useState(false);

  const toast = useRef(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      try {
        const response = await api.get('/products'); 
        setProdutos(response.data.content || []);
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

    fetchProdutos();
  }, []);

  const abrirEdicao = (produto) => {
    setProdutoEditando({ ...produto });
    setModalEditVisivel(true);
  };

  const fecharModalEdit = () => {
    setModalEditVisivel(false);
    setProdutoEditando(null);
  };

  const salvarEdicao = () => {
    setProdutos(prev =>
      prev.map(p => (p._id === produtoEditando._id ? produtoEditando : p))
    );
    fecharModalEdit();
  };

  const handleProdutoChange = (produtoAtualizado) => {
    setProdutoEditando(produtoAtualizado);
  };

  const handleExcluir = (id) => {
    confirmDialog({
      message: 'Tem certeza que deseja eliminar este produto?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        setProdutos(prev => prev.filter(p => p._id !== id));
      }
    });
  };

  const abrirAdicionar = () => setModalAddVisivel(true);
  const fecharAdicionar = () => setModalAddVisivel(false);

  const salvarAdicionar = (novoProduto) => {
    setProdutos(prev => [
      ...prev,
      { ...novoProduto, _id: Date.now().toString() }
    ]);
    fecharAdicionar();
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="flex justify-between items-center mb-5 gap-4">
        <h2 className="text-2xl font-semibold">Produtos</h2>
        <Button label="Adicionar Produto" icon="pi pi-plus" onClick={abrirAdicionar} />
      </div>

      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="grid grid-nogutter md:grid-cols-2 lg:grid-cols-3 gap-5">
          {produtos.length === 0 && <p>Nenhum produto encontrado.</p>}
          {produtos.map(produto => (
            <Card
              key={produto._id}
              title={produto.nome}
              subTitle={`Categoria: ${produto.categoria}`}
              className="shadow-2 border-round-md"
              footer={
                <div className="flex flex-column gap-2 pt-3 items-start">
                  <span className="text-lg font-bold text-green-600">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-sm p-button-warning"
                      onClick={() => abrirEdicao(produto)}
                    />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-sm p-button-danger"
                      onClick={() => handleExcluir(produto._id)}
                    />
                  </div>
                </div>
              }
            >
              <div className="text-sm text-gray-700">
                <p><strong>Descrição:</strong> {produto.descricao}</p>
                <p><strong>Peso:</strong> {produto.peso} {produto.pesoTipo}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {modalEditVisivel && (
        <Dialog
          header="Editar Produto"
          visible={modalEditVisivel}
          style={{ width: '450px' }}
          modal
          onHide={fecharModalEdit}
          footer={
            <div>
              <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={fecharModalEdit} />
              <Button label="Salvar" icon="pi pi-check" className="p-button-primary" onClick={salvarEdicao} />
            </div>
          }
        >
          <EditPrd produto={produtoEditando} onChange={handleProdutoChange} />
        </Dialog>
      )}

      <AddPrd
        visible={modalAddVisivel}
        onHide={fecharAdicionar}
        onSalvar={salvarAdicionar}
      />
    </div>
  );
};

export default PrdCards;
