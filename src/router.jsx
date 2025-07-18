import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from './services/AuthContext'; 
import App from "./App";

import Home from "./pages/Home";
import CatDatabase from "./pages/CatDatabase";
import AddCat from "./pages/AddCat";
import Login from './pages/Login';
import CatList from "./components/CatList";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "cat-database", element: <CatList /> },
      { path: "create", element: <AddCat /> },
      { path: "login", element: <Login /> },
    ],
    errorElement: (
      <h1>
        <div className="page-center">404 Page not found 😿</div>
      </h1>
    ),
  },
]);

export default router;
