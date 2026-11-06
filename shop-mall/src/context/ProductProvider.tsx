import { useState } from "react";
import { ProductContext } from "./ProductContext";
import type { NewProduct, Product } from "../types/product";
import { initialProducts } from "../datas/products";

// ProductProvider : 저장소(repository) 역할
const ProductProvider = ({children}: {children: React.ReactNode}) => {

    const [products, setProducts] = useState<Product[]>(initialProducts);

    // 상품 추가함수
    const addProduct = (newProduct: NewProduct) => {
        // 순번 자동으로 저장(Unique값이어야 하므로 날짜와 시간 사용)
        const product: Product = {...newProduct, id: Date.now()};
        setProducts([...products, product])
    }

    return (
        <ProductContext.Provider value={{products, addProduct}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;