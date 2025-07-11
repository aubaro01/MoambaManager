import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Paginator } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';
import EditPrd from '../Form/Prd/editPrd';
import AddPrd from '../Form/Prd/addPrd';
import { api } from '../../services/api/api';

const PrdCards = ({ filtroNome }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modalEditVisivel, setModalEditVisivel] = useState(false);
  const [modalAddVisivel, setModalAddVisivel] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginacao, setPaginacao] = useState({
    totalPages: 1,
    totalElements: 0,
    currentPage: 1,
  });

  const toast = useRef(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products?page=${paginaAtual}&size=5`);
        setProdutos(response.data.content || []);
        setPaginacao(response.data.page);
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
  }, [paginaAtual]);

  const abrirEdicao = (produto) => {
    setProdutoEditando({ ...produto });
    setModalEditVisivel(true);
  };

  const fecharModalEdit = () => {
    setModalEditVisivel(false);
    setProdutoEditando(null);
  };

  const salvarEdicao = async () => {
    try {
      const response = await api.put(`/product/${produtoEditando._id}`, produtoEditando);
      setProdutos((prev) =>
        prev.map((p) => (p._id === produtoEditando._id ? response.data : p))
      );
      toast.current?.show({
        severity: 'success',
        summary: 'Produto atualizado',
        detail: 'As alterações foram salvas com sucesso.',
        life: 3000
      });
      fecharModalEdit();
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro ao atualizar',
        detail: error.response?.data?.message || 'Erro inesperado ao salvar',
        life: 4000
      });
    }
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
      accept: async () => {
        try {
          await api.delete(`/product/${id}`);
          setProdutos((prev) => prev.filter((p) => p._id !== id));
          toast.current?.show({
            severity: 'success',
            summary: 'Produto removido',
            detail: 'O produto foi eliminado com sucesso.',
            life: 3000,
          });
        } catch (error) {
          toast.current?.show({
            severity: 'error',
            summary: 'Erro ao eliminar',
            detail: error.response?.data?.message || 'Erro inesperado',
            life: 4000,
          });
        }
      }
    });
  };

  const abrirAdicionar = () => setModalAddVisivel(true);
  const fecharAdicionar = () => setModalAddVisivel(false);

  const handleProdutoAdicionado = (novoProduto) => {
    setProdutos((prev) => [...prev, novoProduto]);
    fecharAdicionar();
  };

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="flex justify-between items-center mb-5 gap-4">
        <h2 className="text-2xl font-semibold">Produtos</h2>
        <Button
          label="Adicionar Produto"
          icon="pi pi-plus"
          severity="success"
          rounded
          size="small"
          onClick={abrirAdicionar}
          className="p-button-sm"
        />
      </div>

      {loading ? (
        <div className="grid grid-nogutter md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="p-3 border-round-md shadow-2"
              style={{ minHeight: '180px' }}
              aria-label="Carregando produto"
            >
              <Skeleton width="60%" height="1.5rem" className="mb-3" />
              <Skeleton width="40%" height="1rem" className="mb-4" />
              <Skeleton width="100%" height="3rem" className="mb-3" />
              <div className="flex gap-2">
                <Skeleton width="2rem" height="2rem" shape="circle" />
                <Skeleton width="2rem" height="2rem" shape="circle" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-nogutter md:grid-cols-2 lg:grid-cols-3 gap-5">
          {produtosFiltrados.length === 0 && <p>Nenhum produto encontrado.</p>}
          {produtosFiltrados.map((produto) => (
            <Card
              key={produto._id}
              title={produto.nome}
              subTitle={`Categoria: ${produto.categoria}`}
              className="shadow-2 border-round-md"
              footer={
                <div className="flex flex-column gap-2 pt-3 items-start">
                  <span className="text-lg font-bold text-green-600">
                    € {produto.preco.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-sm p-button-warning"
                      onClick={() => abrirEdicao(produto)}
                      aria-label={`Editar produto ${produto.nome}`}
                    />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-sm p-button-danger"
                      onClick={() => handleExcluir(produto._id)}
                      aria-label={`Eliminar produto ${produto.nome}`}
                    />
                  </div>
                </div>
              }
            >
              <div className="text-sm text-gray-700">
                <p><strong>Descrição:</strong></p>
                <p style={{ whiteSpace: 'pre-line' }}>{produto.descricao}</p>
                <p><strong>Peso:</strong> {produto.peso} {produto.pesoTipo}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Paginator
        first={(paginacao.currentPage - 1) * 5}
        rows={5}
        totalRecords={paginacao.totalElements}
        onPageChange={(e) => setPaginaAtual(e.page + 1)}
      />

      <AddPrd
        visible={modalAddVisivel}
        onHide={fecharAdicionar}
        onProdutoAdicionado={handleProdutoAdicionado}
      />

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
    </div>
  );
};

export default PrdCards;
