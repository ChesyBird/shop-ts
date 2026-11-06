import { useProduct } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
    // useProduct() 훅으로 데이터를 사용
    const { products } = useProduct();

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard 
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
}

export default ProductList;