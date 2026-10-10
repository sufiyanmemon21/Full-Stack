import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Redirection ke liye import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Loader2 } from "lucide-react"; 
import axios from "axios";
import { toast } from "react-toastify";

export default function AddProductPage() {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false); 

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Loading Start

    try {
      await axios.post("https://6a5f17f898d9f02aed7a11fc.mockapi.io/projects", formData);
      toast.success("Data Added Successfully!");
      
      // 3. Form Reset & Redirect to Product List Page
      setFormData({ productName: "", price: "", description: "", image: "" });
      navigate("/dashboard/Productlist"); // Apni product list page ka route path yahan likhein (e.g., /products)
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-5xl">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Add New Product
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Fill in the product information below.
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="mb-4 text-lg font-semibold">
                  Basic Information
                </h2>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input
                      placeholder="Nike Air Max 270"
                      value={formData.productName}
                      name="productName"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>SKU</Label>
                    <Input placeholder="SKU-12345" />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shoes">Shoes</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Brand</Label>
                    <Input placeholder="Nike" />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="mb-4 text-lg font-semibold">Pricing</h2>
                <div className="grid gap-5 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      placeholder="129.99"
                      value={formData.price}
                      name="price"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sale Price</Label>
                    <Input type="number" placeholder="99.99" />
                  </div>

                  <div className="space-y-2">
                    <Label>Stock</Label>
                    <Input type="number" placeholder="100" />
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div>
                <h2 className="mb-4 text-lg font-semibold">Product Images</h2>
                <label className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:bg-slate-100">
                  <Upload className="mb-3 h-10 w-10 text-slate-500" />
                  <p className="font-medium">Click to upload images</p>
                  <p className="text-sm text-slate-500">PNG, JPG, WEBP</p>
                  <input type="file" multiple className="hidden" />
                </label>
              </div>

              {/* Description */}
              <div>
                <h2 className="mb-4 text-lg font-semibold">Description</h2>
                <Textarea
                  rows={6}
                  placeholder="Write product description..."
                  value={formData.description}
                  name="description"
                  onChange={handleChange}
                />
              </div>

              {/* Attributes */}
              <div>
                <h2 className="mb-4 text-lg font-semibold">
                  Product Attributes
                </h2>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Available Sizes</Label>
                    <Input placeholder="S, M, L, XL" />
                  </div>

                  <div className="space-y-2">
                    <Label>Available Colors</Label>
                    <Input placeholder="Black, White, Blue" />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Tags</Label>
                    <Input placeholder="Running, Sports, Men" />
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="rounded-xl border p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Featured Product</h3>
                    <p className="text-sm text-muted-foreground">
                      Show this product in featured products.
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>

                {/* Loading State wala Submit Button */}
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Product"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}