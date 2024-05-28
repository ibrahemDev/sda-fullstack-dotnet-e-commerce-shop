import {

  CircleUser,
  Home,

  Menu,
  Package,
  Package2,

  ShoppingCart,
  Users
} from "lucide-react"
import { BiSolidCategoryAlt } from "react-icons/bi";


import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";

/**
 * DashboardLayout component:
 * This component provides the layout for the dashboard section of the application.
 * 
 * It includes a sidebar for navigation and a header with user actions.
 * The main content area is rendered using the `Outlet` component from react-router-dom, 
 * allowing for nested routes to display different dashboard views.
 * 
 * Key features:
 * - Responsive design: adapts to different screen sizes using CSS grid.
 * - Sidebar navigation: provides links to different dashboard sections.
 * - Header: includes a user menu with actions like logout.
 * - Dynamic routing: uses `Outlet` to render different views based on the current route.
 * 
 * Dependencies:
 * - lucide-react: for icons.
 * - react-icons: for additional icons.
 * - @/components/ui: for various UI components like buttons, cards, dropdowns, etc.
 * - react-router-dom: for routing and navigation.
 * - @/context/auth/actions/useAuthenticationActions: for authentication-related actions.
 */
const DashboardLayout: React.FC<{}> = ({ }) => {
  const _location = useLocation();
  const navigate = useNavigate();
  const {
    token,
    isLoggedIn,
    isAdmin,
    userId,
    logout,
  } = useAuthenticationActions();
  console.log(_location)
  return (
    // Main container for the dashboard layout
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar section (hidden on smaller screens) */}
      <div className="hidden border-r bg-muted/40 md:block">
        {/* Sidebar content container */}
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* Sidebar header */}
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to={"/dashboard"} className="flex items-center gap-2 font-semibold link">
              <Package2 className="h-6 w-6" />
              <span className="">variety shop</span>
            </Link>

          </div>
          {/* Navigation links */}
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {/* Dashboard link */}
              <Link to={"/dashboard"}
                className={`flex items-center gap-3 ${_location.pathname == "/dashboard" ? "bg-muted text-primary" : ""} rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              {/* Orders link */}
              <Link to={"orders"}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${_location.pathname == "/dashboard/orders" ? "bg-muted text-primary" : "text-muted-foreground"} transition-all hover:text-primary`}
              >
                <ShoppingCart className="h-4 w-4" />
                Orders

              </Link>
              {/* Products link */}
              <Link to={"products"}
                className={`flex items-center gap-3 rounded-lg ${_location.pathname == "/dashboard/products" ? "bg-muted text-primary" : "text-muted-foreground"} px-3 py-2  transition-all hover:text-primary`}
              >
                <Package className="h-4 w-4" />
                Products{" "}
              </Link>
              {/* Customers link */}
              <Link to={"customers"}
                className={`flex items-center gap-3 rounded-lg ${_location.pathname == "/dashboard/customers" ? "bg-muted text-primary" : "text-muted-foreground"} px-3 py-2  transition-all hover:text-primary`}
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
              {/* Categories link */}
              <Link to={"categories"}

                className={`flex items-center gap-3  rounded-lg ${_location.pathname == "/dashboard/categories" ? "bg-muted text-primary" : "text-muted-foreground"} px-3 py-2 transition-all hover:text-primary`}
              >
                <BiSolidCategoryAlt />

                Categories
              </Link>


            </nav>
          </div>
          {/* Bottom section of the sidebar (empty by default) */}
          <div className="mt-auto p-4">
            {/**you can add any things in the bottom */}
          </div>
        </div>
      </div>
      {/* Main content section */}
      <div className="flex flex-col">
        {/* Header section */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Mobile navigation trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            {/* Mobile navigation content (sheet) */}
            <SheetContent side="left" className="flex flex-col">
              {/* Navigation links (similar to sidebar) */}
              <nav className="grid gap-2 text-lg font-medium">
                <Link to={"/dashboard"}
                  className="flex items-center gap-2 text-lg font-semibold text-gray-600"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">variety shop</span>

                </Link>
                {/* Dashboard link */}
                <Link to={"/dashboard"}
                  className={`flex items-center gap-3 ${_location.pathname == "/dashboard" ? "bg-muted text-primary" : ""} rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                {/* Orders link */}
                <Link to={"orders"}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${_location.pathname == "/dashboard/orders" ? "bg-muted text-primary" : "text-muted-foreground"} transition-all hover:text-primary`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Orders

                </Link>
                {/* Products link */}
                <Link to={"products"}
                  className={`flex items-center gap-3 rounded-lg ${_location.pathname == "/dashboard/products" ? "bg-muted text-primary" : "text-muted-foreground"} px-3 py-2  transition-all hover:text-primary`}
                >
                  <Package className="h-4 w-4" />
                  Products{" "}
                </Link>
                {/* Customers link */}
                <Link to={"customers"}
                  className={`flex items-center gap-3 rounded-lg ${_location.pathname == "/dashboard/customers" ? "bg-muted text-primary" : "text-muted-foreground"} px-3 py-2  transition-all hover:text-primary`}
                >
                  <Users className="h-4 w-4" />
                  Customers
                </Link>
                {/* Categories link */}
                <Link to={"categories"}

                  className={`flex items-center gap-3  rounded-lg ${_location.pathname == "/dashboard/categories" ? "bg-muted text-primary" : "text-muted-foreground"} px-3 py-2 transition-all hover:text-primary`}
                >
                  <BiSolidCategoryAlt />

                  Categories
                </Link>
              </nav>
              {/* Bottom section of the mobile navigation (empty by default) */}
              <div className="mt-auto">
                {/**you can add any things in the bottom */}
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">

          </div>
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={() => {
                navigate("/")
              }}>Home</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => {
                navigate("/products")
              }}>Products</DropdownMenuItem>
              <DropdownMenuItem className="text-white font-bold bg-red-700 hover:bg-red-400 cursor-pointer" onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {/* Main content area */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />




        </main>
      </div>
    </div>
  )
}


export default DashboardLayout;
