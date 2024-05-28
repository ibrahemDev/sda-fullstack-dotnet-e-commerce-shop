import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";

// Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
import { Product } from "@/context/product/ProductType";

// Actions
import { useGetProductActions } from "@/context/product/actions/useGetProductActions";
import { useAuthenticationActions } from "@/context/auth/actions/useAuthenticationActions";

// Utils
import { generateKey } from "@/lib/utils";

// Components 
import { CartButton } from "../prodducts/components/ProductItem";



// Example product data (can be removed once API is integrated)
const productExample: Product = {
  productId: "1",
  name: "Example Product",
  price: 19.99,
  stock: 10,
  description: "This is a fantastic example product. You should buy it!",
  categoryList: [
    {
      _categoryId: "1",
      categoryId: "1",
      name: "Electronics",
      description: "Gadgets and gizmos!",
    },
    {
      _categoryId: "2",
      categoryId: "2",
      name: "Books",
      description: "Worlds to explore!",
    },
  ],
};

// Component for the main product page 
const ProductDetailss: React.FC<{}> = () => {
  const { isLoggedIn } = useAuthenticationActions();
  const { productId } = useParams();
  const location = useLocation();
  const productFromProps: Product | undefined = location.state?.product;

  // Fetch product data if not passed through props
  const {
    res,
    error,
    isError,
    isLoading,
  } = useGetProductActions(productId!, !productFromProps);

  if (isLoading) {
    return (<>loading</>);
  }

  if (isError) {
    return (<>Error</>);
  }

  const product = productFromProps ? productFromProps : res?.data!.data!;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <img
            src="https://placehold.co/600x600"
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center space-x-2 mb-4">
            {product.categoryList?.map((category) => (
              <Badge key={category.categoryId}>{category.name}</Badge>
            ))}
          </div>

          <p className="text-2xl font-semibold text-gray-900 mb-4">
            ${product.price}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex space-x-4 mb-6">
            {isLoggedIn ? <CartButton product={product} /> : null}
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews (0)</TabsTrigger>
            </TabsList>
            <TabsContent value="description">
              <Card>
                <CardContent>
                  <p>{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardContent>
                  <p>No reviews yet. Be the first to review this product!</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Separator className="my-8" />

      {/* You might want to add related products here  */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">You might also like</h2>
        <ScrollArea className="h-72 rounded-md border">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {/* Replace with actual related products */}
            {[...Array(8)].map((_, index) => (
              <ProductItemComponent key={index} product={product} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

// Component for displaying a single product item (used in "You might also like")
const ProductItemComponent: React.FC<{ product: Product }> = ({
  product,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>Short description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Longer description</p>
      </CardContent>
    </Card>
  );
};

export default ProductDetailss;

