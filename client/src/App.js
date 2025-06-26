import logo from './logo.svg';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from "./pages/main";

function App() {
  return (
    <Router>
      <div>
        <Routes>
         {/* <Route path="*" element={<ErroPage />} />*/}
          <Route path="/" element={<Mainpage />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
