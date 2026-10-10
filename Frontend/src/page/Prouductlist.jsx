import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Trash2Icon, PencilIcon, Loader2 } from "lucide-react"
import { toast } from "react-toastify"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Productlist() {
  const [products, setproducts] = useState([])
  
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    productName: "",
    price: "",
    discription: "",
    image: "",
  })

  // Dialog open/close state
  const [openDialogId, setOpenDialogId] = useState(null)
  
  // Loading state for update button
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await axios.get('https://6a5f17f898d9f02aed7a11fc.mockapi.io/projects')
      setproducts(res.data)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to fetch products")
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`https://6a5f17f898d9f02aed7a11fc.mockapi.io/projects/${id}`)
      fetchProducts()
      toast.success("Product deleted successfully!")
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product")
    }
  }

  async function handleUpdate(e) {
    e.preventDefault()
    setIsUpdating(true)
    try {
      await axios.put(
        `https://6a5f17f898d9f02aed7a11fc.mockapi.io/projects/${selectedProduct.id}`,
        selectedProduct
      )
      await fetchProducts()
      
      // Toastify success alert
      toast.success("Product updated successfully!")
      
      // Close dialog immediately after saving changes
      setOpenDialogId(null)
    } catch (error) {
      console.error("Error updating product:", error)
      toast.error("Failed to update product")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img src={product.image} alt="" className="h-12 w-12 object-cover rounded" />
              </TableCell>
              <TableCell>
                <Link to={`/Dashboard/productdetail/${product.id}`} className="hover:underline text-primary">
                  {product.productName}
                </Link>
              </TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.discription}</TableCell>

              <TableCell className="text-right space-x-2">
                
                {/* UPDATE / EDIT DIALOG */}
                <Dialog 
                  open={openDialogId === product.id} 
                  onOpenChange={(isOpen) => setOpenDialogId(isOpen ? product.id : null)}
                >
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedProduct(product)} 
                    >
                      <PencilIcon className="h-4 w-4 mr-1" /> Update
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="sm:max-w-md">
                    <form onSubmit={handleUpdate}>
                      <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                        <DialogDescription>
                          Make changes to your product details here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="productName">Product Name</Label>
                          <Input 
                            id="productName" 
                            value={selectedProduct.productName} 
                            onChange={(e) => setSelectedProduct({...selectedProduct, productName: e.target.value})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="price">Price</Label>
                          <Input 
                            id="price" 
                            type="number"
                            value={selectedProduct.price} 
                            onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="discription">Description</Label>
                          <Input 
                            id="discription" 
                            value={selectedProduct.discription} 
                            onChange={(e) => setSelectedProduct({...selectedProduct, discription: e.target.value})}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="image">Image URL</Label>
                          <Input 
                            id="image" 
                            value={selectedProduct.image} 
                            onChange={(e) => setSelectedProduct({...selectedProduct, image: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline" disabled={isUpdating}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isUpdating ? "Saving..." : "Save changes"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                
                {/* DELETE ALERT DIALOG */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                      </AlertDialogMedia>
                      <AlertDialogTitle>Delete product?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this product from the database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        variant="destructive" 
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}