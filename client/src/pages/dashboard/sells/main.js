import React, { useState } from 'react'; 
import Header from '../../../components/Header/headerApp';
import Footer from '../../../components/Footer/footer';
import VendasCard from '../../../components/Cards/VendasCard';
import SearchDate from '../../../components/seachBar/seachDateSells'; 

export default function ProdutosPage() {
    const [range, setRange] = useState(null); 

    return (
        <div className="min-h-screen flex flex-column bg-primary-50 surface-ground text-900">
            <Header />

            <main className="flex-grow-1">
                <div className="px-4 py-6 max-w-screen-xl mx-auto">
                    <SearchDate value={range} onChange={setRange} />
                   {/*} <VendasCard /> */}
                </div>
            </main>
            <Footer />
        </div>
    );
}
