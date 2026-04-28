import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './style.css'
import Home from './pages/Home'
import Login from './pages/auth/Login';
import { LoanApply } from './Components/LoanForm';
import Loans from './pages/loanpages/Loans';

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
