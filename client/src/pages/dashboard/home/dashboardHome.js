import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import  Header  from '../../../components/Header/headerApp';    
import VendasCard from '../../../components/Cards/VendasCard';
import ProdutosCard from '../../../components/Cards/ProdutosCard'; 
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
          <div className="w-full surface-card border-round shadow-2 overflow-hidden">
            <div
              className="bg-primary p-6 text-black flex flex-column align-items-center justify-content-center"
              style={{ height: '100%' }}
            >
              <h1 className="text-3xl font-bold mb-3">Bem-vindo(a)!</h1>
              <p className="opacity-90 text-center text-lg">
                Explore o painel para acompanhar seu negócio e tomar decisões informadas.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-6 flex flex-column gap-6 max-w-30rem">
          <VendasCard className="w-full" />
          <ProdutosCard className="w-full"/>

          <div className="grid grid-nogutter gap-4">
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
