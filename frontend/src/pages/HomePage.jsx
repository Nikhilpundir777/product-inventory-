import ProductCards from "@/components/ProductCards";
import { useProductStore } from "@/store/product";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="items-center flex flex-col w-full mx-auto">
      <div className="mx-auto m-14">
        <h1 className="font-extrabold text-2xl">Current Products</h1>
      </div>

      {products.length === 0 ? (
        <div className="mx-auto mb-16">
          <p className="whitespace-pre">
            No Products Found{" "}
            <Link to="/create">
              <span className="text-brand-500 font-semibold">Create a Product</span>
            </Link>
          </p>
        </div>
      ) : (
        // Use the ProductCards component and pass the products array to it
        <ProductCards products={products} />
      )}
    </div>
  );
};

export default HomePage;
