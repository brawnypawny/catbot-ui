import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />  {/* Where nested pages like Home, Login, etc. will render */}

    </>
  );
}