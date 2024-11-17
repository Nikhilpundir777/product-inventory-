import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { useProductStore } from "@/store/product"
import { useState } from "react"
import { toast } from "sonner"  // Importing the toast function from sonner

const CreatePage = () => {

    const [newproducts, setnewproducts] = useState({
        name: "",
        price: "",
        image: ""
    })

    const { createProduct } = useProductStore();  // Using the store to create a product

    const handleNewProduct = async () => {
        const { success, message } = await createProduct(newproducts);
        
        // Display success or error toast depending on the result
        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }

        console.log("Success", success);
        console.log("Message", message);
    }

    return (
        <div className="mx-auto w-2/3 flex flex-col">
            <div>
                <h1 className="my-10 mx-72 font-semibold text-3xl">Create New Product</h1>
            </div>
            <div className="card w-2/3 bg-brand-900 mx-auto space-y-4 ">
                <div className="py-4 m-5 space-y-6">
                    <Input
                        type="text"
                        placeholder="Product Name"
                        name="name"
                        value={newproducts.name}
                        onChange={(e) => setnewproducts({ ...newproducts, name: e.target.value })}
                    />

                    <Input
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={newproducts.price}
                        onChange={(e) => setnewproducts({ ...newproducts, price: e.target.value })}
                    />

                    <Input
                        type="text"
                        placeholder="Image URL"
                        name="image"
                        value={newproducts.image}
                        onChange={(e) => setnewproducts({ ...newproducts, image: e.target.value })}
                    />
                </div>
                <div className="my-2 -space-y-5 mx-52 pb-9">
                    <Button onClick={handleNewProduct}>Add Product</Button>
                </div>
                <Toaster /> {/* Toaster component to render all the toast notifications */}
            </div>
        </div>
    )
}

export default CreatePage
