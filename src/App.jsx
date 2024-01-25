import { LoginPage, DashboardPage } from "./pages";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";

const isAuthenticated = () => {
  return sessionStorage.getItem("userToken") !== null;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute element={<DashboardPage />} />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default App;
