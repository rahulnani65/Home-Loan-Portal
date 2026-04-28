import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './style.css'
import Home from './pages/Home'
import Login from './pages/auth/Login';
import Loans from './pages/loanpages/Loans';
import LoanApply from './pages/loanpages/LoanApply';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/apply"   element={<LoanApply />} />
        <Route path="/loans"   element={<Loans />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
