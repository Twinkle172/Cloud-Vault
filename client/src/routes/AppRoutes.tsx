import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/Dashboard";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import Landing from "../pages/Landing";
import MyFiles from "../pages/MyFiles";
import ProtectedRoute from "./ProtectedRoute";
import Recent from "../pages/Recent";
import Settings from "../pages/Settings";
import Shared from "../pages/Shared";
import Trash from "../pages/Trash";
import AIChat from "../pages/AIChat";
import GoogleDrive from "../pages/GoogleDrive";
import DemoPage from "../demo/DemoPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/demo" element={<DemoPage />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/files" element={<MyFiles />} />

          {/* Google Drive */}
          <Route path="/drive" element={<GoogleDrive />} />

          <Route path="/shared" element={<Shared />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ai" element={<AIChat />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;