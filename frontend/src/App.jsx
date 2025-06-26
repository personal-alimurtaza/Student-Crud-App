import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage.jsx";
import Dashboard from "./pages/dashboard.jsx";
import PaymentPage from "./pages/paymentPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthorizationPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/payment/:courseId" element={<PaymentPage />} />
    </Routes>
  );
}

export default App;
