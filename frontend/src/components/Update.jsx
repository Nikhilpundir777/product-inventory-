import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Update = ({ product, handleUpdate, closeDialog }) => {
  const { _id, name, image, price } = product;
  
  // Local state to handle form inputs
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedImage, setUpdatedImage] = useState(image);
  const [updatedPrice, setUpdatedPrice] = useState(price);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the updated product object
    const updatedProduct = {
      _id,
      name: updatedName,
      image: updatedImage,
      price: updatedPrice,
    };

    // Call the handleUpdate function with the updated product data
    handleUpdate(_id, updatedProduct);  // Pass data to handleUpdate
  };

  return (
    <Dialog open={true} onOpenChange={closeDialog}> {/* Manage dialog visibility */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to the product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Product Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Product Image URL */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              value={updatedImage}
              onChange={(e) => setUpdatedImage(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* Product Price */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
              className="col-span-3"
              type="number" // Ensure the price is numeric
            />
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Update;
