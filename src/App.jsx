import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/front/Login";
import AdminLayout from "./components/layout/admin";
import DashboardPage from "./pages/admin/DashboardPage";
import SkillsPage from "./pages/admin/SkillsPage";
import UsersPage from "./pages/admin/UsersPage";
import { useSelector } from "react-redux";
import Portfolios from "./pages/admin/PortfoliosPage";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        {isAuthenticated ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="portfolios" element={<Portfolios/>}/>
            <Route path="skills" element={<SkillsPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        ) : null}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
