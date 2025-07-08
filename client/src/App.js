import React from 'react';
import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import PrivateRoute from "./services/api/privateRoute";
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard/home/dashboardHome";
import Produtos from "./pages/dashboard/products/main";
import Vendas from "./pages/dashboard/sells/main";

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {<Route path="/dashboard" element={<Dashboard />} /> }
            {/*<PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />} */}
          {<Route path="/dashboard/produtos" element={<Produtos />} /> }
            {/* <PrivateRoute>
              <Produtos />
            </PrivateRoute>
          } />}*/}
          {<Route path="/dashboard/vendas" element={<Vendas /> } />}
            {/* <PrivateRoute>
              <Vendas />
            </PrivateRoute>
          } />}*/}
          {/* <Route path="*" element={<ErroPage />} /> */}
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}
export default App;
