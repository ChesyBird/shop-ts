import { createContext, useContext } from "react";
import type { NewProduct, Product } from "../types/product";

// 상품 컨텍스트 타입 정의
interface ProductContextType{
    products: Product[]; // 상품 목록, 상품 상세보기
    addProduct: (newProduct: NewProduct) => void // 상품 등록
}

// 상품 컨텍스트 생성
// null 혹은 undefined
export const ProductContext = createContext<ProductContextType | null>(null);

// 상품 컨텍스트 커스텀 훅
export const useProduct = () => {
    const context = useContext(ProductContext);
    if(!context){
        throw new Error("useProduct는 ProductProvider 내부에서만 사용 가능")
    }
    return context
}