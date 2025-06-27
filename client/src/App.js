import React from 'react';
import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from "./pages/main";

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          {/* Exemplo de outra rota: */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="*" element={<ErroPage />} /> */}
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
