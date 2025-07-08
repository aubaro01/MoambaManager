import React, { useState } from 'react';
import Header from '../../../components/Header/headerApp';
import Footer from '../../../components/Footer/footer';
import PrdCards from '../../../components/Cards/ProdutosCard';
import PrdFilters from '../../../components/seachBar/seachBarProduto';

export default function ProdutosPage() {
    const [filtroNome, setFiltroNome] = useState('');

    return (
        <div className="min-h-screen flex flex-column bg-primary-50 surface-ground text-900">
            <Header />
            <main className="flex-grow-1">
                <div className="px-4 py-6 max-w-screen-xl mx-auto">
                    <PrdFilters value={filtroNome} onChange={setFiltroNome} />
                    <PrdCards filtroNome={filtroNome} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
