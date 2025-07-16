
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "./pages/Home";
import CatList from "./components/CatList";
import CatForm from "./components/CatForm"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "cats", element: <CatList /> },
      { path: "create", element: <CatForm /> },
    ],
  },
]);

export default router;
