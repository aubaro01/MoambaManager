import React, { useState, useEffect } from "react";

// Mock Header Component
const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/90 border-b border-gray-200">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold text-gray-900">
          Moamba Manager
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Recursos</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contato</a>
        </nav>
      </div>
    </div>
  </header>
);

// Mock Login Form Component
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <button
        onClick={(e) => e.preventDefault()}
        className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200"
      >
        Entrar
      </button>
    </div>
  );
};

export default function SimpleLandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className={`max-w-md w-full transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            {/* Title Area */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 rounded-lg mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Bem-vindo ao Moamba Manager
              </h1>
              <p className="text-gray-600">
                Para começar, faça login abaixo
              </p>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Additional Links */}
            <div className="mt-6 text-center space-y-2">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                Esqueceu sua senha?
              </a>
              <div className="text-gray-500 text-sm">
                Não tem uma conta?{" "}
                <a href="#" className="text-gray-900 hover:underline">
                  Cadastre-se
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-500 text-sm mb-2 md:mb-0">
              © 2025 Moamba Manager — Todos os direitos reservados.
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Privacidade</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Termos</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">Suporte</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}