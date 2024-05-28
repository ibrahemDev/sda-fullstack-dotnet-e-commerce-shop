import React from 'react';
import { Link } from 'react-router-dom';
import {
  IdCardIcon,
  MobileIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons';

/**
 * Footer component for displaying website footer information.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* About Us Section */}
          <div>
            <h4 className="text-lg font-medium mb-4">About Us</h4>
            <p className="text-sm text-gray-400">
              Looking for something? You'll find it here! We offer a huge selection of products,
              competitive prices, and reliable service, all in one convenient place. Start shopping today
              and discover everything we have to offer!
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-400 hover:text-white">Products</Link>
              </li>
              {/* ... more links */}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-sm text-gray-400">
                  123 Main Street, City, Country
                </span>
              </li>
              <li className="flex items-center">
                <MobileIcon className="h-5 w-5 mr-2 text-gray-400" />
                <a href="tel:+1234567890" className="text-sm text-gray-400 hover:text-white">+966-555-555-5555</a>
              </li>

            </ul>
          </div>

          {/* Social Media & Payment Section */}
          <div>
            <h4 className="text-lg font-medium mb-4">Stay Connected</h4>
            <div className="flex  space-x-4">
              {/* Social icons */}
              <a href="#" className="text-gray-400 hover:text-white">
                <InfoCircledIcon className="h-5 w-5" />
                aaa@a.aa
              </a>

            </div>


          </div>

        </div>

        {/* Copyright Section */}
        <div className="text-center mt-10 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
