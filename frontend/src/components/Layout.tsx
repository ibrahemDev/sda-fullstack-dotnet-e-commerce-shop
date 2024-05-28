// Import necessary modules from React and react-router-dom.
import React from 'react';
import { Outlet } from 'react-router-dom';

// Import custom components for the navbar and footer.
import Navbar from './navbar';
import Footer from './Footer';

// Define the props type for the Layout component. 
// Currently, this component doesn't accept any specific props.
type LayoutProps = {};

/**
 * The Layout component provides a common structure for all pages.
 * It includes a navbar, a main content area, and a footer.
 */
const Layout: React.FC<LayoutProps> = () => {
  return (
    // Wrap the entire layout structure within a div for better organization.
    <div>
      {/* Include the Navbar component. */}
      <Navbar />


      {/* 
        The main element represents the main content area of the page.
        The Outlet component is a placeholder that will be replaced with
        the content of the current route.
      */}
      <main className=''>
        <Outlet />
      </main>

      {/* Include the Footer component. */}
      <Footer />
    </div>
  );
};

// Export the Layout component as the default export.
export default Layout;

