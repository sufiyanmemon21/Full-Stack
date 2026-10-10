import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Minus, Plus, Heart, Loader2 } from "lucide-react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const { id } = useParams(); // URL se ID padhne ke liye

  // Default Nike Shoe Data
  const defaultNikeProduct = {
    productName: "Nike Air Max 270",
    price: "199",
    description:
      "Experience all-day comfort with the Nike Air Max 270. Lightweight cushioning, breathable mesh upper, and premium quality for everyday wear.",
  };

  const colors = [
    {
      name: "Black",
      value: "#000000",
      image:
        "https://images.unsplash.com/photo-1710472171218-da46dce3faf9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBuaWtlfGVufDB8fDB8fHww",
    },
    {
      name: "White",
      value: "#ffffff",
      image:
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2hpdGUlMjBuaWtlfGVufDB8fDB8fHww",
    },
    {
      name: "Blue",
      value: "#2563eb",
      image:
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ymx1ZSUyMG5pa2V8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Red",
      value: "#dc2626",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTVDJTIwbmlrZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const sizes = [38, 39, 40, 41, 42, 43];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(41);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  // Dynamic Product State (Pehle default Nike Product se load hoga)
  const [product, setProduct] = useState(defaultNikeProduct);
  const [loading, setLoading] = useState(false);

  // Agar URL mein ID paas hoti hai toh backend se fetch karega, warna default Nike hi rahega
  useEffect(() => {
    if (id) {
      const fetchProductData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://6a5f17f898d9f02aed7a11fc.mockapi.io/projects/${id}`
          );
          if (response.data) {
            setProduct(response.data);
            // Agar API mein koi image aaye toh use set karein, warna default color image
            if (response.data.image) {
              setSelectedColor((prev) => ({
                ...prev,
                image: response.data.image,
              }));
            }
          }
        } catch (error) {
          console.log("Error fetching product, showing default Nike Shoe.");
        } finally {
          setLoading(false);
        }
      };

      fetchProductData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-10">
      <Card className="max-w-6xl w-full shadow-xl rounded-2xl">
        <CardContent className="grid md:grid-cols-2 gap-10 p-8">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={selectedColor.image}
              alt={product.productName}
              className="rounded-xl object-cover w-full max-w-md h-[400px]"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {product.productName || defaultNikeProduct.productName}
              </h1>

              <div className="flex items-center gap-1 mt-2 text-yellow-500">
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <span className="text-gray-600 ml-2">(4.9)</span>
              </div>

              <p className="text-3xl font-bold mt-4 text-primary">
                ${product.price || defaultNikeProduct.price}
              </p>
            </div>

            <p className="text-gray-600">
              {product.description || defaultNikeProduct.description}
            </p>

            {/* Colors */}
            <div>
              <h3 className="font-semibold mb-3">Select Color</h3>

              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${
                      selectedColor.name === color.name
                        ? "border-black scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-semibold mb-3">Select Size</h3>

              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>

              <div className="flex items-center gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    setQuantity((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <Minus />
                </Button>

                <span className="text-2xl font-bold">{quantity}</span>

                <Button
                  size="icon"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Plus />
                </Button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="flex-1">Add to Cart</Button>

              <Button variant="secondary" className="flex-1">
                Buy Now
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setWishlist(!wishlist)}
              >
                <Heart
                  className={`${
                    wishlist ? "fill-red-500 text-red-500" : "text-gray-500"
                  }`}
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}