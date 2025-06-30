import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Footer from "../components/Footer/footer";
import LoginForm from "../components/Form/LoginForm";
import logoIMG from "../styles/img/IMG_5540.PNG";

const SupportDialog = ({ visible, onHide }) => (
  <Dialog
    header="Suporte"
    visible={visible}
    style={{ width: "50vw" }}
    maximizable
    onHide={onHide}
  >
    <p className="m-0">
      Para suporte, entre em contato pelo GitHub:{" "}
      <a href="https://github.com/aubaro01" target="_blank" rel="noreferrer" className="text-primary font-semibold">
        https://github.com/aubaro01
      </a>
    </p>
  </Dialog>
);

const AboutDialog = ({ visible, onHide }) => (
  <Dialog
    header="Sobre o Sistema"
    visible={visible}
    style={{ width: "50vw" }}
    maximizable
    onHide={onHide}
  >
    <p className="m-0">
      O <strong>Moamba Manager</strong> é uma plataforma para gerenciamento de negócios.
      Desenvolvido com foco em segurança, desempenho e usabilidade.
    </p>
  </Dialog>
);

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const toast = useRef(null);

  const handleLogin = (logName, password) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.current.show({
        severity: "success",
        summary: "Login realizado!",
        detail: "Redirecionando para o dashboard...",
        life: 3000,
      });
    }, 1500);
  };

  const features = [
    {
      icon: "chart-line",
      title: "Análises",
      description: "Recursos avançados",
    },
    {
      icon: "shield",
      title: "Segurança",
      description: "Recursos avançados",
    },
    {
      icon: "sync",
      title: "Sincronização",
      description: "Recursos avançados",
    },
  ];

  return (
    <div className="min-h-screen flex flex-column bg-primary-50 surface-ground text-900">
      <Toast ref={toast} position="top-right" />

      <header className="p-3 flex justify-content-between align-items-center surface-card shadow-2">
        <div className="flex align-items-center">
          <img
            src={logoIMG}
            alt="Logo Moamba Manager"
            className="w-3rem h-3rem border-circle shadow-2"
          />
          <span className="ml-3 font-bold text-xl text-primary">Moamba Manager</span>
        </div>

        <nav>
          <Button
            label="Suporte"
            icon="pi pi-question-circle"
            className="p-button-text text-600"
            onClick={() => setActiveDialog("support")}
            aria-label="Abrir diálogo de suporte"
          />
          <Button
            label="Sobre"
            icon="pi pi-info-circle"
            className="p-button-text ml-2 text-600"
            onClick={() => setActiveDialog("about")}
            aria-label="Abrir diálogo sobre o sistema"
          />
        </nav>

        <SupportDialog visible={activeDialog === "support"} onHide={() => setActiveDialog(null)} />
        <AboutDialog visible={activeDialog === "about"} onHide={() => setActiveDialog(null)} />
      </header>

      <main className="flex flex-grow-1 flex-column md:flex-row align-items-center justify-content-center p-4 md:p-8">
        <section className="w-full md:w-6 flex justify-content-center mb-6 md:mb-0">
          <div className="max-w-30rem w-full">
            <div className="surface-100 border-2 border-dashed border-primary border-round w-full h-24rem md:h-36rem flex flex-column align-items-center justify-content-center text-center px-4">
              <i
                className="pi pi-lock text-6xl text-primary mb-3"
                aria-hidden="true"
                title="Ícone de segurança"
              ></i>
              <h3 className="text-2xl font-bold text-900">Controle Total do Seu Negócio</h3>
              <p className="text-600 mt-2">
                Gerencie suas operações com segurança e eficiência
              </p>
            </div>

            <div className="mt-6 flex flex-column gap-5">
              {features.map(({ icon, title, description }, idx) => (
                <div key={title} className="flex flex-column">
                  <div className="flex align-items-center gap-3">
                    <span className="bg-primary-100 text-primary p-2 border-round" aria-hidden="true">
                      <i className={`pi pi-${icon}`}></i>
                    </span>
                    <h4 className="font-bold text-900 text-lg">#{title}</h4>
                  </div>
                  <p className="text-600 mt-2 ml-7">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full md:w-6 flex justify-content-center">
          <div className="w-full max-w-30rem surface-card border-round shadow-2 overflow-hidden">
            <div className="bg-primary p-6 text-black">
              <h1 className="text-2xl font-bold mb-1">Bem-vindo(a) de volta!</h1>
              <p className="opacity-90">Por favor, faça login para continuar</p>
               <LoginForm onLogin={handleLogin} loading={loading} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
