import React from 'react';
import Header from '../../../components/Header/headerApp';
import Footer from '../../../components/Footer/footer';
import ProdutosList from '../../../components/Cards/ProdutosCard';
import SearchBar from '../../../components/seachBar/seachBarProduto'; 
export default function ProdutosPage() {
    return (
        <div className="min-h-screen flex flex-column bg-primary-50 surface-ground text-900">
            <Header />

            <main className="flex-grow-1">
                <div className="px-4 py-6 max-w-screen-xl mx-auto">
                    <SearchBar />
                    <ProdutosList /> 
                </div>
            </main>

            <Footer />
        </div>
    );
}
