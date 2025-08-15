// src/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AnimatedBackground } from "./pages/background/background";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import SalesOrdersPage from "./pages/sales/SalesOrdersPage";
import SalesOrderDetailPage from "./pages/sales/SalesOrderDetailPage";
import QuotesPage from "./pages/offers/QuotesPage";
import QuoteDetailPage from "./pages/offers/QuoteDetailPage"; // Bu importun eklendiğinden emin olun
import DispatchesPage from "./pages/dispatches/DispatchesPage";

function App() {
  return (
    <>
      <AnimatedBackground />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />

              <Route path="/sales-orders" element={<SalesOrdersPage />} />
              <Route
                path="/sales-orders/:id"
                element={<SalesOrderDetailPage />}
              />

              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/quotes/:id" element={<QuoteDetailPage />} />
              <Route path="/dispatches" element={<DispatchesPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
