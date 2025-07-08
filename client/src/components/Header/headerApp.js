import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import logoIMG from "../../styles/img/IMG_5540.PNG";

export default function HeaderApp() {
  const [visibleDialog, setVisibleDialog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);

  const handleLogout = () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("jwt_token");
      toast.current.show({
        severity: "success",
        summary: "Logout realizado",
        detail: "Você saiu do sistema com sucesso.",
        life: 3000,
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Erro ao sair",
        detail: "Não foi possível fazer logout. Tente novamente.",
        life: 4000,
      });
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuVisible(false);
  };

  return (
    <>
      <Toast ref={toast} />

      <header className="p-3 surface-card shadow-2 flex flex-wrap align-items-center justify-content-between">
        <div className="flex align-items-center flex-grow-1">
          <img
            src={logoIMG}
            alt="Logo Moamba Manager"
            className="w-3rem h-3rem border-circle shadow-2"
          />
          <span className="ml-3 font-bold text-xl text-primary">
            MoaDash
          </span>
        </div>

        <Button
          icon="pi pi-bars"
          className="p-button-text p-button-plain ml-2 block md:hidden"
          onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
          aria-label="Menu"
        />

        <nav
          className={`
            md:flex md:align-items-center md:flex-grow-0
            w-full md:w-auto
            mt-3 md:mt-0
            ${mobileMenuVisible ? "flex flex-column" : "hidden"}
            md:flex-row
          `}
        >
          <Button
            label="Home"
            icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-home"}
            className="p-button-text text-600 md:ml-2"
            onClick={() => handleNavigate("/dashboard")}
            disabled={isLoading}
          />
          <Button
            label="Produtos"
            icon="pi pi-cart-arrow-down"
            className="p-button-text text-600 mb-2 md:mb-0 md:ml-2"
            onClick={() => handleNavigate("/dashboard/produtos")}
            disabled={isLoading}
          />
          <Button
            label="Vendas"
            icon="pi pi-chart-bar"
            className="p-button-text text-600 mb-2 md:mb-0 md:ml-2"
            onClick={() => handleNavigate("/dashboard/vendas")}
            disabled={isLoading}
          />
          <Button
            label="Faturas"
            icon="pi pi-receipt"
            className="p-button-text text-600 mb-2 md:mb-0 md:ml-2"
            onClick={() => {
              setVisibleDialog("obj");
              setMobileMenuVisible(false);
            }}
            disabled={isLoading}
          />
          <Button
            label="Objetivos Mensais"
            icon="pi pi-chart-pie"
            className="p-button-text text-600 mb-2 md:mb-0 md:ml-2"
            onClick={() => {
              setVisibleDialog("obj");
              setMobileMenuVisible(false);
            }}
            disabled={isLoading}
          />
          <Button
            label="Logout"
            icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-sign-out"}
            className="p-button-text text-600 md:ml-2"
            onClick={handleLogout}
            disabled={isLoading}
          />
        </nav>

        <Dialog
          header="Objetivos Mensais"
          visible={visibleDialog === ""}
          style={{ width: "50vw", maxWidth: "90vw" }}
          maximizable
          onHide={() => setVisibleDialog(null)}
        >
          <p className="m-0">
            O <strong>Moamba Manager</strong> é uma plataforma para gerenciamento
            de negócios. Desenvolvido com foco em segurança, desempenho e
            usabilidade.
          </p>
        </Dialog>
        <Dialog
          header="Header"
          visible={visibleDialog === "obj"}
          style={{ width: '50vw' }}
          onHide={() => {
            if (!visibleDialog) return;
            setVisibleDialog(false);
          }}>
          <p className="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Dialog>
      </header>
    </>
  );
}
