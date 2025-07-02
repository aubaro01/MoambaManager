import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import Header from '../../../components/Header/headerApp';
import VendasCard from '../../../components/Cards/VendasCard';
import ProdutosCard from '../../../components/Cards/ProdutosCard';
import ObjCard from '../../../components/Cards/Obj';
import Footer from '../../../components/Footer/footer';

export default function LandingPage() {
  const [visibleDialog, setVisibleDialog] = useState(null);
  const toast = useRef(null);

  const features = [
    {
      icon: 'chart-line',
      title: 'Análises',
      description: 'Recursos avançados para monitorar e interpretar seus dados em tempo real.',
    },
    {
      icon: 'shield',
      title: 'Segurança',
      description: 'Proteção reforçada para manter seus dados seguros e acessos controlados.',
    },
    {
      icon: 'sync',
      title: 'Sincronização',
      description: 'Sincronize seus dados em múltiplos dispositivos sem perder a integridade.',
    }
  ];

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

          <div className="grid grid-nogutter gap-4 w-full">
            {features.map(({ icon, title, description }, idx) => (
              <div
                key={idx}
                className="surface-card border-round shadow-sm p-4 flex flex-column hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <div className="flex align-items-center gap-4 mb-3">
                  <span className="bg-primary-100 text-primary p-3 border-round text-xl flex align-items-center justify-content-center">
                    <i className={`pi pi-${icon}`}></i>
                  </span>
                  <h4 className="font-semibold text-xl text-900 m-0">{title}</h4>
                </div>
                <p className="text-600 m-0">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
