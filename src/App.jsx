import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Overview from "./pages/Overview";
import Alerts from "./pages/Alerts";
import AI from "./pages/AI";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
  path="/alerts"
  element={
    <ProtectedRoute>
      <Alerts />
    </ProtectedRoute>
  }
/>
<Route
  path="/ai"
  element={
    <ProtectedRoute>
      <AI />
    </ProtectedRoute>
  }
/>

        <Route
  path="/overview"
  element={
    <ProtectedRoute>
      <Overview />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
