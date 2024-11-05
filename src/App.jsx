import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./pages/principal/Principal";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
function App() {
  return (
 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
