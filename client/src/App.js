import "./App.css";
import BalanceSheetForm from "./components/pages/BalanceSheet/BalanceSheetForm";
import Company from "./components/pages/Company Model/Company";
import CashFlow from "./components/pages/CashFlow/CashFlow";
import IncomeStatement from "./components/pages/IncomeStatement/IncomeStatement.js";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/pages/User/Register";
import Navbar from "./components/layout/Header";
import Dashboard from "./components/layout/Dashboard";
import Login from "./components/pages/User/LoginTest";
import AuthWrapper from "./protectRoute/AuthWrapper";
import CompanyPage from "./components/pages/CompanyPage/CompanyPage";
import BalanceSheetGraphs from "./components/charts/BalanceSheet/CapitalStructure";
import IncomeSheetChart from "./components/charts/IncomeSheet/IncomeSheetChart";
import CashflowChart from "./components/charts/CashFlow/CashflowChart";
function App() {


 

  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <AuthWrapper>
               <Dashboard />
              
             </AuthWrapper>
            
            }
          />
          <Route
            path="/company"
            element={
              <AuthWrapper>
                <Company />
              </AuthWrapper>
            }
          />
          <Route
            path="/company/:id"
            element={
              <AuthWrapper>
              <CompanyPage />
             </AuthWrapper>
            }
          />
          <Route
            path="/balance/analysis"
            element={
              <AuthWrapper>
                <BalanceSheetGraphs/>
              </AuthWrapper>
            }
          />
          <Route
            path="/cashflow/analysis"
            element={
              <AuthWrapper>
                <CashflowChart/>
              </AuthWrapper>
            }
          />
          <Route
            path="/income/analysis"
            element={
                <IncomeSheetChart/>
              // <AuthWrapper>
              // </AuthWrapper>
            }
          />
          <Route
            path="/cashFlow"
            element={
              <AuthWrapper>
                <CashFlow />
              </AuthWrapper>
            }
          />
          <Route
            path="/incomestatement"
            element={
              <AuthWrapper>
                <IncomeStatement />
              </AuthWrapper>
            }
          />
         
          <Route
            path="/balancesheetform"
            element={
              <AuthWrapper>
                <BalanceSheetForm />
              </AuthWrapper>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
