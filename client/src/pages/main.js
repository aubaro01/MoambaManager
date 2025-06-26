import React from "react";
import Header from "../components/Header/header";
import LoginForm from "../components/Form/LoginForm";

export default function LandingPage() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white text-dark">
      <Header />

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <section
          className="text-center p-5 shadow-sm rounded"
          style={{ maxWidth: "420px", width: "100%" }}
        >
          <h2 className="fw-bold mb-3" style={{ letterSpacing: "1.2px" }}>
            Bem-vindo(a) ao{" "}
            <span className="text-primary">Moamba Manager</span>
          </h2>
          <p className="lead text-secondary mb-4">
            Para começar, faça login abaixo
          </p>

        </section>
      </main>

      <footer
        className="bg-light text-center py-3 mt-auto border-top"
        style={{ fontSize: "0.9rem", color: "#6c757d" }}
      >
        © Moamba Manager — Todos os direitos reservados.
      </footer>
    </div>
  );
}
