import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Projects from "./pages/Projects/Projects";
import Inventory from "./pages/Inventory/Inventory";
import Workers from "./pages/Workers/Workers";
import Reports from "./pages/Reports/Reports";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import PublicProject from "./pages/PublicProject/PublicProject";
import AIAssistant from "./pages/AI/AIAssistant";
import DriverDelivery from "./pages/Delivery/DriverDelivery";
import LiveDelivery from "./pages/Delivery/LiveDelivery";
import SiteIntelligence from "./pages/SiteIntelligence";
import ProjectInventory from "./pages/Inventory/ProjectInventory";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Invoices from "./pages/Invoices/Invoices";
import Settings from "./pages/Settings/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

<Route
 path="/dashboard"
 element={
   <ProtectedRoute allowedRoles={["Manager"]}>
      <Dashboard/>
   </ProtectedRoute>
 }
/>
<Route
 path="/projects"
 element={
   <ProtectedRoute allowedRoles={["Manager"]}>
      <Projects/>
   </ProtectedRoute>
 }
/>
<Route
 path="/inventory"
 element={
   <ProtectedRoute allowedRoles={["Manager","Worker"]}>
      <Inventory/>
   </ProtectedRoute>
 }
/>
<Route
 path="/workers"
 element={
   <ProtectedRoute allowedRoles={["Manager"]}>
      <Workers/>
   </ProtectedRoute>
 }
/>
<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>
<Route
  path="/projects/:id"
  element={
    <ProtectedRoute>
      <ProjectDetails />
    </ProtectedRoute>
  }
/>
<Route path="/share/:id" element={<PublicProject />} />

<Route path="/ai" element={<AIAssistant />} />
<Route
  path="/delivery/:token"
  element={<DriverDelivery />}
/>
<Route
    path="/delivery/live/:id"
    element={<LiveDelivery />}
/>

<Route
  path="/site-intelligence"
  element={<SiteIntelligence />}
/>
<Route
  path="/inventory/:projectId"
  element={<ProjectInventory />}
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
<Route
  path="/invoices"
  element={
    <ProtectedRoute>
      <Invoices />
    </ProtectedRoute>
  }
/>
<Route
 path="/settings"
 element={<Settings />}
/>

      </Routes>

    </BrowserRouter>
  );
}