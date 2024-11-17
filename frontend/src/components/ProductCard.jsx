import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from "@/store/product";
import { Edit, Trash } from "lucide-react";
import PropTypes from "prop-types"; // Import PropTypes
import { toast } from "sonner";
import { useState } from "react";
import Update from "./Update";

const ProductCard = ({ product }) => {
  const { name, price, image, _id } = product; // Destructure product object
  const { deleteProduct, updateProduct } = useProductStore();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);  // State to control modal visibility

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleUpdate = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    if (success) {
      toast.success(message);
      setIsUpdateOpen(false);  // Close the modal after successful update
    } else {
      toast.error(message);
    }
  };

  return (
    <Card className="w-full rounded-xl shadow-lg">
      {/* Product Image */}
      <img
        src={image || "https://via.placeholder.com/800x400"} // fallback if no image
        alt={name}
        className="w-full h-52 object-cover rounded-t-xl"
      />

      {/* Card Header */}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{`$${price}`}</CardDescription> {/* Example price */}
      </CardHeader>

      {/* Card Content with Action Icons */}
      <CardContent className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Edit
            className="cursor-pointer"
            onClick={() => setIsUpdateOpen(true)}  // Open the update dialog when clicked
          />
          <Trash className="cursor-pointer" onClick={() => handleDelete(_id)} />
        </div>
      </CardContent>

      {/* Conditionally Render the Update Dialog */}
      {isUpdateOpen && (
        <Update 
          product={product} 
          handleUpdate={handleUpdate} 
          closeDialog={() => setIsUpdateOpen(false)}  // Pass close function as prop
        />
      )}
    </Card>
  );
};

// Define prop types for the ProductCard component
ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired, // name should be a string and is required
    price: PropTypes.number.isRequired, // price should be a number and is required
    image: PropTypes.string, // image should be a string, but is optional
    _id: PropTypes.string.isRequired, // Add _id as required for update/delete
  }).isRequired, // product prop is required
};

export default ProductCard;
