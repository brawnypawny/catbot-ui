import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from './services/AuthContext'; 
import App from "./App";

import Home from "./pages/Home";
import CatDatabase from "./pages/CatDatabase";
import AddCat from "./pages/AddCat";
import Login from './pages/Login';
import CatList from "./components/CatList";
import Register from './pages/Register';

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
      { path: "cat-database", element: <CatDatabase /> },
      { path: "create", element: <AddCat /> },
      { path: "login", element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
    errorElement: (
      <h1>
        <div className="page-center">404 Page not found 😿</div>
      </h1>
    ),
  },
]);

export default router;
