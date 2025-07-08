import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import Header from '../../../components/Header/headerApp';
import VendasCard from '../../../components/Cards/VendasHomeCard';
import ProdutosCard from '../../../components/Cards/ProdutosHomeCard';
import ObjCard from '../../../components/Cards/Obj';
import Footer from '../../../components/Footer/footer';

export default function LandingPage() {
  const [visibleDialog, setVisibleDialog] = useState(null);
  const toast = useRef(null);

  return (
    <div className="min-h-screen flex flex-column bg-primary-50 surface-ground text-900">
      <Toast ref={toast} position="top-right" />

      <Header />

      <div className="flex flex-grow-1 flex-column md:flex-row align-items-start justify-content-center p-4 md:p-8 gap-8">

        <div className="w-full md:w-6 flex justify-content-center max-w-30rem">
          <div className="w-full surface-card border-round shadow-2 overflow-hidden p-6 flex flex-column align-items-center text-center bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 text-black" style={{ minHeight: 280 }}>
            <i className="pi pi-smile text-6xl mb-4" style={{ animation: 'pulse 3s infinite', color: 'black' }}></i>
            <h1 className="text-4xl font-extrabold mb-2">Bem-vindo(a)!</h1>
            <p className="mb-6 opacity-90 text-lg px-4">
              Explore o painel para acompanhar seu negócio, monitorar resultados e tomar decisões informadas.
            </p>
            <button
              type="button"
              className="p-button p-component p-button-raised p-button-text p-button-plain"
              onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
              style={{ borderColor: 'white', color: 'black', fontWeight: '600' }}
            >
              Comece agora
              <i className="pi pi-arrow-right ml-2"></i>
            </button>
          </div>
        </div>

        <div className="w-full md:w-6 flex flex-wrap justify-center gap-6 max-w-30rem">
          <div className="flex-1 min-w-[14rem] max-w-[18rem]">
            <VendasCard />
          </div>
          <div className="flex-1 min-w-[14rem] max-w-[18rem]">
            <ProdutosCard />
          </div>
          <div className="flex-1 min-w-[14rem] max-w-[18rem]">
            <ObjCard />
          </div>
        </div>
      </div>
      {/*<div className="overflow-x-auto">
        <TabelaExemplo />
      </div>*/}
      <Footer />
    </div>

  );
}
