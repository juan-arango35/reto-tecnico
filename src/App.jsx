import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./pages/principal/Principal";
import Login from "./pages/login/Login";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Proveedor from "./context/Proveedor";
function App() {
  return (
    <Proveedor>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Principal />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Proveedor>
  );
}
export default App;
