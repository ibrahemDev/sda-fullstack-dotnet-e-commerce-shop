import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { IoIosRefresh } from "react-icons/io";
import { SiFsecure } from "react-icons/si";
import { MdContactSupport } from "react-icons/md";


/**
 * @description Placeholder data for product categories. Replace with actual data from your backend or API.
 */
const productCategories = [
  {
    name: "Electronics",
    description: "Explore the latest gadgets and tech essentials.",
    imageUrl: "https://placehold.co/400x300", // Replace with a real image URL
  },
  {
    name: "Fashion",
    description: "Discover stylish clothing and accessories for every occasion.",
    imageUrl: "https://placehold.co/400x300",
  },
  {
    name: "Home & Kitchen",
    description: "Create a cozy and functional living space.",
    imageUrl: "https://placehold.co/400x300",
  },
  {
    name: "Beauty & Personal Care",
    description: "Enhance your natural beauty with our premium products.",
    imageUrl: "https://placehold.co/400x300",
  },
  {
    name: "Sports & Outdoors",
    description: "Gear up for your next adventure with our durable equipment.",
    imageUrl: "https://placehold.co/400x300",
  },
  {
    name: "Books & Media",
    description: "Expand your knowledge and entertainment library.",
    imageUrl: "https://placehold.co/400x300",
  },
  // Add more categories...
];

/**
 * @description Data for features section. Each object represents a feature.
 */
const features = [
  {
    name: 'Fast and Free Shipping',
    description: 'Get your orders delivered quickly and without any shipping charges.',
    icon: () => (<FaCartShopping className="mx-auto h-8 w-8 text-blue-500" />),
  },
  {
    name: 'Easy Returns',
    description: 'Enjoy hassle-free returns within 30 days of purchase.',
    icon: () => (<IoIosRefresh className="mx-auto h-8 w-8 text-blue-500" />),
  },


  {
    name: 'Secure Payment',
    description: 'Shop with confidence knowing your payments are secure.',
    icon: () => (<SiFsecure className="mx-auto h-8 w-8 text-blue-500" />),
  },
  {
    name: '24/7 Customer Support',
    description: 'We\'re here to help you anytime, day or night.',
    icon: () => (<MdContactSupport className="mx-auto h-8 w-8 text-blue-500" />),


  },
];

/**
 * @description This is the main component for the HomePage.
 * @returns {JSX.Element} The HomePage component.
 */
export default function HomePage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();



  return (
    <div className="bg-gradient-to-br from-blue-800 to-green-400 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center px-4 md:px-8 lg:px-16 relative">
        <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="font-bold text-white text-4xl md:text-6xl lg:text-7xl">
            Discover a World of Variety Shop
          </h1>
          <p className="text-gray-200 mt-4 max-w-3xl mx-auto text-lg md:text-xl">
            Find everything you need and more at our diverse online shop.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <Button variant="default" size="lg" onClick={() => {
              navigate("/products")
            }}>
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="text-center px-4 py-6 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                {/* Icon */}
                {<feature.icon />}

                <h3 className="text-lg font-medium text-gray-900 mt-3">{feature.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section 1 (New Arrivals) */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800">New Arrivals</h2>
            <p className="text-gray-600 mt-2">
              Discover the latest trends and hottest products in our new arrivals collection.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/products')}>
              Explore New Arrivals
            </Button>
          </div>
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="https://placehold.co/600x400" // Replace with actual banner image
              alt="New Arrivals"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Banner Section 2 (Deals & Promotions) */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="https://placehold.co/600x400" // Replace with actual banner image
              alt="Deals and Promotions"
              className="rounded-lg shadow-md"
            />
          </div>
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-right mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800">Deals & Promotions</h2>
            <p className="text-gray-600 mt-2">
              Don't miss out on our incredible deals and promotions. Save big on your favorite items today!
            </p>
            <Button variant="default" className="mt-4" onClick={() => navigate('/products')}>
              View All Deals
            </Button>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productCategories.map((category) => (
              <Card
                key={category.name}
                className="transform transition duration-500 hover:scale-105"
                onClick={() => {
                  navigate('/products')
                }}
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="px-4 py-4">
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-700">{category.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section (Newsletter Signup) */}
      <section className="py-12 text-center bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Stay Updated with Our Latest Offers
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Sign up for our newsletter and be the first to know about new products, exclusive deals, and more!
          </p>
          <div className="flex items-center justify-center flex-col md:flex-row">
            <div className="relative w-full md:w-2/3 mb-4 md:mb-0">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <Button type="submit" variant="default" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
