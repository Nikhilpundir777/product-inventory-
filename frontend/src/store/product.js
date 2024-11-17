import { create } from 'zustand';
import axios from 'axios'; // Ensure axios is imported

export const useProductStore = create((set) => ({
  products: [], // Initialize products as an empty array
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await axios.post("/api/products", newProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      // Update the products in the store
      set((state) => ({ products: [...state.products, data] }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "Failed to create product. Please try again." };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await axios.get("/api/products");

      // Now accessing res.data directly since it's already an array
      const data = res.data.data;  // Directly access res.data

      if (Array.isArray(data)) {
        set({ products: data });
      } else {
        console.error("Fetched data is not an array:", data);
        set({ products: [] }); // Fallback to an empty array if the data is not an array
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      set({ products: [] }); // Fallback to an empty array in case of error
    }
  },
  deleteProduct: async (pid) => {
    try {
      const res = await axios.delete(`/api/products/${pid}`);
      
      // Log the response to check its structure
      console.log(res);
      
      // Check if 'res.data' exists and is an object
      if (res.data && res.data.success) {
        // Filter out the deleted product from the products array
        set(state => ({
          products: state.products.filter(product => product._id !== pid)
        }));
        return { success: true, message: res.data.message || "Product deleted successfully" };
      } else {
        return { success: false, message: res.data?.message || "Failed to delete product" };
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "An error occurred while deleting the product." };
    }
  },
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await axios.put(`/api/products/${pid}`, updatedProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = res.data;
  
      if (!data.success) {
        return { success: false, message: data.message };
      }
  
      // Update the products in the store
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? { ...product, ...data } : product
        ),
      }));
  
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "An error occurred while updating the product." };
    }
  }
  
}
));
