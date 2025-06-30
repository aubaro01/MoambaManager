import React from "react";

export default function HeaderApp() {
  return (
    <header className="bg-dark text-white py-4 shadow-sm">
      <div className="container text-center">
        <h1 className="fw-bold mb-1" style={{ letterSpacing: "2px" }}>
          Moamba Manager
        </h1>
        <p className="lead text-secondary mb-0">
          Uma webApp para gestão
        </p>
        <hr
          className="mx-auto mt-3"
          style={{
            width: "60px",
            borderTop: "3px solid #03a87c",
            borderRadius: "2px",
          }}
        />
      </div>
    </header>
  );
}
