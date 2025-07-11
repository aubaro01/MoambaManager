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
                    <section className="mb-8 p-4 rounded-lg bg-gray-50 shadow-sm max-w-lg mx-auto">
                        <PrdFilters value={filtroNome} onChange={setFiltroNome} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <PrdCards filtroNome={filtroNome} />
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
