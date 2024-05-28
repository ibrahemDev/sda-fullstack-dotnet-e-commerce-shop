import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ProtractedRoute, { RoleModel } from "./components/router/ProtractedRoute";
import ProductsPage from "./pages/prodducts/ProductsPage";
import ProductDetails from "./pages/productDetails/ProductPage";
import CartPage from "./pages/cart/CartPage";
import { RolesTypes, useAuthenticationActions } from "./context/auth/actions/useAuthenticationActions";
import DashboardLayout from "./components/DashboardLayout";
import ProductsDashboardPage from "./pages/dashboard/products/ProductsDashboardPage";
import HomeDashboardPage from "./pages/dashboard/home/HomeDashboardPage";
import CustomersDashboardPage from "./pages/dashboard/customers/CustomersDashboardPage";
import CategoriesDashboardPage from "./pages/dashboard/catefories/CategoriesDashboardPage";
import OrdersDashboardPage from "./pages/dashboard/orders/OrdersDashboardPage";


/**
 * This is the main application component that sets up routing and renders different pages based on the URL.
 * 
 * @returns {JSX.Element} - The rendered application component.
 */
function App() {

  // Get the authentication state and actions from the authentication context.
  const { AuthState } = useAuthenticationActions();

  // While authenticating, show a loading message
  if (AuthState.isAuthenticating) {
    return (<>Loading.....</>)
  }

  return (
    // Use the BrowserRouter component from react-router-dom to enable routing in the application.
    <div className="App">
      <BrowserRouter>
        {/* Use the Routes component to define the different routes of the application. */}
        <Routes>

          {/* 
            Route for the dashboard, accessible only to admins.
            It uses the ProtractedRoute component to protect the route and redirect 
            unauthorized users based on their roles.
            The deniedRolesModels prop specifies the roles that are not allowed to access this route.
          */}
          <Route path="/dashboard" element={
            <ProtractedRoute
              deniedRolesModels={[
                RoleModel(RolesTypes.User, "/"),
                RoleModel(RolesTypes.Guest, "/")
              ]}
            />
          }>
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Define the nested routes for the dashboard. */}
              <Route index element={<HomeDashboardPage />} />
              <Route path="products" element={<ProductsDashboardPage />} />
              <Route path="customers" element={<CustomersDashboardPage />} />
              <Route path="categories" element={<CategoriesDashboardPage />} />
              <Route path="orders" element={<OrdersDashboardPage />} />
            </Route>
          </Route>

          {/* 
            Route for the main layout of the application. 
            It uses the Layout component to render the common layout elements.
          */}
          <Route path="/" element={<Layout />}>

            {/* 
              Home page route, accessible to all roles. 
              It uses the ProtractedRoute component with an empty deniedRolesModels array to allow access to all roles.
            */}
            <Route path="/" element={<ProtractedRoute deniedRolesModels={[]} />}>
              <Route index element={<HomePage />} />
            </Route>

            {/* 
              Login page route, accessible only to guests. 
              It uses the ProtractedRoute component to redirect authenticated users to the home page.
            */}
            <Route path="/login" element={
              <ProtractedRoute
                deniedRolesModels={[
                  RoleModel(RolesTypes.User, "/"),
                  RoleModel(RolesTypes.Admin, "/")
                ]}
              />}
            >
              <Route index element={<LoginPage />} />
            </Route>

            {/* 
              Registration page route, accessible only to guests. 
              It uses the ProtractedRoute component to redirect authenticated users to the home page.
            */}
            <Route path="/register" element={
              <ProtractedRoute deniedRolesModels={[RoleModel(RolesTypes.User, "/")]} />}
            >
              <Route index element={<RegisterPage />} />
            </Route>

            {/* 
              Products page route, accessible to all roles. 
            */}
            <Route path="/products" element={
              <ProtractedRoute deniedRolesModels={[]} />}
            >
              <Route index element={<ProductsPage />} />
            </Route>

            {/* 
              Product details page route, accessible to all roles. 
            */}
            <Route path="/products/:productId" element={
              <ProtractedRoute deniedRolesModels={[]} />}
            >
              <Route index element={<ProductDetails />} />
            </Route>

            {/* 
              Cart page route, accessible only to logged-in users. 
              It uses the ProtractedRoute component to redirect unauthenticated users to the home page.
            */}
            <Route path="/cart" element={
              <ProtractedRoute deniedRolesModels={[
                RoleModel(RolesTypes.Guest, "/")
              ]} />}
            >
              <Route index element={<CartPage />} />
            </Route>

          </Route>

          {/* 
            Catch-all route that redirects any unmatched route to the home page.
          */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

