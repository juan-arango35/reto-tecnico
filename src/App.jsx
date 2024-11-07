import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./pages/principal/Principal";
import Login from "./pages/login/Login";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Proveedor from "./context/Proveedor";
import ApiUploadSimulator from "./components/ApiUploadSimulator";
import { ApiLoginSimulator } from "./components/ApiLoginSimulator";
function App() {
  return (
    <Proveedor>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Principal />} />
            <Route path="/api/upload" element={<ApiUploadSimulator />} />
            <Route path="/api/login" element={<ApiLoginSimulator />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Proveedor>
  );
}
export default App;


/* proyecto notion:
https://codeablela.notion.site/Kudos-Software-Factory-C14-cfb3ce27df4348e4b5d9293a8b4d83b6 */
