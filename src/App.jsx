import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Auth from "./auth/Auth";
import VendreParfum from "./parfum/VendreParfum";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/vendreParfum" element={<VendreParfum/>}/>
    </Routes>
  );
}