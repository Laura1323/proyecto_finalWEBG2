import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import GroupIncidents from "../pages/admin/GroupIncidents";
import ManageIncidents from "../pages/admin/ManageIncidents";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Statistics from "../pages/dashboard/Statistics";
import CreateIncident from "../pages/incidents/CreateIncident";
import IncidentView from "../pages/incidents/IncidentView";
import MyIncidents from "../pages/incidents/MyIncidents";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/incidentes/nuevo" element={<CreateIncident />} />
            <Route path="/mis-incidentes" element={<MyIncidents />} />
            <Route path="/incidentes/:id" element={<IncidentView />} />
            <Route path="/estadisticas" element={<Statistics />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute adminOnly />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/incidentes" element={<ManageIncidents />} />
            <Route path="/admin/agrupar" element={<GroupIncidents />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
