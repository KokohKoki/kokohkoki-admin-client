import { LoginPage, DashboardPage } from "./pages";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout";
import { useAuth } from "./context/use-context";

function App() {
  const { isLoggedIn } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: isLoggedIn ? <DashboardPage /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
