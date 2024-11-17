import ProductCard from "./ProductCard";

const ProductCards = ({ products }) => {
  return (
    <div className="w-full grid grid-cols-12 gap-9">
      {/* Map over the products and render each ProductCard */}
      {products.map((product) => (
        <div className="col-span-4" key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
